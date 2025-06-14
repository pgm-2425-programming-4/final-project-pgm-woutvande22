import { useState, useEffect } from "react";
import { Tag } from "../Tag/tag";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTask } from "../../../data/editTask";

const STATES = ["todo", "progress", "review", "done", "backlog"];

export function TaskModal({ task, onClose}) {
  const [editMode, setEditMode] = useState(false); //zet edit mode when clicked
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentState, setCurrentState] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCurrentState(task.state);
    }
  }, [task]);

  const mutation = useMutation({
    mutationFn: ({ taskId, state, title, description }) =>
      editTask(taskId, { state, title, description }),
    onSuccess: () => {
      // update task in backlog and task when change state
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["backlog"] });
      setEditMode(false);
    },
  });



  if (!task) return null;

  const handleSave = () => {
    mutation.mutate({
      taskId: task.documentId,
      state: currentState,
      title,
      description,
    });
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{editMode ? title : task.title}</p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <p>
            <strong>Title:</strong>{" "}
            {editMode ? (
              <input
                className="input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                disabled={mutation.isPending}
              />
            ) : (
              task.title
            )}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            {editMode ? (
              <textarea
                className="textarea"
                value={description}
                onChange={e => setDescription(e.target.value)}
                disabled={mutation.isPending}
              />
            ) : (
              task.description || <em>No description</em>
            )}
          </p>
          <p>
            <strong>State:</strong>{" "}
            {editMode ? (
              <select
                value={currentState}
                onChange={e => setCurrentState(e.target.value)}
                disabled={mutation.isPending}
              >
                {STATES.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            ) : (
              currentState
            )}
            {mutation.isPending && <span className="ml-2">Saving...</span>}
          </p>
          <p>
            <strong>Project:</strong>{" "}
            {task.project?.name || <em>No project</em>}
          </p>
          <div className="tags mt-3">
            {task.tags?.length
              ? task.tags.map(tag => (
                  <Tag key={tag.id} title={tag.title} />
                ))
              : <em>No tags</em>}
          </div>
          <p className="mt-3">
            <strong>Created At:</strong>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </p>
        </section>
        <footer className="modal-card-foot">
          {editMode ? (
            <>
              <button
                className="button is-success"
                onClick={handleSave}
                disabled={mutation.isPending}
              >
                Save
              </button>
              <button
                className="button"
                onClick={() => setEditMode(false)}
                disabled={mutation.isPending}
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="button" onClick={() => setEditMode(true)}>
              Edit
            </button>
          )}
          <button className="button" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}
