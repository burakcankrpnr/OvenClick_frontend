import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, token }) {
  return token ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;
