import React from 'react';
import {Breadcrumb, theme} from 'antd';
import CreateDoctorForm from '../../../components/forms/CreateDoctorForm';

const CreateDoctors = () => {
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
                <Breadcrumb.Item>Doctors</Breadcrumb.Item>
                <Breadcrumb.Item>Create Doctor</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <CreateDoctorForm />
            </div>
        </div>
    );
};
export default CreateDoctors;