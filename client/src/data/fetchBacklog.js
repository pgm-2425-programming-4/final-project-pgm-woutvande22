import { API_URL, API_TOKEN } from "../constants/constants";

export async function fetchBacklog(page, pageSize, projectId) {
  const result = await fetch(
    `${API_URL}/tasks?pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[state][$eq]=backlog&filters[project][id][$eq]=${projectId}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    },
  );
  const data = await result.json();
  return data;
}
