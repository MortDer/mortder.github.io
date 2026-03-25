import React from 'react';
import { Outlet } from 'react-router-dom';
import { MenuItem } from 'src/components/common/header/Header';
import { AppRouter } from './AppRouter';
import { Layout } from 'src/layouts/main-layout/Layout';

const menuItems: MenuItem[] = [
  { id: 'profile', title: 'Профиль', navTo: '/profile' },
  { id: 'products', title: 'Товары', navTo: '/products' },
  { id: 'operations', title: 'Операции', navTo: '/operations' },
  { id: 'cart', title: 'Корзина', navTo: '/cart' },
];

const AppLayout: React.FC = () => <Layout menuItems={menuItems} mainContent={<Outlet />} />;

function App() {
  return <AppRouter layout={<AppLayout />} />;
}

export default App;
