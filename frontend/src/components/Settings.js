import React, { useState } from 'react';
import { changeRootFolder, loadMediaFiles, deleteMediaFiles } from '../services/mediaService';

const Settings = () => {
  const [rootFolder, setRootFolder] = useState('');

  const handleRootFolderChange = async () => {
    try {
      await changeRootFolder(rootFolder);
      alert('Root folder changed successfully');
    } catch (error) {
      console.error('Error changing root folder:', error);
      alert('Error changing root folder');
    }
  };

  const handleLoadMediaFiles = async () => {
    try {
      await loadMediaFiles();
      alert('Media files loaded successfully');
    } catch (error) {
      console.error('Error loading media files:', error);
      alert('Error loading media files');
    }
  };

  const handleDeleteMediaFiles = async () => {
    try {
      await deleteMediaFiles();
      alert('Media files deleted successfully');
    } catch (error) {
      console.error('Error deleting media files:', error);
      alert('Error deleting media files');
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="form-group">
        <label htmlFor="root-folder">Root Folder</label>
        <input
          type="text"
          id="root-folder"
          value={rootFolder}
          onChange={(e) => setRootFolder(e.target.value)}
        />
        <button onClick={handleRootFolderChange}>Change Root Folder</button>
      </div>
      <div className="form-group">
        <button onClick={handleLoadMediaFiles}>Load Media Files</button>
      </div>
      <div className="form-group">
        <button onClick={handleDeleteMediaFiles}>Delete Media Files</button>
      </div>
    </div>
  );
};

export default Settings;
