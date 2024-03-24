import React, {useEffect, useState} from 'react';
import {Button, Form, Select, Typography} from 'antd';
import {useHistory} from 'react-router-dom';
import {getDoctors} from "../../../services/users";
import {getTests} from "../../../services/tests";
import {getTimeslots} from "../../../services/timeslots";

const {Option} = Select;
const {Title} = Typography;

const AppointmentForm = () => {
    const [doctors, setDoctors] = useState([])
    const [tests, setTests] = useState([])
    const [timeslots, setTimeslots] = useState([])
    const [selectedTest, setSelectedTest] = useState('')
    const [form] = Form.useForm();

    const history = useHistory();

    function handleTestChange(value) {
        console.log('setSelectedTest', value);
        setSelectedTest(value);
    }

    const loadDoctorsData = () => {
        getDoctors(localStorage.getItem('user'))
            .then((res) => {
                setDoctors(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    const loadTestData = () => {
        getTests(localStorage.getItem('user'))
            .then((res) => {
                setTests(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    const loadTimeslots = (selectedTest) => {
        console.log('selectedTest', selectedTest)
        getTimeslots(selectedTest, localStorage.getItem('user'))
            .then((res) => {
                setTimeslots(res.data.data)
            }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        loadDoctorsData();
        loadTestData();
    }, []);

    useEffect(() => {
        loadTimeslots(selectedTest);
    }, [selectedTest])

    const onFinish = (values) => {
        console.log(values)


        history.push('/patient/payment', {
            patientId: values.patientId,
            doctorId: values.doctorId,
            testId: values.testId,
            timeslotId: values.timeslotId,
            appointmentCost: 5000, // Replace with the actual cost
        });

    };


    return (
        <Form
            name="control-ref"
            form={form}
            labelCol={{span: 24}}
            wrapperCol={{span: 24}}
            style={{marginTop: '0px', paddingTop: '10px'}}
            onFinish={onFinish}
        >
            {/* Education Level of student */}
            <Form.Item
                name="testId"
                label="Test Name"
                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(50% - 8px)'}}
                rules={[{required: true, message: 'Please select a test!'}]}
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
                label="Doctor Name"
                wrapperCol={{span: 24}}
                style={{paddingLeft: '0px', display: 'inline-block', width: 'calc(50%)'}}
                rules={[{required: true, message: 'Please select a doctor who suggested!'}]}
            >
                <Select placeholder="Select Suggested Doctor" allowClear>
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
                rules={[{required: true, message: 'Please select a valid timeslot'}]}
            >
                <Select
                    placeholder="Select Time (hh:mm am/pm)"
                    allowClear
                    disabled={!selectedTest}
                >
                    {timeslots && timeslots.map((data) => {
                        return <Option value={data._id}>{data.startTime}</Option>;
                    })}


                </Select>
            </Form.Item>

            {selectedTest && (
                <Title level={5}>Cost: 5000</Title>
            )}

            <Form.Item wrapperCol={{span: 12}}>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{backgroundColor: '#047b9c'}}
                >
                    Book Appointment
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AppointmentForm;
