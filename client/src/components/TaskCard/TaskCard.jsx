import React from "react";
import { Tag } from "./Tag/tag";

export function TaskCard({ title, tasks, emptyText }) {
  return (
    <div className='card has-background-primary has-text-primary-00'>
      <h2 className='is-size-3'>{title}</h2>
      <div>
        {tasks.length === 0
          ? <span>{emptyText}</span>
          : tasks.map((task) => (
              <div key={task.id}>
                {task.title}
                <div>
                  {task.tags?.map((tag) => (
                    <Tag key={tag.id} title={tag.title} />
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}