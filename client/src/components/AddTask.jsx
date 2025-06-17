import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postTask } from "../data/postTask";
import { TagDropdown } from "./TagDropdown";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      state,
      projectId,
      tags: selectedTags.length ? selectedTags : [],
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
                  onChange={e => setTitle(e.target.value)}
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
                  onChange={e => setDescription(e.target.value)}
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
                  onChange={e => setState(e.target.value)}
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
              <div className="control">
                <TagDropdown
                  tags={tags}
                  value={selectedTags}
                  onChange={val =>
                    setSelectedTags(
                      Array.isArray(val)
                        ? val
                        : val
                        ? [val]
                        : []
                    )
                  }
                  multiple
                  placeholder="Select tags"
                />
              </div>
            </div>
            {mutation.isError && (
              <div className="notification is-danger">
                {mutation.error.message}
              </div>
            )}
          </section>
          <footer className="modal-card-foot">
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
          </footer>
        </form>
      </div>
    </div>
  );
}