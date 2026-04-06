import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectIsAuthorized } from 'src/store/selectors';

type GuardProps = {
  children: React.ReactElement;
};

export const RequireAuth: React.FC<GuardProps> = ({ children }) => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (!isAuthorized) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export const RequireGuest: React.FC<GuardProps> = ({ children }) => {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};
