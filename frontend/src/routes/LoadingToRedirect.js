import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Layout, Result} from 'antd';
import {useSelector} from 'react-redux';

import CommonHeader from '../components/headers/commonHeader/CommonHeader';
import CommonFooter from '../components/footers/commonFooter/CommonFooter';

const {Content} = Layout;

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const history = useHistory();

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        if (user && user.token && user.role === 'tutor') {
            count === 0 && history.push('/teaching/tutor-now');
        } else if (user && user.token && user.role === 'student') {
            count === 0 && history.push('/learning/get-help-now');
        } else {
            count === 5 && history.push('/login');
        }
        // cleanup
        return () => clearInterval(interval);
    }, [count, history]);

    return (
        <Layout className="layout">
            <CommonHeader/>
            <Content className="content-body">
                <Result
                    status="warning"
                    title={`You are not authorized to do this operation. Will be redirected in ${count}`}
                />
            </Content>
            <CommonFooter/>
        </Layout>
    );
};

export default LoadingToRedirect;
