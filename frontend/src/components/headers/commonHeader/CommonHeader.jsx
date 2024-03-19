import React from 'react';
import {Button, Layout, Menu} from 'antd';

import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const { Header } = Layout;
const { Item } = Menu;

const CommonHeader = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        history.push('/login');
    };

    return (
        <Header className="header" style={{ backgroundColor: 'white'}}>
            <div className="logo">ABC Laboratories</div>
            <Button onClick={logout}></Button>
        </Header>
    );
};

export default CommonHeader;
