import React, {useState, useEffect} from 'react';
import MediaPlayer from '../components/MediaPlayer';
import Sidebar from '../components/Sidebar';
import TagActorManager from '../components/TagActorManager';
import '../App.css';
import '../components/Sidebar.css'; // Import the Sidebar CSS here
import CreatableSelect from 'react-select/creatable';
import {
    getMediaFiles,
    getTags,
    getActors,
    addTagToMediaFile,
    removeTagFromMediaFile,
    addActorToMediaFile,
    removeActorFromMediaFile,
    getDirectoryStructure
} from '../services/mediaService';

const MediaLayout = () => {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [tags, setTags] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedActor, setSelectedActor] = useState(null);
    const [directoryStructure, setDirectoryStructure] = useState({});

    useEffect(() => {
        fetchMediaFiles();
        fetchTags();
        fetchActors();
        fetchDirectoryStructure();
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
            setTags(response.data.map(tag => ({label: tag.name, value: tag.name})));
        } catch (error) {
            console.error("Error fetching tags:", error);
        }
    };

    const fetchActors = async () => {
        try {
            const response = await getActors();
            setActors(response.data.map(actor => ({label: actor.name, value: actor.name})));
        } catch (error) {
            console.error("Error fetching actors:", error);
        }
    };

    const fetchDirectoryStructure = async () => {
        try {
            const response = await getDirectoryStructure();
            setDirectoryStructure(response.data);
        } catch (error) {
            console.error("Error fetching directory structure:", error);
        }
    };

    const handleMediaClick = (media) => {
        console.log(media)
        setSelectedMedia(media);
    };

    const handleAddTag = async (tagName) => {
        if (selectedMedia) {
            try {
                await addTagToMediaFile(selectedMedia.id, tagName);
                fetchMediaFiles();
            } catch (error) {
                console.error("Error adding tag:", error);
            }
        }
    };

    const handleRemoveTag = async (tagName) => {
        if (selectedMedia) {
            try {
                await removeTagFromMediaFile(selectedMedia.id, tagName);
                fetchMediaFiles();
            } catch (error) {
                console.error("Error removing tag:", error);
            }
        }
    };

    const handleAddActor = async (actorName) => {
        if (selectedMedia) {
            try {
                await addActorToMediaFile(selectedMedia.id, actorName);
                fetchMediaFiles();
            } catch (error) {
                console.error("Error adding actor:", error);
            }
        }
    };

    const handleRemoveActor = async (actorName) => {
        if (selectedMedia) {
            try {
                await removeActorFromMediaFile(selectedMedia.id, actorName);
                fetchMediaFiles();
            } catch (error) {
                console.error("Error removing actor:", error);
            }
        }
    };

    const filteredMediaFiles = mediaFiles.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="media-layout">
            <Sidebar
                directoryStructure={directoryStructure}
                onMediaClick={handleMediaClick}
            />
            <MediaPlayer selectedMedia={selectedMedia}/>

            <div className="media-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search media..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <TagActorManager
                        selectedMedia={selectedMedia}
                        tags={tags}
                        actors={actors}
                        onAddTag={handleAddTag}
                        onRemoveTag={handleRemoveTag}
                        onAddActor={handleAddActor}
                        onRemoveActor={handleRemoveActor}
                    />
                </div>
            </div>
        </div>
    );
};

export default MediaLayout;
