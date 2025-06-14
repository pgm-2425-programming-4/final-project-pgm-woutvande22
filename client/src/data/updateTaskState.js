import { API_URL, API_TOKEN } from "../constants/constants";

export async function updateTaskState(taskId, newState) {
  const result = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: { state: newState },
    }),
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.error?.message || "Failed to update task state");
  }

  return await result.json();
}