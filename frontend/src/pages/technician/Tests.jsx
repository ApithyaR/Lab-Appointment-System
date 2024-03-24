import React, {useEffect, useState} from 'react';
import {Layout, Typography} from 'antd';

import {getAllAppointments} from "../../services/appointment";
import jwt_decode from 'jwt-decode';
import Tests from "../../components/tables/Tests/Tests";


const {Content} = Layout;

const MyAppointments = () => {
    const [appointments, setAppointments] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadAppointmentData = () => {
        const decoded = jwt_decode(localStorage.user)
        console.log("decoded", decoded)
        getAllAppointments(localStorage.user)
            .then((res) => {
                console.log(res.data.data)
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
        <div className="background">
            <Typography.Title
                level={2}
                style={{paddingTop: '30px', paddingLeft: '50px', color: '#fff'}}
            >
                My Appointments
            </Typography.Title>
            <Content className="content-body">
                <div>
                    <div className="site-layout-content">
                        <Tests schedules={appointments} loading={loading}/>
                    </div>
                </div>
            </Content>
        </div>
    );
};

export default MyAppointments;
