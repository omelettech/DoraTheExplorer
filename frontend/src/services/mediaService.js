import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const getMediaFiles = () => {
    return axios.get(`${API_URL}mediafiles/`);
};

export const getTags = () => {
    return axios.get(`${API_URL}tags/`);
};

export const getActors = () => {
    return axios.get(`${API_URL}actors/`);
};

// Add other CRUD operations here
