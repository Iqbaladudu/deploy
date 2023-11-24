import login from '@/app/services/login';
import { useRouter } from 'next/router';
import { useState } from 'react';

const useAuth = () => {
  const [loading, setLoading] = useState();
  const router = useRouter();

  return {
    loginuser: (username, password) => {
      login(username, password);
    },
  };
};


export default useAuth;