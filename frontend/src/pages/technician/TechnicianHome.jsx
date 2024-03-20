import React, {useState} from 'react';
import {DesktopOutlined} from '@ant-design/icons';

import {Breadcrumb, Layout, Menu, theme, Button} from 'antd';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Reports from './tests/Tests';

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [

    getItem('Technicians', 'tech', <DesktopOutlined/>, [
        getItem('Tests', 'tech-1')
    ]),

];
const TechniciansHome = () => {
    const [activeMenuItem, setActiveMenuItem] = useState('1'); // Default to 'Dashboards' initially

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        localStorage.clear()
        history.push('/login');
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" style={{ height: '70px', color: "white", marginLeft: '15px', marginTop: '40px'}}><h2> ABC Laboratories</h2></div>
                <Button onClick={logout}>logout</Button>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(item) => setActiveMenuItem(item.key)}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                        {activeMenuItem === 'tech-1' && <Reports />}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Copyright &copy; 2024 ABC Laboratories. Inc. All Rights Reserved.
                </Footer>
            </Layout>
        </Layout>
    );
};
export default TechniciansHome;