import { API_URL, API_TOKEN } from "../constants/constants";

export async function postTask({ title, description, state, projectId, tags }) {
  const result = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        title,
        description,
        state,
        project: projectId,
        tags, // should be an array of tag IDs
      },
    }),
  });

  if (!result.ok) {
    const error = await result.json();
    throw new Error(error.error?.message || "Failed to create task");
  }

  return await result.json();
}
