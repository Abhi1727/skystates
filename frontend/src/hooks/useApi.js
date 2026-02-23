import { useAuth } from '@clerk/clerk-react';

/**
 * Hook to get headers with Clerk auth token for API calls.
 * Use: fetch(url, { headers: await getAuthHeaders() })
 */
export const useApi = () => {
  const { getToken } = useAuth();

  const getAuthHeaders = async () => {
    const token = await getToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  return { getAuthHeaders };
};
