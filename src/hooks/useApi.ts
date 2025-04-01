
import { useState } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  postData: (body: any) => Promise<any>;
}

// Base API URL
const API_URL = 'http://localhost:5000/api';

export const useApi = <T>(endpoint: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get token from localStorage
  const getToken = () => localStorage.getItem('token');

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['x-auth-token'] = token;
      }
      
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('API fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const postData = async (body: any): Promise<any> => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['x-auth-token'] = token;
      }
      
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || `API error: ${response.statusText}`);
      }

      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('API post error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, postData };
};

export default useApi;
