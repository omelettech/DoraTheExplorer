import React from 'react';

const EXTERNAL_MEDIA_URL = 'http://127.0.0.1:8000/external_media/';

const MediaPlayer = ({ selectedMedia }) => {
    if (!selectedMedia) {
        return <div className="media-player">No media selected</div>;
    }

    const { file, name } = selectedMedia;

    return (
        <div className="media-player">
            {file.endsWith('.mp4') || file.endsWith('.avi') || file.endsWith('.mkv') || file.endsWith('.mov') ? (
                <video src={`${EXTERNAL_MEDIA_URL}${file}`} controls />
            ) : (
                <img src={`${EXTERNAL_MEDIA_URL}${file}`} alt={file} />
            )}
        </div>
    );
};

export default MediaPlayer;
