import React ,{ useState } from 'react';
import { Table, Button, ConfigProvider, Empty, Form, Modal, Input } from 'antd';
import { Select } from 'antd';



const TestsTable = ({ tests, loading }) => {

    const { Option } = Select;

    const [openModal, setOpenModal] = useState(false);

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Test Name',
            dataIndex: ['name'],
        },
        {
            title: 'Description',
            dataIndex: ['description'],
        },
        {
            title: 'Created Date',
            dataIndex: ['createdAt'],
        },
        {
            title: 'Price',
            dataIndex: ['price'],
        },
        {
            title: 'Upload report',
            dataIndex: 'edit',
            render: (_, record) => (
                <Button type='primary' onClick={()=> setOpenModal(true)}>
                    upload
                </Button>
            ),
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) => (
                <Button danger onClick={()=>console.log("delete doctor",record._id)}>
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
            <ConfigProvider renderEmpty={() => <Empty description="No Schedules Found" />}>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={tests ? tests.map(test => ({ ...test, key: test._id })) : []}
                    pagination={{ defaultPageSize: 4, position: ['bottomCenter'] }}
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
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginTop: '0px', paddingTop: '10px' }}
            onFinish={onFinish}
        >
            {/* Education Level of student */}
            <Form.Item
            name="status"
            label="Status"
            style={{ paddingRight: '8px', display: 'inline-block', width: 'calc(100% - 16px)' }}
            rules={[{ required: true, message: 'Please select a status!' }]}
>
            <Select placeholder="Select a Status">
                <Option value="pass">Pass</Option>
                <Option value="fail">Fail</Option>
                <Option value="pending">Pending</Option>
            </Select>
            </Form.Item>
            {/* Subject */}
            
            <Form.Item style={{ paddingRight: '8px', display: 'inline-block', width: 'calc(100% - 16px)' }}>
            <br />
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{ backgroundColor: '#047b9c'}}
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