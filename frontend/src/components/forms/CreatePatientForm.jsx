import React from 'react';
import {Button, Form, Input} from 'antd';

const CreatePatientForm = () => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
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
                name="name"
                label="Patient Name"
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

            <Form.Item style={{paddingRight: '8px', display: 'inline-block', width: 'calc(100% - 16px)'}}>
                <br/>
                <Button
                    type="primary"
                    block
                    htmlType="submit"
                    style={{backgroundColor: '#047b9c'}}
                >
                    Create Patient
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreatePatientForm;
