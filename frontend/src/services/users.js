import api from "./api";

export const getDoctors = async (admin_token) => {
    return await api.get('/api/v1/users/getDoctors', {
        headers: {
            Authorization: `Bearer ${admin_token}`
        }

    });
};

export const getPatients = async (admin_token) => {
    return await api.get('/api/v1/users/getPatients', {
        headers: {
            Authorization: `Bearer ${admin_token}`
        }

    });
};

export const getTechnicians = async (admin_token) => {
    return await api.get('/api/v1/users/getTechnicians', {
        headers: {
            Authorization: `Bearer ${admin_token}`
        }

    });
};