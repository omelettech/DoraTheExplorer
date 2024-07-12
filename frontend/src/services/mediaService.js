// src/services/mediaService.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const getMediaFiles = () => axios.get(`${API_URL}mediafiles/`);
export const getTags = () => axios.get(`${API_URL}tags/`);
export const getActors = () => axios.get(`${API_URL}actors/`);
export const addTagToMediaFile = (mediaFileId, tag) =>
    axios.post(`${API_URL}mediafiles/${mediaFileId}/add_tag/`, { tag });
export const removeTagFromMediaFile = (mediaFileId, tag) =>
    axios.post(`${API_URL}mediafiles/${mediaFileId}/remove_tag/`, { tag });
export const addActorToMediaFile = (mediaFileId, actor) =>
    axios.post(`${API_URL}mediafiles/${mediaFileId}/add_actor/`, { actor });
export const removeActorFromMediaFile = (mediaFileId, actor) =>
    axios.post(`${API_URL}mediafiles/${mediaFileId}/remove_actor/`, { actor });

