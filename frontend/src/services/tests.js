import api from "./api";

export const getTests = async (admin_token) => {
    return await api.get('/api/v1/tests', {
        headers: {
            Authorization: `Bearer ${admin_token}`
        }

    });
};