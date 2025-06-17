import { useState } from "react";
import { TaskModal } from "../../TaskCard/modal/TaskModal";

export function Backlog({ backlog, total }) {
  const [selectedTask, setSelectedTask] = useState(null);

  const handleRowClick = (task) => {
    setSelectedTask({
      ...task,
      documentId: task.documentId, // ensure documentId is set for modal
    });
  };

  const closeModal = () => setSelectedTask(null);

  return (
    <div>
      <table className="backlog">
        <thead className="backlog__header">
          <tr>
            <th className="backlog__title">
              <strong>Backlog tasks: {total}</strong>
            </th>
          </tr>
        </thead>
        <tbody className="backlog__body">
          {backlog.map((item) => (
            <tr
              key={item.id}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
              className="backlog__row"
            >
              <td className="backlog__text">{item.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TaskModal task={selectedTask} onClose={closeModal} />
    </div>
  );
}
