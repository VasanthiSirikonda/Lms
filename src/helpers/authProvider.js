import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(sessionStorage.getItem("token"));
  const { decodedToken, isExpired } = useJwt(token);

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token && !isExpired) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      sessionStorage.setItem("token", token);
    } else if (token) {
      if (isExpired)
        alert("Hello! ,Your login session is expired. Login again.");
      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.clear();
      window.location.reload();
    }
  }, [token, isExpired]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
