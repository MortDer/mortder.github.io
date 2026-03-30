import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CartPage } from 'src/pages/CartPage';
import { OperationsPage } from 'src/pages/OperationsPage';
import { ProductsPage } from 'src/pages/ProductsPage';
import { ProfilePage } from 'src/pages/ProfilePage';
import { AuthPage } from 'src/pages/AuthPage';
import { RequireAuth, RequireGuest } from './RouteGuards';

type AppRouterProps = {
  layout: React.ReactElement;
};

export const AppRouter: React.FC<AppRouterProps> = ({ layout }) => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <RequireGuest>
              <AuthPage />
            </RequireGuest>
          }
        />
        <Route path="/" element={layout}>
          <Route index element={<Navigate to="/profile" replace />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="products" element={<ProductsPage />} />
          <Route path="operations" element={<OperationsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
