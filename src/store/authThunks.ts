import { v4 as uuidv4 } from 'uuid';
import { AppDispatch, AppState } from 'src/store/store';
import { clearStoredToken, getStoredToken, setStoredToken } from 'src/store/storage';
import { clearCart } from 'src/store/slices/cartSlice';
import { setInitialized } from 'src/store/slices/appSlice';
import { setToken } from 'src/store/slices/authSlice';

const buildFakeToken = (email: string): string => {
  const normalizedEmail = email.trim().toLowerCase();
  const role = normalizedEmail.includes('admin') ? 'admin' : 'user';

  return `${role}-${uuidv4()}`;
};

export const initializeApp =
  () =>
  (dispatch: AppDispatch, getState: () => AppState): void => {
    if (getState().app.isInitialized) {
      return;
    }

    const token = getStoredToken();

    dispatch(setToken(token));
    dispatch(setInitialized(true));
  };

export const signIn =
  (email: string) =>
  (dispatch: AppDispatch): void => {
    const token = buildFakeToken(email);

    setStoredToken(token);
    dispatch(setToken(token));
  };

export const signOut =
  () =>
  (dispatch: AppDispatch): void => {
    clearStoredToken();
    dispatch(setToken(null));
    dispatch(clearCart());
  };

export const syncTokenFromStorage =
  (token: string | null) =>
  (dispatch: AppDispatch): void => {
    if (!token) {
      dispatch(setToken(null));
      dispatch(clearCart());
      return;
    }

    dispatch(setToken(token));
  };

export { getStoredToken };
