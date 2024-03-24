import api from './api';

export const createAppointment = async (admin_token, data) => {
    console.log("admin_token", admin_token)
    return await api.post('/api/v1/appointments/',
        data,
        {
            headers: {
                Authorization: `Bearer ${admin_token}`
            },
        });
};

export const getAppointments = async (patient_id) => {
    return await api.get('/api/v1/appointments/patient', {
        headers: {
            Authorization: `Bearer ${patient_id}`
        }

    });
};

export const getAllAppointments = async (patient_id) => {
    return await api.get('/api/v1/appointments', {
        headers: {
            Authorization: `Bearer ${patient_id}`
        }
    });
};