import React, { useState } from "react";
import { Tag } from "../Tag/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskState } from "../../../data/updateTaskState";

const STATES = ["todo", "progress", "review", "done", "backlog"];

export function TaskModal({ task, onClose }) {
  const [currentState, setCurrentState] = useState(task?.state);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, newState }) => updateTaskState(taskId, newState),
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  if (!task) return null;

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setCurrentState(newState);
    mutation.mutate({ taskId: task.documentId, newState });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{task.title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description || <em>No description</em>}</p>
          <p>
            <strong>State:</strong>{" "}
            <select value={currentState} onChange={handleStateChange} disabled={mutation.isPending}>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {mutation.isPending && <span className="ml-2">Saving...</span>}
          </p>
          <p><strong>Project:</strong> {task.project?.title || <em>No project</em>}</p>
          <div className="tags mt-3">
            {task.tags?.length
              ? task.tags.map((tag) => (
                  <Tag key={tag.id} title={tag.title} />
                ))
              : <em>No tags</em>}
          </div>
          <p className="mt-3"><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(task.updatedAt).toLocaleString()}</p>
        </section>
        <footer className="modal-card-foot">
          <button className="button" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}