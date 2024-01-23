import { getToken } from "../utils";

export async function getResJson({ queryKey }) {
  const token = getToken();
  const [_, key] = queryKey;
  const response = await fetch(`${process.env.url}/demo/log/res-json/${key}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  const data = response.json();
  return data;
}
