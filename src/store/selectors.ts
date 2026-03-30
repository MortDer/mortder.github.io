import { AppState } from 'src/store/store';

export const selectIsAppInitialized = (state: AppState): boolean => state.app.isInitialized;

export const selectToken = (state: AppState): string | null => state.auth.token;
export const selectProfile = (state: AppState) => state.auth.profile;
export const selectIsAuthorized = (state: AppState): boolean => Boolean(state.auth.token);
export const selectIsAdmin = (state: AppState): boolean => state.auth.profile?.role === 'admin';

export const selectProducts = (state: AppState) => state.products.items;

export const selectCartProducts = (state: AppState) => state.cart.items;
