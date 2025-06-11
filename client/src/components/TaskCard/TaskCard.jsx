import React from "react";
import { Tag } from "./Tag/tag";

export function TaskCard({ title, tasks, emptyText }) {
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
              <div className="card">
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
    </div>
  );
}