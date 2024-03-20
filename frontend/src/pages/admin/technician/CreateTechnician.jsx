import React from 'react';
import {Breadcrumb, theme} from 'antd';

import AppointmentForm from "../../../components/forms/AppointmentForm/AppointmentForm";
import CreateTechnicianForm from "../../../components/forms/CreateTechnicianForm";

const CreateTechnician = () => {
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
                <Breadcrumb.Item>Technicians</Breadcrumb.Item>
                <Breadcrumb.Item>Create Technician</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <CreateTechnicianForm/>
            </div>
        </div>
    );
};
export default CreateTechnician;