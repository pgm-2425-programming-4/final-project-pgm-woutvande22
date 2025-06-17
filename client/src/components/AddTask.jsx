import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask } from "../data/postTask";

export function AddTask({ projectId, tags, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("todo");
  const [selectedTags, setSelectedTags] = useState([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => postTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      onClose();
    },
  });

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      state,
      projectId,
      tags: selectedTags,
    });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <form onSubmit={handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">Add New Task</p>
            <button className="delete" type="button" onClick={onClose}></button>
          </header>
          <section className="modal-card-body">
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={mutation.isPending}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={mutation.isPending}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">State</label>
              <div className="control">
                <select
                  className="input"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={mutation.isPending}
                >
                  <option value="todo">To do</option>
                  <option value="progress">In progress</option>
                  <option value="review">In Review</option>
                  <option value="done">Done</option>
                  <option value="backlog">Backlog</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label className="label">Tags</label>
              <div className="tags are-medium" style={{ flexWrap: "wrap" }}>
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={
                      "tag" +
                      (selectedTags.includes(tag.id)
                        ? " is-primary"
                        : " is-light") +
                      " clickable"
                    }
                    style={{ cursor: "pointer", margin: "0.25em" }}
                    onClick={() => handleTagClick(tag.id)}
                  >
                    {tag.title || tag.name}
                  </span>
                ))}
              </div>
            </div>
            {mutation.isError && (
              <div className="notification is-danger">
                {mutation.error.message}
              </div>
            )}
          </section>
          <div className="button__container">
            <button
              className="button is-success"
              type="submit"
              disabled={mutation.isPending}
            >
              Add Task
            </button>
            <button className="button" type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
