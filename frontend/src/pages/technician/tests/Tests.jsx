import React, {useEffect, useState} from 'react';
import {Breadcrumb, theme} from 'antd';

import AppointmentForm from "../../../components/forms/AppointmentForm/AppointmentForm";
import {useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getAllAppointments} from "../../../services/appointment";
import {getTests} from "../../../services/tests";
import TechniciansTable from "../../../components/tables/TechniciansTable";
import ReportsTable from '../../../components/tables/technician/TestsTable';
import TestsTable from '../../../components/tables/technician/TestsTable';

const Tests = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const [tests, setTests] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const loadTestsData = () => {
        const decoded = jwt_decode(localStorage.user)
        console.log("decoded",decoded)
        getTests(localStorage.user)
            .then((res) => {
                console.log(res.data.data)
                setTests(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadTestsData();
    }, []);


    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Tests</Breadcrumb.Item>
                <Breadcrumb.Item>All Tests</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <TestsTable loading={loading} tests={tests}/>
            </div>
        </div>
    );
};
export default Tests;


