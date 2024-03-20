import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import jwt_decode from 'jwt-decode';

import LoginPage from './pages/auth/Login/LoginPage';


import CreateAppointment from "./pages/patient/Appointments/CreateAppointments/CreateAppointment";
import MyAppointments from "./pages/patient/Appointments/MyAppointments/MyAppointments";
import AdminHomePage from "./pages/admin/AdminHomePage";
import CreateAppointmentPage from "./pages/admin/appointment/CreateAppointment";

import PatientRoute from "./routes/PatientRoute";
import AdminRoute from "./routes/AdminRoute";
import Home from "./pages/technician/Home";
import RegisterPage from "./pages/auth/Register/RegisterPage";
import PaymentPage from "./pages/patient/Appointments/PaymentPage";
import TechniciansHome from './pages/technician/TechnicianHome';

function App() {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (localStorage.user) {
    //         const decoded = jwtDecode(localStorage.user);
    //         console.log(decoded);
    //         dispatch({
    //             type: 'LOGGED_IN_USER',
    //             payload: {
    //                 name: decoded.id.name,
    //                 email: decoded.id.email,
    //                 role: decoded.id.role,
    //                 token: localStorage.user,
    //             },
    //         });
    //     }
    // }, [dispatch]);

    useEffect(() => {
        console.log('useEffect for loading user from localStorage is running');
        const storedToken = localStorage.getItem('user');
        if (storedToken) {
            const decoded = jwt_decode(storedToken);
            console.log('decoded',decoded.id)

            dispatch({
                type: 'LOGGED_IN_USER',
                payload: {
                    name: decoded.id.name,
                    email: decoded.id.email,
                    token: storedToken,
                    role: decoded.id.role,
                },
            });
        }
    }, [dispatch]);

  return (
          <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/registration" component={RegisterPage} />

              <Route exact path="/patient/my-appointments" component={MyAppointments} />
              <Route exact path="/patient/create-appointment" component={CreateAppointment} />

              <Route exact path="/admin/dashboard" component={AdminHomePage} />
              <Route exact path="/admin/create-appointments" component={CreateAppointmentPage} />

              <Route exact path="/tech/dashboard" component={TechniciansHome} />

              <Route exact path="/patient/payment" component={PaymentPage} />
              
          </Switch>
  );
}

export default App;
