import React from 'react';
import {Flex, Layout, theme, Typography} from 'antd';
import CommonFooter from '../../../components/footers/commonFooter/CommonFooter';
import RegisterForm from '../../../components/forms/RegisterForm/RegisterForm';
import CommonHeader from "../../../components/headers/commonHeader/CommonHeader";
import '../Login/LoginPage.css'

const {Content} = Layout;
const {Title, Text} = Typography;

const RegisterPage = () => {

    return (
        <Flex gap="middle" wrap="wrap">
            <Layout>
                <CommonHeader/>
                <Content
                    className='backgroundLogin'
                    style={{
                        // margin: '0 16px',
                        display: 'flex', // Enable flexbox
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center', // Center vertically
                        height: '85vh' // Make the container take up full viewport height
                    }}>
                    <div

                        style={{
                            padding: 24,
                            width: 500,
                            backgroundColor: "white",
                            borderRadius: 10
                        }}
                    >
                        <Title level={3}>Sign up</Title>
                        <RegisterForm/>
                    </div>
                </Content>
                <CommonFooter/>
            </Layout>
        </Flex>
    );
};

export default RegisterPage;
