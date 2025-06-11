import React from "react";
import { Tag } from "../Tag/tag";

export function TaskModal({ task, onClose }) {
  if (!task) return null;

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
          <p><strong>State:</strong> {task.state}</p>
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