import React, { useState, useEffect } from 'react';
import { Form, Button, Rate, Select, Row, Col, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import {getDoctors, getPatients} from "../../../services/users";
import {jwtDecode} from "jwt-decode";
import {createAppointment, getAppointments} from "../../../services/appointment";
import {getTests} from "../../../services/tests";
import {getTimeslots} from "../../../services/timeslots";
import { success, error } from '../../messages/CustomMessage';
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [tests, setTests] = useState([])
    const [timeslots, setTimeslots] = useState([])
    const [selectedTest, setSelectedTest] = useState('')
    const [form] = Form.useForm();

    const history = useHistory();

    function handleTestChange(value) {
        console.log('setSelectedTest',value);
        setSelectedTest(value);
    }
    const loadDoctorsData = () => {
        getDoctors(localStorage.user)
            .then((res) => {
                setDoctors(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    const loadTestData = () => {
        getTests(localStorage.user)
            .then((res) => {
                setTests(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    const loadTimeslots = (selectedTest) => {
        console.log('selectedTest',selectedTest)
        getTimeslots(selectedTest, localStorage.user)
            .then((res) => {
                setTimeslots(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    const loadPatientsData = () => {
        getPatients(localStorage.user)
            .then((res) => {
                setPatients(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadDoctorsData();
        loadPatientsData();
        loadTestData();
    }, []);

    useEffect(() => {
        loadTimeslots(selectedTest);
    },[selectedTest])

    const onFinish = (values) => {
        console.log(values)


        history.push('/patient/payment', {
            patientId: values.patientId,
            doctorId: values.doctorId,
            testId: values.testId,
            timeslotId: values.timeslotId,
            appointmentCost: 5000, // Replace with the actual cost
        });

        // createAppointment(localStorage.user, values)
        //     .then((res) => {
        //         console.log(res);
        //         success('The availability is created successfully');
        //         form.resetFields();
        // })
        //     .catch((err) => {
        //         console.log(err);
        //         error('The availability creation failed');
        //     });
    };



    return (
        <Form
            name="control-ref"
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginTop: '0px', paddingTop: '10px' }}
            onFinish={onFinish}
        >
            {/* Education Level of student */}
            <Form.Item
                name="testId"
                label="Test Name"
                style={{ paddingRight: '8px', display: 'inline-block', width: 'calc(50% - 8px)' }}
                rules={[{ required: true, message: 'Please select an educational level!' }]}
            >
                <Select
                    placeholder="Select Test"
                    allowClear
                    onChange={handleTestChange}
                >
                    {tests && tests.map((data) => {
                        return <Option value={data._id}>{data.name}</Option>;
                    })}
                </Select>
            </Form.Item>
            {/* Subject */}
            <Form.Item
                name="doctorId"
                label="Technician Name"
                wrapperCol={{ span: 24 }}
                style={{ paddingLeft: '0px', display: 'inline-block', width: 'calc(50%)' }}
                rules={[{ required: true, message: 'Please select a technician!' }]}
            >
                <Select placeholder="Select Technician" allowClear>
                    {doctors && doctors.map((data) => {

                        return <Option value={data._id}>{data.name}</Option>;
                    })}
                </Select>
            </Form.Item>


            <Form.Item
                style={{
                    display: 'inline-block',
                    width: 'calc(50%)',
                }}
                label="Select Time (hh:mm am/pm)"
                name="timeslotId"
                rules={[{ required: true, message: 'Please select a valid starting time' }]}
            >
                <Select
                    placeholder="Select Time (hh:mm am/pm)"
                    allowClear
                >
                    {timeslots && timeslots.map((data) => {
                        return <Option value={data._id}>{data.startTime}</Option>;
                    })}


                </Select>
            </Form.Item>

            <Title level={5}>Cost: 5000</Title>

            <Form.Item wrapperCol={{ span: 12 }}>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{ backgroundColor: '#047b9c'}}
                >
                    Book Appointment
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AppointmentForm;
