import React, {useEffect, useState} from 'react';
import {Layout, Typography} from 'antd';
import PatientHeader from "../../../../components/headers/patientHeader/PatientHeader";
import CommonFooter from '../../../../components/footers/commonFooter/CommonFooter';
import "./../CreateAppointments/CreateAppointment.css"

import MyAppointmentsTable from "../../../../components/tables/MyAppointments";

import {getAppointments} from "../../../../services/appointment";
import jwt_decode from 'jwt-decode';


const {Content} = Layout;


const MyAppointments = () => {

    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);


    const loadAppointmentData = () => {
        const decoded = jwt_decode(localStorage.getItem('user'))
        console.log("decoded", decoded)
        getAppointments(localStorage.getItem('user'))
            .then((res) => {
                setAppointments(res.data.data)
                setLoading(false)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadAppointmentData();
    }, []);


    return (
        <Layout className="layout">
            <PatientHeader/>
            <div className="backgroundApp">
                <Typography.Title
                    level={2}
                    style={{paddingTop: '70px', paddingLeft: '50px', color: '#fff'}}
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
                    <div style={{
                        padding: 24,
                        width: 900,
                        height: 500,
                        backgroundColor: "white",
                        borderRadius: 10
                    }}>
                        <div className="site-layout-content">
                            <MyAppointmentsTable schedules={appointments} loading={loading}/>
                        </div>
                    </div>
                </Content>
            </div>
            <CommonFooter/>
        </Layout>
    );
};

export default MyAppointments;
