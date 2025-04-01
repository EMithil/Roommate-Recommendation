
import { useState, useEffect, createContext, useContext } from 'react';
import useApi from './useApi';
import { toast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [loading, setLoading] = useState<boolean>(true);

  const { postData } = useApi('auth');
  const { data: userData, loading: userLoading, error: userError, fetchData: fetchUser } = useApi<User>('auth/user');

  // Check token and load user
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          await fetchUser();
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          localStorage.removeItem('token');
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token, userData]);

  const login = async (email: string, password: string) => {
    try {
      const res = await postData({ email, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Login failed",
        variant: "destructive"
      });
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await postData({ name, email, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setUser(res.user);
        setIsAuthenticated(true);
        toast({
          title: "Success",
          description: "Registered successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Registration failed",
        variant: "destructive"
      });
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const checkAuth = async (): Promise<boolean> => {
    if (!token) return false;
    
    try {
      await fetchUser();
      return !!userData;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
