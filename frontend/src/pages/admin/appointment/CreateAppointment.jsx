import React from 'react';
import {Breadcrumb, theme} from 'antd';

import AppointmentForm from "../../../components/forms/AppointmentForm/AppointmentForm";

const App = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Appointments</Breadcrumb.Item>
                <Breadcrumb.Item>Create Appointment</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <AppointmentForm/>
            </div>
        </div>
    );
};
export default App;