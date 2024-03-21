import api from './api';

export const getTimeslots = async (testId, token) => {
    console.log('testID',testId)
    return await api.get(`/api/v1/timeslot/${testId}`, {
        params: { testId },
        headers: {
            Authorization: `Bearer ${token}`
        },
    },);
};