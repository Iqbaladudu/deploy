import {getToken} from "../utils"

export async function getUser() {
    const token = getToken()
    const response = await fetch(`${process.env.url}/auth/user-data/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (!response.ok) {
        throw new Error('Error occured')
    }

    const result = await response.json();
    return result
}