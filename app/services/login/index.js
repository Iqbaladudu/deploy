"use server"

import { cookies} from "next/headers"

async function login(emailForm, passwordForm) {
    const cookieStore = cookies()
    const url = "https://axioma.aiforindonesia.org/api/v1/auth/token/get/";

    const data = {
      username: emailForm,
      password: passwordForm,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network error");
      } else {
        const responseData = await response.json();
        cookieStore.set("iaiaccess", responseData.access, { secure: true })
        console.log(responseData.access)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
        console.log(cookieStore.get("iaiaccess"))
    }
  }

  export default login;