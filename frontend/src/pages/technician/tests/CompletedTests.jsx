import React, {useEffect, useState} from 'react';
import {Breadcrumb, theme} from 'antd';
import jwt_decode from "jwt-decode";
import {getAllAppointments} from "../../../services/appointment";
// import TestsTable from '../../../components/tables/technician/TestsTable';
import CompletedTestsTable from "../../../components/tables/technician/CompletedTestsTable";
const CompletedTests = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const [tests, setTests] = useState(null);
    const [loading, setLoading] = useState(true);


    const loadTestsData = () => {
        const decoded = jwt_decode(localStorage.getItem('user'))

        getAllAppointments(localStorage.getItem('user'))
            .then((res) => {
                const scheduledTests = res.data.data.filter((test) => test.status === 'completed');
                console.log(scheduledTests)
                setTests(scheduledTests)
                setLoading(false)
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
                <Breadcrumb.Item>Completed Tests</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <CompletedTestsTable loading={loading} tests={tests}/>
            </div>
        </div>
    );
};
export default CompletedTests;


