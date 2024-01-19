import { getToken } from "../utils";

export async function updateLog(data) {
  const token = getToken();

  const response = await fetch(
    `${process.env.url}/demo/log/update/${data.id}/`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Prediction failed: ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData;
}
