import React, {useState, useEffect} from 'react';
import MediaPlayer from '../components/MediaPlayer';
import Sidebar from '../components/Sidebar';
import TagActorManager from '../components/TagActorManager';
import '../App.css';
import '../components/Sidebar.css'; // Import the Sidebar CSS here
import CreatableSelect from 'react-select/creatable';
import {
    getMediaFiles,
    getDirectoryStructure
} from '../services/mediaService';
import './MediaLayout.css'
import {Link} from "react-router-dom";

const MediaLayout = () => {
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [directoryStructure, setDirectoryStructure] = useState({});

    useEffect(() => {
        fetchDirectoryStructure();
    }, []);





    const fetchDirectoryStructure = async () => {
        try {
            const response = await getDirectoryStructure();
            setDirectoryStructure(response.data);
        } catch (error) {
            console.error("Error fetching directory structure:", error);
        }
    };

    const handleMediaClick = async (media) => {
        const response = await getMediaFiles(media.id)
        setSelectedMedia(response.data);
    };




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
                    />
                </div>
            </div>
            <div className="settings-link">
                <Link to="/settings">Settings</Link>
            </div>
        </div>
    );
};

export default MediaLayout;
