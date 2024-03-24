import React, {useState} from 'react';
import {Button, ConfigProvider, Empty, Form, Modal, Select, Table} from 'antd';
import jwt_decode from "jwt-decode";
import {getAllAppointments} from "../../../services/appointment";
import {getTestsHTML} from "../../../services/testResult";

const CompletedTestsTable = ({tests, loading}) => {

    const {Option} = Select;
    const [openModal, setOpenModal] = useState(false);
    const [currentTest, setCurrentTest] = useState(null);
    const [testHtml, setTestHtml] = useState('');
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Test Request ID',
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
            title: 'View Report',
            dataIndex: 'edit',
            render: (_, record) => (
                <Button type='link' onClick={() => handleViewReport(record)}>
                    View
                </Button>
            ),
        },
    ];

    const handleViewReport = (record) => {
        setCurrentTest(record);
        setOpenModal(true);
        fetchTestReport(record._id);
    };

    const fetchTestReport = (testId) => {
        const decoded = jwt_decode(localStorage.getItem('user'))

        getTestsHTML(localStorage.getItem('user'), testId)
            .then((res) => {
                console.log(res.data)
                setTestHtml(res.data);
            }).catch((err) => {
            console.log(err)
        })
    }

    const downloadTestReport = (testId) => {
        if (currentTest) {

            getTestsHTML(localStorage.getItem('user'), testId)
                .then((res) => {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `test_result_${currentTest._id}.html`);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }).catch((err) => {
                console.error('Error downloading test report:', err);
            })
        }
    };

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
                    title={`Test Report: ${currentTest?._id}`}
                    open={openModal}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="download" type="primary" onClick={() => {downloadTestReport(currentTest?._id)}}>
                            Download Report
                        </Button>,
                    ]}
                >
                    <iframe
                        title="Test Report"
                        srcDoc={testHtml}
                        style={{
                            width: '100%',
                            height: '500px',
                            border: 'none',
                        }}
                    />
                </Modal>
            }
        </div>

    );
};

export default CompletedTestsTable;