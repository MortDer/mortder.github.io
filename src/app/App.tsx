import React from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { MenuItem } from 'src/components/common/header/Header';
import { Layout } from 'src/layouts/main-layout/Layout';
import { CartPage } from 'src/pages/CartPage';
import { OperationsPage } from 'src/pages/OperationsPage';
import { ProductsPage } from 'src/pages/ProductsPage';
import { ProfilePage } from 'src/pages/ProfilePage';

const menuItems: MenuItem[] = [
  { id: 'profile', title: 'Профиль', navTo: '/profile' },
  { id: 'products', title: 'Товары', navTo: '/products' },
  { id: 'operations', title: 'Операции', navTo: '/operations' },
  { id: 'cart', title: 'Корзина', navTo: '/cart' },
];

const AppLayout: React.FC = () => <Layout menuItems={menuItems} mainContent={<Outlet />} />;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/profile" replace />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="operations" element={<OperationsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
