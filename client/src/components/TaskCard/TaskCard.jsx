import React, { useState } from "react";
import { Tag } from "./Tag/tag";
import { TaskModal } from "./modal/TaskModal";

export function TaskCard({ title, tasks, emptyText }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
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
      {/* Use TaskModal component here */}
      <TaskModal task={selectedTask} onClose={closeModal} />
    </div>
  );
}