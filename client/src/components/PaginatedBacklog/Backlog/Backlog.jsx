import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskState } from "../../../data/updateTaskState";

const STATES = ["todo", "progress", "review", "done", "backlog"];

export function Backlog({ backlog, total }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ taskId, newState }) => updateTaskState(taskId, newState),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["backlog"] });
    },
  });

  const handleStateChange = (taskId, e) => {
    const newState = e.target.value;
    mutation.mutate({ taskId, newState });
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}></div>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th><strong>Backlog tasks: {total}</strong></th>
            <th>Change State</th>
          </tr>
        </thead>
        <tbody>
          {backlog.map((item) => (
            <tr key={item.documentId}>
              <td>{item.title}</td>
              <td>
                <select
                  value={item.state}
                  onChange={(e) => handleStateChange(item.documentId, e)}
                  disabled={mutation.isPending}
                >
                  {STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {mutation.isPending && mutation.variables?.taskId === item.documentId && (
                  <span className="ml-2">Saving...</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
