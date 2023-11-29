import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import { useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const router = useRouter();

  const handleLogin = async (emailForm, passwordForm) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const url = 'https://axioma.aiforindonesia.org/api/v1/auth/token/get/';
      const data = {
        username: emailForm,
        password: passwordForm,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful:', responseData);
        setCookie(null, "iaiaccess", `${responseData.token}`)
        setSuccess(true);
        router.push("/dashboard/demo")

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
      }
    } catch (error) {
      console.log('Login failed:', error);
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, success, errorMessage, setErrorMessage };
};

export default useAuth;
