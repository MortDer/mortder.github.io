import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuItem } from 'src/components/common/header/Header';
import { useAppDispatch, useAppSelector } from 'src/store';
import { initializeApp, syncTokenFromStorage } from 'src/store/authThunks';
import { selectIsAppInitialized } from 'src/store/selectors';
import { AUTH_TOKEN_STORAGE_KEY } from 'src/store/storage';
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
  const dispatch = useAppDispatch();
  const isAppInitialized = useAppSelector(selectIsAppInitialized);

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== AUTH_TOKEN_STORAGE_KEY) {
        return;
      }

      dispatch(syncTokenFromStorage(event.newValue));
    };

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, [dispatch]);

  if (!isAppInitialized) {
    return null;
  }

  return <AppRouter layout={<AppLayout />} />;
}

export default App;
