import React from 'react';
import CreatableSelect from 'react-select/creatable';

const TagActorManager = ({
  selectedMedia,
  tags,
  actors,
  onAddTag,
  onRemoveTag,
  onAddActor,
  onRemoveActor,
}) => {
  console.log(actors.length);

  const handleAddTag = async (tag) => {
    if (selectedMedia) {
      onAddTag(tag.value);
    }
  };

  const handleRemoveTag = async (tag) => {
    if (selectedMedia) {
      onRemoveTag(tag.value);
    }
  };

  const handleAddActor = async (actor) => {
    if (selectedMedia) {
      onAddActor(actor.value);
    }
  };

  const handleRemoveActor = async (actor) => {
    if (selectedMedia) {
      onRemoveActor(actor.value);
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
              value={
                tags.length > 0 &&
                selectedMedia.tags &&
                selectedMedia.tags.map((tag) => ({
                  label: tag.name,
                  value: tag.name,
                }))
              }
              options={tags}
              onChange={handleAddTag}
              onCreateOption={handleAddTag}
            />

            {tags.length > 0 &&
              selectedMedia.tags &&
              selectedMedia.tags.map((tag) => (
                <span key={tag.id} onClick={() => handleRemoveTag(tag)}>
                  {tag.name}
                </span>
              ))}
          </div>
          <div className="actors">
            <h3>Actors</h3>
            <CreatableSelect
              isMulti
              value={
                actors.length > 0 &&
                selectedMedia.actors &&
                selectedMedia.actors.map((actor) => ({
                  label: actor.name,
                  value: actor.name,
                }))
              }
              options={actors}
              onChange={handleAddActor}
              onCreateOption={handleAddActor}
            />
            {actors.length > 0 &&
              selectedMedia.actors &&
              selectedMedia.actors.map((actor) => (
                <span key={actor.id} onClick={() => handleRemoveActor(actor)}>
                  {actor.name}
                </span>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TagActorManager;
