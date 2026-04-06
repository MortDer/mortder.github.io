import { ApiRequestError } from 'src/shared/api/authApi';

export const getSignUpErrorKey = (error: unknown): string => {
  if (error instanceof ApiRequestError) {
    return error.code || error.message || 'unexpected_error';
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'unexpected_error';
};

