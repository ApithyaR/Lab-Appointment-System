import React from 'react';
import {Flex, Layout, theme, Typography} from 'antd';
import CommonFooter from '../../../components/footers/commonFooter/CommonFooter';
import LoginForm from '../../../components/forms/LoginForm/LoginForm';
import CommonHeader from "../../../components/headers/commonHeader/CommonHeader";
import './LoginPage.css'

const {Content} = Layout;
const {Title, Text} = Typography;

const LoginPage = () => {

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
                            width: 400,
                        //     minHeight: 360,
                        //     marginTop: 200,
                        //     marginBottom:150,
                        //     marginRight: 600,
                        //     marginLeft: 600,
                            backgroundColor: "white",
                            borderRadius: 10
                        }}
                    >
                        <Title level={3}>Sign in</Title>
                        <LoginForm/>
                    </div>
                </Content>
                <CommonFooter/>
            </Layout>
        </Flex>
);
};

export default LoginPage;
