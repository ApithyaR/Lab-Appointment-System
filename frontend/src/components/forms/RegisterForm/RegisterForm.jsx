// import React, { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Typography, Form, Input, Button, Select, Row, Col, Checkbox} from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerP } from '../../../services/auth';
// import { error, success } from '../../messages/CustomMessage';

// const { Option } = Select;
// const RegisterForm = () => {
//     const history = useHistory();

//     const { user } = useSelector((state) => ({ ...state }));
//     const dispatch = useDispatch();

//     const [form] = Form.useForm();

//     useEffect(() => {
//         const intended = history.location.state;
//         if (intended) {
//             return;
//         }

//         if (user && user.token && user.role === 'patient') history.push('/patient/create-appointment');
//         if (user && user.token && user.role === 'admin') history.push('/admin/dashboard');

//     }, [user, history]);

//     const roleBasedRedirect = (res) => {
//         if (res.data.role === 'admin') {
//             history.push('/admin/dashboard');
//         } else if (res.data.role === 'patient') {
//             history.push('/patient/create-appointment');
//         }
//     };

//     const onFinish = (values) => {
//         register(values)
//             .then((res) => {
//                 success('The login was successful');

//                 dispatch({
//                     type: 'LOGGED_IN_USER',
//                     payload: {
//                         name: res.data.name,
//                         email: res.data.email,
//                         token: res.data.token,
//                         role: res.data.role,
//                     },
//                 });
//                 localStorage.setItem('user', res.data.token);
//                 roleBasedRedirect(res);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 error('Login Failed');
//             });
//     };

//     return (
        
//     );
// };

// export default RegisterForm;


import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Form, Input, Button, Select, Row, Col, Checkbox} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { registerPatient } from '../../../services/auth';
import { error, success } from '../../messages/CustomMessage';

const { Option } = Select;
const RegisterForm = () => {
    const history = useHistory();

    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const [form] = Form.useForm();

    useEffect(() => {
        const intended = history.location.state;
        if (intended) {
            return;
        }

        if (user && user.token && user.role === 'patient') history.push('/patient/create-appointment');
        if (user && user.token && user.role === 'admin') history.push('/admin/dashboard');

    }, [user, history]);

    const roleBasedRedirect = (res) => {
        if (res.data.role === 'admin') {
            history.push('/admin/dashboard');
        } else if (res.data.role === 'patient') {
            history.push('/patient/create-appointment');
        }
    };

    const onFinish = (values) => {
        registerPatient(values) // Update to registerP instead of register
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

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
        >


            <Form.Item
                name="name"
                label="name"
                tooltip="What do you want others to call you?"
                rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid email!',
                    },
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                ]}
            >
                <Input
                    addonBefore='+94'
                    style={{
                        width: '100%',
                    }}
                />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
                rules={[
                    {
                        required: true,
                        message: 'Please select gender!',
                    },
                ]}
            >
                <Select placeholder="select your gender">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
            >
                <Checkbox>
                    I have read the <a href="">agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" block htmlType="submit" style={{ backgroundColor: '#047b9c'}}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
