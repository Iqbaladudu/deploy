import useSWR from 'swr';
import { fetcher } from './fetcher';

const useUser = () => {
  const { data, mutate, error } = useSWR('/api/login', fetcher);
  const loading = !data && !error;

  return {
    user: data,
    mutate,
    error,
    loading,
  };
};

export default useUser;