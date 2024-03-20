import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Avatar } from 'antd';
import StudentHeader from '../../../../components/headers/commonHeader/CommonHeader';
import CommonFooter from '../../../../components/footers/commonFooter/CommonFooter';
import ScheduleLessonAvailability from '../../../../components/forms/AppointmentForm/AppointmentForm';
import { useSelector } from 'react-redux';
import './CreateAppointment.css'


const { Content } = Layout;
const { Title } = Typography;
const { Text } = Typography;

const CreateAppointment = ({ match }) => {

    const { user } = useSelector((state) => ({ ...state }));


    return (
        <Layout className="layout">
            <StudentHeader />
            <div className="backgroundApp">
                <Typography.Title
                    level={2}
                    style={{ paddingTop: '30px', paddingLeft: '50px', color: '#fff'}}
                >
                    Create Appointment
                </Typography.Title>
                <Content
                    style={{
                        padding: '50px 50px',
                        justifyContent: 'center',
                        display: 'flex',
                        alignSelf: 'center',
                        height: '74vh'
                    }}


                >
                    <div

                        style={{
                            padding: 24,
                            width: 600,
                            height: 470,
                            //     minHeight: 360,
                            //     marginTop: 200,
                            //     marginBottom:150,
                            //     marginRight: 600,
                            //     marginLeft: 600,
                            backgroundColor: "white",
                            borderRadius: 10
                        }}
                    >

                        <Row style={{ paddingLeft: '10px'}}>
                            <Title level={3}>
                                Schedule Appointment
                            </Title>
                            <Text>Please select a date and time for the appointment.</Text>
                        </Row>


                        <ScheduleLessonAvailability/>
                    </div>
                </Content>
            </div>
            <CommonFooter/>
        </Layout>
    );
};

export default CreateAppointment;
