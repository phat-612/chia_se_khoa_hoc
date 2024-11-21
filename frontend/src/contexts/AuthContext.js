import { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const refreshUser = () => {
    const token = Cookie.get("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-info-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data.user || {});
      })
      .catch((error) => {
        Cookie.remove("accessToken");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
