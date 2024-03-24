import React, {useEffect, useState} from 'react';
import {Breadcrumb, theme} from 'antd';
import jwt_decode from "jwt-decode";
import {getTechnicians} from "../../../services/users";
import TechniciansTable from "../../../components/tables/TechniciansTable";

const AllTechnicians = () => {
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const [technicians, setTechnicians] = useState(null);
    const [loading, setLoading] = useState(true);


    const loadTechnicianData = () => {
        const decoded = jwt_decode(localStorage.getItem('user'))
        console.log("decoded", decoded)
        getTechnicians(localStorage.getItem('user'))
            .then((res) => {
                console.log(res.data.data)
                setTechnicians(res.data.data)
                setLoading(false)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadTechnicianData();
    }, []);


    return (
        console.log("techs", technicians),
            <div>
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>Technicians</Breadcrumb.Item>
                    <Breadcrumb.Item>All Technicians</Breadcrumb.Item>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <TechniciansTable loading={loading} technicians={technicians}/>
                </div>
            </div>
    );
};
export default AllTechnicians;


