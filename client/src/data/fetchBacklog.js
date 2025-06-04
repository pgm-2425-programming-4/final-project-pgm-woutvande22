import { API_URL, API_TOKEN } from "../constants/constants";

export async function fetchBacklog(page, pageSize) {
  const result = await fetch(
    `${API_URL}/projects?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  const data = await result.json();
  return data;
}


