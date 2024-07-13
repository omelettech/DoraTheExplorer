import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const getMediaFiles = () => axios.get("http://127.0.0.1:8000/api/mediafiles/");
export const getTags = () => axios.get(`${API_URL}tags/`);
export const getActors = () => axios.get(`${API_URL}actors/`);
export const addTagToMediaFile = (mediaFileId, tagName) => axios.post(`${API_URL}${mediaFileId}/add_tag/`, { tag_name: tagName });
export const removeTagFromMediaFile = (mediaFileId, tagName) => axios.post(`${API_URL}${mediaFileId}/remove_tag/`, { tag_name: tagName });
export const addActorToMediaFile = (mediaFileId, actorName) => axios.post(`${API_URL}${mediaFileId}/add_actor/`, { actor_name: actorName });
export const removeActorFromMediaFile = (mediaFileId, actorName) => axios.post(`${API_URL}${mediaFileId}/remove_actor/`, { actor_name: actorName });
export const getDirectoryStructure = () => axios.get(`${API_URL}mediafiles/directory_structure/`);
