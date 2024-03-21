import axios from 'axios';

export const login = async (user) => {
    return await axios.post(
        'http://localhost:5000/api/v1/auth/login',
        user,
        {
            headers: {},
        },
    );
};


export const registerTechnician = async (user) => {
    return await axios.post(
        'http://localhost:5000/api/v1/auth/register/technician',
        user,
        {
            headers: {},
        },
    );
};

export const registerDoctor = async (user) => {
    return await axios.post(
        'http://localhost:5000/api/v1/auth/register/doctor',
        user,
        {
            headers: {},
        },
    );
};

export const registerPatient = async (user) => {
    return await axios.post(
        'http://localhost:5000/api/v1/auth/register/patient',
        user,
        {
            headers: {},
        },
    );
};



