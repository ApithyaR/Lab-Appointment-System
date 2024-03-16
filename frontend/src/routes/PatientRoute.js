import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const PatientRoute = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    console.log('PatientRoute - user:', user);

    return user.token && user.role === 'patient' ? <Route {...rest} /> : <LoadingToRedirect />;
};

export default PatientRoute;