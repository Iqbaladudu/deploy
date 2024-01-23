import { getToken } from "../utils";

export async function getLog({ queryKey }) {
  const token = getToken();
  const [_, id, count, page] = queryKey;
  const response = await fetch(
    `${process.env.url}/demo/log/my/${id}?page=${page}&data=${count}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error occured");
  }

  return response.json();
}
