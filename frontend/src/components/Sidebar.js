import React from 'react';
import './Sidebar.css';


const media_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov' , '.avi')

function hasExtension(filepath) {
    // Check if filepath is a string and not empty
    if (typeof filepath !== 'string' || filepath.trim().length === 0) {
        return false;
    }

    // Extract the filename from the path
    const filename = filepath.split('/').pop();  // Assuming Unix-like paths

    // Split filename by dot to check for extension
    const parts = filename.split('.');

    // Check if there is more than one part after splitting by dot
    return parts.length > 1;
}


const Sidebar = ({ directoryStructure, onMediaClick }) => {
    const renderDirectory = (dir, path = '') => {
        if (!dir) {
            return <div>No directory structure available</div>;
        }

        return Object.keys(dir).map((key) => {
            const currentPath = path ? `${path}/${key}` : key;
            if (!hasExtension(key)) {

                return (
                    <div key={currentPath} className="directory">
                        <div className="directory-name">{key}</div>
                        <div className="directory-content">
                            {renderDirectory(dir[key], currentPath)}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div
                        key={currentPath}
                        className="file"
                        onClick={() => onMediaClick({ name: key, file: currentPath })}
                    >
                        {key}
                    </div>
                );
            }
        });
    };

    return (
        <div className="sidebar">
            {renderDirectory(directoryStructure)}
        </div>
    );
};

export default Sidebar;
