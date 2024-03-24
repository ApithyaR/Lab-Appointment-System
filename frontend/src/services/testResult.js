import api from "./api";

export const getTestsHTML = async (admin_token, testId) => {
    return await api.get(`/api/v1/test-results/html/test_result_${testId}.html`, {
        headers: {
            Authorization: `Bearer ${admin_token}`
        }

    });
};

