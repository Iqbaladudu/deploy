export async function getToken({ email, password }) {
  const url = `${process.env.url}/auth/token/get/`;
  const data = {
    username: email,
    password: password,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Terjadi kesalahan");
  }

  return response.json();
}
