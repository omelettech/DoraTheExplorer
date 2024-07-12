// src/components/MediaItem.js
import React from 'react';
import './MediaItem.css';

function MediaItem({ media, onClick }) {
    return (
        <li onClick={() => onClick(media)}>
            {media.name}
        </li>
    );
}

export default MediaItem;
