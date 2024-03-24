import React from 'react';
import {Layout, Row, Typography} from 'antd';
import StudentHeader from '../../../../components/headers/patientHeader/PatientHeader';
import CommonFooter from '../../../../components/footers/commonFooter/CommonFooter';
import ScheduleLessonAvailability from '../../../../components/forms/AppointmentForm/AppointmentForm';
import './CreateAppointment.css'


const {Content} = Layout;
const {Title} = Typography;
const {Text} = Typography;

const CreateAppointment = ({match}) => {


    return (
        <Layout className="layout">
            <StudentHeader/>
            <div className="backgroundApp">
                <Typography.Title
                    level={2}
                    style={{paddingTop: '70px', paddingLeft: '50px', color: '#fff'}}
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
                            backgroundColor: "white",
                            borderRadius: 10
                        }}
                    >

                        <Row style={{paddingLeft: '10px'}}>
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
