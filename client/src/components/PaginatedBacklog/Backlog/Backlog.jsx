import { useState } from "react";
import { TaskModal } from "../../TaskCard/modal/TaskModal";

export function Backlog({ backlog, total }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRowClick = (task) => {
    setSelectedTask({
      ...task,
      documentId: task.documentId,
    });
  };

  const closeModal = () => setSelectedTask(null);

  const handleTaskDeleted = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}></div>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th><strong>Backlog tasks: {total}</strong></th>
          </tr>
        </thead>
        <tbody>
          {backlog.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TaskModal 
        task={selectedTask} 
        onClose={closeModal}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
}
