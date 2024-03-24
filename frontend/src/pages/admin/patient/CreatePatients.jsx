import React from 'react';
import {Breadcrumb, theme} from 'antd';
import CreatePatientForm from '../../../components/forms/CreatePatientForm';

const CreatePatients = () => {
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
                <Breadcrumb.Item>Patients</Breadcrumb.Item>
                <Breadcrumb.Item>Create Patient</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <CreatePatientForm/>
            </div>
        </div>
    );
};
export default CreatePatients;