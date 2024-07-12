import React, { useEffect, useState } from 'react';
import { getMediaFiles, getTags, getActors } from './services/mediaService';
import './App.css';

function App() {
    const [mediaFiles, setMediaFiles] = useState([]);
    const [tags, setTags] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        fetchMediaFiles();
        fetchTags();
        fetchActors();
    }, []);

    const fetchMediaFiles = async () => {
        const response = await getMediaFiles();
        setMediaFiles(response.data);
    };

    const fetchTags = async () => {
        const response = await getTags();
        setTags(response.data);
    };

    const fetchActors = async () => {
        const response = await getActors();
        setActors(response.data);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Media Manager</h1>
            </header>
            <div className="media-list">
                {mediaFiles.map(media => (
                    <div key={media.id} className="media-item">
                        <h2>{media.name}</h2>
                        <p>Tags: {media.tags.map(tag => tag.name).join(', ')}</p>
                        <p>Actors: {media.actors.map(actor => actor.name).join(', ')}</p>
                        <img src={media.file} alt={media.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
