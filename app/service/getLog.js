import {getToken} from "../utils"

export async function getLog() {
    const token = getToken()
    const response = await fetch(`${process.env.url}/demo/log/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        throw new Error('Error occured')
    }

    return response.json();
}