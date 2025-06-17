import { API_URL, API_TOKEN } from "../constants/constants";

export async function fetchTags() {
  const result = await fetch(`${API_URL}/tags`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const data = await result.json();
  return data;
}
