import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import agent from "../utils/agent";

type User = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    agent.Account.current()
      .then((user: any) => {
        setUser(user);
      })
      .catch((_error) => {
        setError(_error);
      })
      .finally(() => setLoadingInitial(false));
  }, []);

  function login(email: string, password: string) {
    setLoading(true);

    agent.Account.login({ email, password })
      .then((user: any) => {
        setUser(user);
        history("/");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    setLoading(true);

    agent.Account.register({ firstName, lastName, email, password })
      .then((user: any) => {
        setUser(user);
        history("/");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  function logout() {
    localStorage.clear();
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={{ ...memoedValue }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
