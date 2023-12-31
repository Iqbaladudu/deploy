import {getToken} from "../utils"

export async function getEngine() {
    const token = getToken()
    const response = await fetch(`${process.env.url}/engine/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        throw new Error('Error occured')
    }

    return response.json();
}