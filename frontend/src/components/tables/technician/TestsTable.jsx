import React, {useState} from 'react';
import {Button, ConfigProvider, Empty, Form, Modal, Select, Table} from 'antd';

const TestsTable = ({tests, loading}) => {

    const {Option} = Select;
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Schedule ID',
            dataIndex: ['_id'],
        },
        {
            title: 'Test Name',
            dataIndex: ['test'],
        },
        {
            title: 'Doctor',
            dataIndex: ['doctor'],
        },
        {
            title: 'Upload report',
            dataIndex: 'edit',
            render: (_, record) => (
                <Button type='link' onClick={() => setOpenModal(true)}>
                    upload
                </Button>
            ),
        },
    ];

    const handleCancel = () => {
        setOpenModal(false);
    };

    const onFinish = (values) => {
        console.log(values)
    };

    return (
        <div>
            <ConfigProvider renderEmpty={() => <Empty description="No Schedules Found"/>}>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={tests ? tests.map(test => ({...test, key: test._id})) : []}
                    pagination={{defaultPageSize: 4, position: ['bottomCenter']}}
                />
            </ConfigProvider>
            {openModal &&
                <Modal
                    title="Update Report Status"
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
                                name="status"
                                label="Status"
                                style={{paddingRight: '8px', display: 'inline-block', width: 'calc(100% - 16px)'}}
                                rules={[{required: true, message: 'Please select a status!'}]}
                            >
                                <Select placeholder="Select a Status">
                                    <Option value="pass">Pass</Option>
                                    <Option value="fail">Fail</Option>
                                    <Option value="pending">Pending</Option>
                                </Select>
                            </Form.Item>
                            {/* Subject */}

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

export default TestsTable;