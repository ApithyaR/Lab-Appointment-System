import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { CalendarFilled, BellFilled, QuestionCircleFilled, UserOutlined } from '@ant-design/icons';
import './PatientHeader.css';

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const PatientHeader = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector((state) => ({ ...state }));
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        history.push('/login');
    };
    const handleClick = () => {};

    return (
        <Header className="header">
            <div className="logo">ABC Laboratories</div>
            <Menu onclick={handleClick} theme="light" mode="horizontal">
                <Item key="1" className="menu-item-selected">
                    <Link to="/patient/create-appointment">Create Appointment</Link>
                </Item>
                <Item key="2">
                    <Link to="/patient/my-appointments">My Appointments</Link>
                </Item>
                <Item key="5" className="icon-item icon-item-align" disabled>
                    <BellFilled style={{ fontSize: 18 }} />
                </Item>
                <Item key="6" className="icon-item" disabled>
                    <QuestionCircleFilled style={{ fontSize: 18 }} />
                </Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title='User'>
                    <Item key="7">
                        <Link to="">Profile</Link>
                    </Item>
                    <Item key="8" onClick={logout}>
                        Sign Out
                    </Item>
                </SubMenu>
            </Menu>
        </Header>
    );
};

export default PatientHeader;
