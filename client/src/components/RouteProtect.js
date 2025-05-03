import React from 'react';
import { Navigate } from 'react-router-dom';

const RouteProtect = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/404" />;
};

export default RouteProtect;
