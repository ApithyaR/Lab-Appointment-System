import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const PatientRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    return user && user.token && user.role === 'admin' ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default PatientRoute;
