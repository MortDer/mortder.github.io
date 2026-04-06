import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'src/store/types';

type AuthState = {
  token: string | null;
  profile: Profile | null;
};

const buildProfile = (token: string | null): Profile | null => {
  if (!token) {
    return null;
  }

  const role: Profile['role'] = token.startsWith('admin-') ? 'admin' : 'user';
  const idPart = token.split('-').slice(1).join('-');
  const suffix = idPart.slice(0, 8) || 'guest';

  return {
    id: `profile-${suffix}`,
    name: role === 'admin' ? 'Администратор' : 'Покупатель',
    email: role === 'admin' ? 'admin@fake.local' : 'user@fake.local',
    role,
  };
};

const initialState: AuthState = {
  token: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.profile = buildProfile(action.payload);
    },
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
