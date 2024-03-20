import React, {useEffect, useState} from 'react';
import {Breadcrumb, theme} from 'antd';
import {useSelector} from "react-redux";
import jwt_decode from "jwt-decode";
import {getDoctors} from "../../../services/users";
import DoctorsTable from '../../../components/tables/DoctorsTable';

const AllDoctors = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const [doctors, setDoctors] = useState(null);
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    const loadDoctorsData = () => {
        const decoded = jwt_decode(localStorage.user)
        console.log("decoded",decoded)
        getDoctors(localStorage.user)
            .then((res) => {
                console.log(res.data.data)
                setDoctors(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadDoctorsData();
    }, []);


    return (
        <div>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Doctors</Breadcrumb.Item>
                <Breadcrumb.Item>All Doctors</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <DoctorsTable loading={loading} doctors={doctors} />
            </div>
        </div>
    );
};
export default AllDoctors;


