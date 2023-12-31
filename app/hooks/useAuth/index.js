import { parseCookies, setCookie } from 'nookies';
import { useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = async (emailForm, passwordForm) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const url = `${process.env.url}/auth/token/get/`;
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
        setCookie(null, "iaiaccess", `${responseData.access}`, {
          maxAge: 60 * 60
        })
        setSuccess(true);

      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.detail);
      }
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, success, errorMessage, setErrorMessage };
};

export default useAuth;
