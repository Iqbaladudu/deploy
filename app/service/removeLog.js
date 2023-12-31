import {getToken} from "../utils"

export async function removeLog(id) {
    const token = getToken()
    const response = await fetch(`${process.env.url}/demo/log/delete/${id}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error('Error occured')
    }

    return response.json();
}