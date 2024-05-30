import axios from 'axios';

const apiBaseUrl = 'http://localhost:4000';

export const fetchUsers = async () => {
    const response = await axios.get(`${apiBaseUrl}/user-mgmt`);
    return response.data;
};

export const fetchProjectTypes = async () => {
    const response = await axios.get(`${apiBaseUrl}/projects/types`);
    return response.data;
};

export const fetchStatuses = async () => {
    const response = await axios.get(`${apiBaseUrl}/projects/statuses`);
    return response.data;
};

export const updateUser = async (id, data) => {
    const response = await axios.put(`${apiBaseUrl}/user/${id}`, data);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${apiBaseUrl}/user/${id}`);
    return response.data;
};

export const updateProjectType = async (id, data) => {
    const response = await axios.put(`${apiBaseUrl}/projects/types/${id}`, data);
    return response.data;
};

export const deleteProjectType = async (id) => {
    const response = await axios.delete(`${apiBaseUrl}/projects/types/${id}`);
    return response.data;
};

export const updateStatus = async (id, data) => {
    const response = await axios.put(`${apiBaseUrl}/projects/statuses/${id}`, data);
    return response.data;
};

export const deleteStatus = async (id) => {
    const response = await axios.delete(`${apiBaseUrl}/projects/statuses/${id}`);
    return response.data;
};
