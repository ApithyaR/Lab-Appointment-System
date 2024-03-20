import React, {useEffect, useState} from 'react';
import {Breadcrumb, theme} from 'antd';
import {useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getPatients} from "../../../services/users";
import PatientsTable from '../../../components/tables/PatientsTable';

const AllPatients = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const [patients, setPatients] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const loadPatientsData = () => {
        const decoded = jwt_decode(localStorage.user)
        console.log("decoded",decoded)
        getPatients(localStorage.user)
            .then((res) => {
                console.log(res.data.data)
                setPatients(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadPatientsData();
    }, []);


    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Patient</Breadcrumb.Item>
                <Breadcrumb.Item>All Patients</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <PatientsTable loading={loading} patients={patients} />
            </div>
        </div>
    );
};
export default AllPatients;


