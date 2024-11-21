import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user.id && !loading) {
      navigate("/login");
    }
  });
  if (loading) {
    return <div>Loading...</div>;
  }
  return children;
};

export default PrivateRoute;
