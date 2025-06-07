import { API_URL, API_TOKEN } from "../constants/constants";


export async function fetchProjects() {
    const result = await fetch(
        `${API_URL}/projects?populate=*`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        },
    );
    const data = await result.json();
    console.log("Fetched projects:", data);
    return await data;
}