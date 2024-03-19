import React from 'react';
import { Table, Button, ConfigProvider, Empty, Tag } from 'antd';
import moment from 'moment';

const columns = [
    {
        title: 'Name',
        dataIndex: ['name'],
    },
    {
        title: 'Email',
        dataIndex: ['email'],
    },
    {
        title: 'Role',
        dataIndex: ['role'],
    },
    {
        title: 'Specialization',
        dataIndex: ['specialization'],
    },
    {
        title: 'Employment Start Date',
        dataIndex: ['employmentStartDate'],
        render: (employmentStartDate) => new Date(employmentStartDate).toLocaleDateString()
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        render: (_, record) => (
            <Button type='primary'>
                Edit
            </Button>
        ),
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        render: (_, record) => (
            <Button danger onClick={()=>console.log("delete patient: ",record._id)}>
                Delete
            </Button>
        ),
    },
];

const TechniciansTable = ({ technicians, loading }) => {
    return (
        <div>
            <ConfigProvider renderEmpty={() => <Empty description="No Schedules Found" />}>
                <Table
                    loading={loading}
                    columns={columns}
                    dataSource={technicians}
                    pagination={{ defaultPageSize: 4, position: ['bottomCenter'] }}
                />
            </ConfigProvider>          
        </div>
    );
};

export default TechniciansTable;
