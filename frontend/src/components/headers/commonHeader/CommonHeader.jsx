import React from 'react';
import {Button, Layout} from 'antd';

import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

const {Header} = Layout;

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
        <Header className="header" style={{backgroundColor: 'white'}}>
            <div className="logo">ABC Laboratories</div>
            <Button onClick={logout}></Button>
        </Header>
    );
};

export default CommonHeader;
