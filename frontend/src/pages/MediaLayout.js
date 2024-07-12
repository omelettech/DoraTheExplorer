import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {
    getMediaFiles,
    getTags,
    getActors,
    addTagToMediaFile,
    removeTagFromMediaFile,
    addActorToMediaFile,
    removeActorFromMediaFile
} from '../services/mediaService';
import '../App.css';

const EXTERNAL_MEDIA_URL = 'http://127.0.0.1:8000/external_media/';

function MediaLayout() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedActor, setSelectedActor] = useState(null);

    useEffect(() => {
        fetchMediaFiles();
        fetchTags();
        fetchActors();
    }, []);

    const fetchMediaFiles = async () => {
        try {
            const response = await getMediaFiles();
            setMediaFiles(response.data);
        } catch (error) {
            console.error("Error fetching media files:", error);
        }
    };

    const fetchTags = async () => {
        try {
            const response = await getTags();
            setTags(response.data.map(tag => ({ label: tag.name, value: tag.name })));
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const fetchActors = async () => {
        try {
            const response = await getActors();
            setActors(response.data.map(actor => ({ label: actor.name, value: actor.name })));
        } catch (error) {
            console.error("Error fetching actors:", error);
        }
    };

    const handleMediaClick = (media) => {
        setSelectedMedia(media);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTagChange = (selectedOption) => {
        setSelectedTag(selectedOption);
    };

    const handleActorChange = (selectedOption) => {
        setSelectedActor(selectedOption);
    };

    const handleAddTag = async () => {
        if (selectedMedia && selectedTag) {
            try {
                console.log("Adding tag:", selectedTag.value, "to media file:", selectedMedia.id);
                await addTagToMediaFile(selectedMedia.id, selectedTag.value);
                fetchMediaFiles();
                setSelectedTag(null);
            } catch (error) {
                console.error("Error adding tag:", error);
            }
        }
    };

    const handleRemoveTag = async (tagToRemove) => {
        if (selectedMedia) {
            try {
                console.log("Removing tag:", tagToRemove, "from media file:", selectedMedia.id);
                await removeTagFromMediaFile(selectedMedia.id, tagToRemove);
                fetchMediaFiles();
            } catch (error) {
                console.error("Error removing tag:", error);
            }
        }
    };

    const handleAddActor = async () => {
        if (selectedMedia && selectedActor) {
            try {
                console.log("Adding actor:", selectedActor.value, "to media file:", selectedMedia.id);
                await addActorToMediaFile(selectedMedia.id, selectedActor.value);
                fetchMediaFiles();
                setSelectedActor(null);
            } catch (error) {
                console.error("Error adding actor:", error);
            }
        }
    };

    const handleRemoveActor = async (actorToRemove) => {
        if (selectedMedia) {
            try {
                console.log("Removing actor:", actorToRemove, "from media file:", selectedMedia.id);
                await removeActorFromMediaFile(selectedMedia.id, actorToRemove);
                fetchMediaFiles();
            } catch (error) {
                console.error("Error removing actor:", error);
            }
        }
    };

    const filteredMediaFiles = mediaFiles.filter(media =>
        media.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="layout-container">
            <div className="sidebar">
                <ul>
                    {filteredMediaFiles.map(media => (
                        <li key={media.id} onClick={() => handleMediaClick(media)}>
                            {media.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="media-player">
                {selectedMedia ? (
                    selectedMedia.file.toLowerCase().endsWith('.mp4') ||
                    selectedMedia.file.toLowerCase().endsWith('.mov') ||
                    selectedMedia.file.toLowerCase().endsWith('.avi') ? (
                        <video controls>
                            <source src={`${EXTERNAL_MEDIA_URL}${selectedMedia.file}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img src={`${EXTERNAL_MEDIA_URL}${selectedMedia.file}`} alt={selectedMedia.name} />
                    )
                ) : (
                    <p>Select a media file to play</p>
                )}
            </div>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {selectedMedia && (
                    <div className="media-details">
                        <div>
                            <h3>Tags:</h3>
                            <ul>
                                {selectedMedia.tags.map(tag => (
                                    <li key={tag.id}>
                                        {tag.name} <button onClick={() => handleRemoveTag(tag.name)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                            <Select
                                value={selectedTag}
                                onChange={handleTagChange}
                                options={tags}
                                placeholder="Add tag"
                                isClearable
                                isSearchable
                            />
                            <button onClick={handleAddTag}>Add Tag</button>
                        </div>
                        <div>
                            <h3>Actors:</h3>
                            <ul>
                                {selectedMedia.actors.map(actor => (
                                    <li key={actor.id}>
                                        {actor.name} <button onClick={() => handleRemoveActor(actor.name)}>Remove</button>
                                    </li>
                                ))}
                            </ul>
                            <Select
                                value={selectedActor}
                                onChange={handleActorChange}
                                options={actors}
                                placeholder="Add actor"
                                isClearable
                                isSearchable
                            />
                            <button onClick={handleAddActor}>Add Actor</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MediaLayout;
