import React, {useState} from 'react';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined,} from '@ant-design/icons';

import {Breadcrumb, Button, Layout, Menu, theme} from 'antd';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Tests from "./Tests";

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
    getItem('Dashboards', '1', <PieChartOutlined/>),
    getItem('Tests', '9', <FileOutlined/>),

];
const App = () => {
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
        history.push('/login');
    };



    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
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
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {activeMenuItem === '9' && <Tests />}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default App;