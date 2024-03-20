import React, {useState} from 'react';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons';

import {Breadcrumb, Layout, Menu, theme, Button} from 'antd';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import CreateAppointment from "./appointment/CreateAppointment";
import MyAppointments from "../technician/Tests";
import AllTechnicians from "./technician/AllTechnicians";
import CreateTechnician from "./technician/CreateTechnician";
import CreateDoctors from './doctor/CreateDoctors';
import AllDoctors from './doctor/AllDoctors';
import CreatePatients from './patient/CreatePatients';
import AllPatients from './patient/AllPatients';

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
    getItem('Technicians', 'tech', <DesktopOutlined/>, [
        getItem('Create Technician', 'tech-1'),
        getItem('All Technicians', 'tech-4'),
    ]),
    getItem('Patients', 'sub1', <UserOutlined/>, [
        getItem('Create Patient', '3'),
        getItem('All Patients', '4'),
    ]),
    getItem('Doctors', 'sub2', <TeamOutlined/>, [
        getItem('Create Doctor', '5'),
        getItem('All Doctors', '6'),
   
    ]),
    getItem('Appointments', '9', <FileOutlined/>, [
        getItem('Create Appointments', '7'),
        getItem('All Appointments', '8')   
    ]),

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
                        {activeMenuItem === '7' && <CreateAppointment />}
                        {activeMenuItem === '8' && <MyAppointments />}

                        {activeMenuItem === '5' && <CreateDoctors />}
                        {activeMenuItem === '6' && <AllDoctors />}

                        {activeMenuItem === '3' && <CreatePatients />}
                        {activeMenuItem === '4' && <AllPatients />}

                        {activeMenuItem === 'tech-4' && <AllTechnicians />}
                        {activeMenuItem === 'tech-1' && <CreateTechnician />}

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
export default App;