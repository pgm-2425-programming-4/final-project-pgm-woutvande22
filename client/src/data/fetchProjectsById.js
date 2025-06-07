import { API_URL, API_TOKEN } from "../constants/constants";


export async function fetchProjectsById(projectId) {
    const result = await fetch(
        `${API_URL}/projects?filters[id][$eq]=${projectId}&populate=*`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        },
    );
    const data = await result.json();
    return await data;
}