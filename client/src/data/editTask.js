import { API_URL, API_TOKEN } from "../constants/constants";

export async function editTask(taskId, { state, title, description, tags }) {
  const result = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        state,
        title,
        description,
        tags, // This will be an array of tag IDs
      },
    }),
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.error?.message || "Failed to update task");
  }

  return await result.json();
}
