import { API_URL, API_TOKEN } from "../constants/constants";

export async function deleteTask(taskId) {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error deleting task: ${response.statusText}`);
    }

    return await response.json();
}