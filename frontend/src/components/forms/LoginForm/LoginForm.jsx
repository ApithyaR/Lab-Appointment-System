import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../services/auth';
import { error, success } from '../../messages/CustomMessage';

const LoginForm = () => {
    const history = useHistory();

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        const intended = history.location.state;
        if (intended) {
            return;
        }

        if (user && user.token && user.role === 'patient') history.push('/patient/create-appointment');
        if (user && user.token && user.role === 'admin') history.push('/admin/dashboard');
        if (user && user.token && user.role === 'technician') history.push('/tech/dashboard');

    }, [user, history]);

    const roleBasedRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push('/admin/dashboard');
        } else if (res.data.role === 'patient') {
            history.push('/patient/create-appointment');
        } else if (res.data.role === 'technician') {
            history.push('/tech/dashboard');
        }
    };

    const onFinish = (values) => {
        login(values)
            .then((res) => {
                success('The login was successful');

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name,
                        email: res.data.email,
                        token: res.data.token,
                        role: res.data.role,
                    },
                });
                localStorage.setItem('user', res.data.token);
                roleBasedRedirect(res);
            })
            .catch((err) => {
                console.log(err);
                error('Login Failed');
            });
    };

    const handleRegisterClick = () => {
        history.push('/registration');
    };
    return (
        <Form
            name="basic"
            onFinish={onFinish}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            initialValues={{
                remember: true,
            }}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }, {
                    type: 'email',
                    message: 'Please input a valid email!',
                }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Typography.Title level={5} >
                <p>Forgot your username or password?</p>
            </Typography.Title>
            <Form.Item>
                <Button  htmlType="submit" block>
                    Sign in
                </Button>
            </Form.Item>

            <p >By signing in, you agree to our Terms of Use</p>
            <div >
                <p >
                    <b>Need to register?</b>
                </p>
                <Form.Item>
                    <Button type="primary" block onClick={handleRegisterClick} style={{ backgroundColor: '#047b9c'}}>
                        Register
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
};

export default LoginForm;
