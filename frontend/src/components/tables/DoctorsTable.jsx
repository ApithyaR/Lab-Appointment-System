import React, {useState} from 'react';
import {Button, ConfigProvider, Empty, Form, Input, Modal, Table} from 'antd';

const DoctorsTable = ({doctors, loading}) => {
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Doctor Name',
            dataIndex: ['name'],
        },
        {
            title: 'Email',
            dataIndex: ['email'],
        },
        {
            title: 'Specialization',
            dataIndex: ['specialization'],
        },
        {
            title: 'Experience',
            dataIndex: ['experience'],
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, record) => (
                <Button type='primary' onClick={() => setOpenModal(true)}>
                    Edit
                </Button>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) => (
                <Button danger onClick={() => console.log("delete doctor", record._id)}>
                    Delete
                </Button>
            ),
        },
    ];

    const handleCancel = () => {
        setOpenModal(false);
    };

    const onFinish = (values) => {
        console.log(values)

        //API call for update doctor

        // registerTechnician(values,localStorage.user)
        //     .then((res) => {
        //         console.log(res);
        //         success('The availability is created successfully');
        //         form.resetFields();
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         error('The availability creation failed');
        //     });
    };

    return (
        <div>
            <ConfigProvider renderEmpty={() => <Empty description="No Schedules Found"/>}>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={doctors ? doctors.map(doctor => ({...doctor, key: doctor._id})) : []}
                    pagination={{defaultPageSize: 4, position: ['bottomCenter']}}
                />
            </ConfigProvider>
            {openModal &&
                <Modal
                    title="Update Doctor"
                    open={openModal}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <>
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
                                name="name"
                                label="Doctor Name"
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(100% - 16px)'}}
                                rules={[{required: true, message: 'Please select an educational level!'}]}
                            >
                                <Input/>
                            </Form.Item>
                            {/* Subject */}
                            <Form.Item
                                label="Email"
                                name="email"
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(50% - 8px)'}}
                                rules={[{required: true, message: 'Please input your email!'}, {
                                    type: 'email',
                                    message: 'Please input a valid email!',
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(50% - 8px)'}}
                                rules={[{required: true, message: 'Please input your password!'}]}
                            >
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item
                                name="specialization"
                                label="Specialization"
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(50% - 8px)'}}
                                rules={[{required: true, message: 'Please select an educational level!'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="experience"
                                label="Experience"
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(50% - 8px)'}}
                                rules={[{required: true, message: 'Please input experience in years'}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(100% - 16px)'}}>
                                <br/>
                                <Button
                                    type="primary"
                                    block
                                    htmlType="submit"
                                    style={{backgroundColor: '#047b9c'}}
                                >
                                    Update changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                </Modal>
            }
        </div>

    );
};

export default DoctorsTable;
