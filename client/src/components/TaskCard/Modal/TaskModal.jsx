import { useState, useEffect } from "react";
import { Tag } from "../Tag/tag";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../../data/editTask";
import { fetchTags } from "../../../data/fetchTags";

const STATES = ["todo", "progress", "review", "done", "backlog"];

export function TaskModal({ task, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const queryClient = useQueryClient();

  // Fetch all tags for selection
  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  const tags = tagsData?.data || [];

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCurrentState(task.state);
      setSelectedTags(task.tags ? task.tags.map(tag => tag.id) : []);
    }
  }, [task]);

  const mutation = useMutation({
    mutationFn: ({ taskId, state, title, description, tags }) =>
      editTask(taskId, { state, title, description, tags }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["backlog"] });
      setEditMode(false);
    },
  });

  if (!task) return null;

  const handleSave = () => {
    mutation.mutate({
      taskId: task.documentId,
      state: currentState,
      title,
      description,
      tags: selectedTags,
    });
  };

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{editMode ? title : task.title}</p>
          <button className="button--close" aria-label="close" onClick={onClose}>x</button>
        </header>
        <section className="modal-card-body">
          <p>
            <strong>Title:</strong>{" "}
            {editMode ? (
              <input
                className="input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                disabled={mutation.isPending}
              />
            ) : (
              task.title
            )}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {editMode ? (
              <textarea
                className="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                disabled={mutation.isPending}
              />
            ) : (
              task.description || <em>No description</em>
            )}
          </p>
          <p>
            <strong>State:</strong>{" "}
            {editMode ? (
              <select
                value={currentState}
                onChange={e => setCurrentState(e.target.value)}
                disabled={mutation.isPending}
              >
                {STATES.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            ) : (
              currentState
            )}
            {mutation.isPending && <span className="ml-2">Saving...</span>}
          </p>
          <p>
            <strong>Project:</strong>{" "}
            {task.project?.name || <em>No project</em>}
          </p>
          <div className="field">
            <strong>Tags:</strong>
            {editMode ? (
              <div className="tags are-medium" style={{ flexWrap: "wrap" }}>
                {tags.map(tag => (
                  <span
                    key={tag.id}
                    className={
                      "tag"
                      + (selectedTags.includes(tag.id) ? " is-primary" : " is-light")
                      + " clickable"
                    }
                    style={{ cursor: "pointer", margin: "0.25em" }}
                    onClick={() => handleTagClick(tag.id)}
                  >
                    {tag.title || tag.name}
                  </span>
                ))}
              </div>
            ) : (
              <div className="tags mt-3">
                {task.tags?.length
                  ? task.tags.map(tag => (
                      <Tag key={tag.id} title={tag.title} />
                    ))
                  : <em>No tags</em>}
              </div>
            )}
          </div>
          
        </section>
        <div className="button__container">
          {editMode ? (
            <>
              <button
                className="button"
                onClick={handleSave}
                disabled={mutation.isPending}
              >
                Save
              </button>
              <button
                className="button button--red"
                onClick={() => setEditMode(false)}
                disabled={mutation.isPending}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="button" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
          <button className="button button--gray" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
