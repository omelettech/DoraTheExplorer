import React, {useEffect, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import {
    getMediaFiles,
    addActorToMediaFile, addMediaToFavorites,
    addTagToMediaFile, getActors, getTags,
    removeActorFromMediaFile,
    removeTagFromMediaFile
} from "../services/mediaService";
import axios from "axios";

const TagActorManager = ({selectedMedia}) => {
    useEffect(() => {
        fetchTags();
        fetchActors();
    }, []);

    const [tags, setTags] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedTag, setSelectedTag] = useState([]);
    const [selectedActor, setSelectedActor] = useState([]);

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

    const handleAddTag = async (tag) => {
        if (selectedMedia) {
            try {
                await addTagToMediaFile(selectedMedia.id, tag.value);
                await fetchTags()
            } catch (error) {
                console.error("Error adding tag:", error);
            }
        }
    };

    const handleRemoveTag = async (tag) => {
        if (selectedMedia) {
            try {
                await removeTagFromMediaFile(selectedMedia.id, tag.value);
                await fetchTags()

            } catch (error) {
                console.error("Error removing tag:", error);
            }
        }
    };

    const handleAddActor = async (actor) => {
        if (selectedMedia) {
            console.log(actor.value)
            try {
                await addActorToMediaFile(selectedMedia.id, actor.value);
                await fetchActors()
            } catch (error) {
                console.error("Error adding actor:", error);
            }
        }
    };

    const handleRemoveActor = async (actor) => {
        if (selectedMedia) {
            console.log(actor)
            try {
                await removeActorFromMediaFile(selectedMedia.id, actor.value);
                await fetchActors()

            } catch (error) {
                console.error("Error removing actor:", error);
            }
        }
    };

    return (
        <div className="tag-actor-controls">
            {selectedMedia && (
                <>
                    <div className="tags">
                        <h3>Tags</h3>
                        <CreatableSelect
                            isMulti
                            options={tags}
                            onChange={(selectedOptions) => selectedOptions.forEach(option => handleAddTag(option))}
                            onCreateOption={(inputValue) => handleAddTag({value: inputValue})}
                        />
                        {tags.length > 0 &&
                            selectedMedia.tags &&
                            selectedMedia.tags.map((tag) => (
                                <span key={tag.id} className="badge">
                  {tag.name}
                                    <button onClick={() => handleRemoveTag({value: tag.name})}>×</button>
                </span>
                            ))}
                    </div>
                    <div className="actors">
                        <h3>Actors</h3>
                        <CreatableSelect
                            isMulti
                            options={actors}
                            onChange={(selectedOptions) => selectedOptions.forEach(option => handleAddActor(option))}
                            onCreateOption={(inputValue) => handleAddActor({value: inputValue})}
                        />
                        {actors.length > 0 &&
                            selectedMedia.actors &&
                            selectedMedia.actors.map((actor) => (
                                <span key={actor.id} className="badge">
                  {actor.name} <button onClick={() => handleRemoveActor({value: actor.name})}>×</button>
                </span>
                            ))}
                    </div>
                    <div>
                        <button onClick={() => addMediaToFavorites(selectedMedia.id)}>&lt;3</button>
                        {selectedMedia.is_favorite ?
                            (<>red</>)
                            :
                            (<>white</>)
                        }


                    </div>
                </>
            )}
        </div>
    );
};

export default TagActorManager;
