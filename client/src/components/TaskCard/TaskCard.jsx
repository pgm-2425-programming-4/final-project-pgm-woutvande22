import React, { useState } from "react";
import { Tag } from "./Tag/tag";

export function TaskCard({ title, tasks, emptyText }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="mb-5">
      <h2 className="title is-3">{title}</h2>
      <div className="columns is-multiline">
        {tasks.length === 0 ? (
          <div className="column is-12">
            <div className="notification is-light">{emptyText}</div>
          </div>
        ) : (
          tasks.map((task) => (
            <div className="column is-4" key={task.id}>
              <div className="card is-clickable" onClick={() => handleCardClick(task)}>
                <div className="card-content">
                  <p className="title is-5">{task.title}</p>
                  <div className="tags">
                    {task.tags?.map((tag) => (
                      <Tag key={tag.id} title={tag.title} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedTask && (
        <div className={`modal is-active`}>
          <div className="modal-background" onClick={closeModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{selectedTask.title}</p>
              <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>
            <section className="modal-card-body">
              <p><strong>Title:</strong> {selectedTask.title}</p>
              <p><strong>Description:</strong> {selectedTask.description || <em>No description</em>}</p>
              <p><strong>State:</strong> {selectedTask.state}</p>
              <p><strong>Project:</strong> {selectedTask.project?.name || <em>No project</em>}</p>
              <div className="tags mt-3">
                {selectedTask.tags?.length
                  ? selectedTask.tags.map((tag) => (
                      <Tag key={tag.id} title={tag.title} />
                    ))
                  : <em>No tags</em>}
              </div>
              <p className="mt-3"><strong>Created At:</strong> {new Date(selectedTask.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(selectedTask.updatedAt).toLocaleString()}</p>
            </section>
            <footer className="modal-card-foot">
              <button className="button" onClick={closeModal}>Close</button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}