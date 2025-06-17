import React, { useState } from "react";
import { Tag } from "./Tag/tag";
import { TaskModal } from "./Modal/TaskModal";

export function TaskCard({ title, tasks, emptyText, className }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCardClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <div className={`column__title ${className}`}>{title}</div>
      <div>
        {tasks.length === 0 ? (
          <div>
            <div>{emptyText}</div>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id}>
              <div className="card" onClick={() => handleCardClick(task)}>
                <div>
                  <p>{task.title}</p>
                  <div className="card__tags">
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
