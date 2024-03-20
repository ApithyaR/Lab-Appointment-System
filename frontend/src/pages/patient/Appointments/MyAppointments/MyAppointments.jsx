import React, { useState, useEffect } from 'react';
import { Layout, Tabs, Typography } from 'antd';
import { useSelector } from 'react-redux';
import CommonHeader from '../../../../components/headers/commonHeader/CommonHeader';
import CommonFooter from '../../../../components/footers/commonFooter/CommonFooter';
import "./../CreateAppointments/CreateAppointment.css"

import MyAppointmentsTable from "../../../../components/tables/MyAppointments";

import {getAppointments} from "../../../../services/appointment";
import jwt_decode from 'jwt-decode';

// import { getStudentSchedules } from '../../../services/schedule';

const { Content } = Layout;
const { TabPane } = Tabs;

const MyAppointments = () => {

    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const loadAppointmentData = () => {
        const decoded = jwt_decode(localStorage.user)
        console.log("decoded",decoded)
        getAppointments(localStorage.user)
            .then((res) => {
                setAppointments(res.data.data)
            }).catch((err) => {
                console.log(err)
        })
    }

    useEffect(() => {
        loadAppointmentData();
    }, []);



    return (
        <Layout className="layout">
            <CommonHeader />
            <div className="backgroundApp">
                <Typography.Title
                    level={2}
                    style={{ paddingTop: '30px', paddingLeft: '50px', color: '#fff' }}
                >
                    My Appointments
                </Typography.Title>
                <Content style={{
                    padding: '50px 50px',
                    justifyContent: 'center',
                    display: 'flex',
                    alignSelf: 'center',
                    height: '74vh'
                }}>
                    <div  style={{
                        padding: 24,
                        width: 900,
                        height: 500,
                        //     minHeight: 360,
                        //     marginTop: 200,
                        //     marginBottom:150,
                        //     marginRight: 600,
                        //     marginLeft: 600,
                        backgroundColor: "white",
                        borderRadius: 10
                    }}>
                        <div className="site-layout-content">
                            <MyAppointmentsTable  schedules={appointments} loading={loading}/>
                        </div>
                    </div>
                </Content>
            </div>
            <CommonFooter />
        </Layout>
    );
};

export default MyAppointments;
