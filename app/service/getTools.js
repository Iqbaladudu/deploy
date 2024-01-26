import { getToken } from "../utils";

export async function getTools({ queryKey }) {
  const token = getToken();
  const [slug] = queryKey;
  const response = await fetch(`${process.env.url}/engine/technology/${slug}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}
