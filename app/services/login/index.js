"use server"

import { cookies} from "next/headers"

async function login(emailForm, passwordForm) {
    const cookieStore = cookies()
    const url = "https://axioma.aiforindonesia.org/api/v1/auth/token/get/";

    const data = {
      username: emailForm,
      password: passwordForm,
    };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        const responseData = await response.json();
        cookieStore.set("iaiaccess", responseData.access, { secure: true })
        console.log(responseData.access)
  }

  export default login;