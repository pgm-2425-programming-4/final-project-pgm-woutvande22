import { API_URL, API_TOKEN } from "../constants/constants";

export async function fetchTasksByProjectId(projectId) {
  const result = await fetch(
    `${API_URL}/tasks?filters[project][id][$eq]=${projectId}&populate=tags`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}