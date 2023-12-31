import { getToken } from "../utils";

export async function predict(data) {
    const token = getToken();
    const response = await fetch(`${process.env.url}/demo/predict/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error("Error")
    }

    const resdata = response.json();
    return resdata
  }
