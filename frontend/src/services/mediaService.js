import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';
const MEDIAFILES_URL = 'http://127.0.0.1:8000/api/mediafiles/'

export const getMediaFiles = (id) => axios.get(`http://127.0.0.1:8000/api/mediafiles/${id}/`);
export const getTags = () => axios.get(`${API_URL}tags/`);
export const getActors = () => axios.get(`${API_URL}actors/`);
export const addTagToMediaFile = (mediaFileId, tagName) => axios.post(`${MEDIAFILES_URL}${mediaFileId}/add_tag/`, {name: tagName});
export const removeTagFromMediaFile = (mediaFileId, tagName) => axios.post(`${MEDIAFILES_URL}${mediaFileId}/remove_tag/`, {name: tagName});
export const addActorToMediaFile = (mediaFileId, actorName) => axios.post(`${MEDIAFILES_URL}${mediaFileId}/add_actor/`, {name: actorName});
export const removeActorFromMediaFile = (mediaFileId, actorName) => axios.post(`${MEDIAFILES_URL}${mediaFileId}/remove_actor/`, {name: actorName});
export const getDirectoryStructure = () => axios.get(`${API_URL}mediafiles/directory_structure/`);

export const addMediaToFavorites=(mediaFileId)=>axios.put(`http://127.0.0.1:8000/api/mediafiles/${mediaFileId}/`)
