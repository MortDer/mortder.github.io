const AUTH_API_BASE_URL = 'http://19429ba06ff2.vps.myjino.ru/api';
const DEFAULT_COMMAND_ID = 'homework-14';

type ServerErrorItem = {
  message?: string;
  extensions?: {
    code?: string;
  };
};

type ServerErrorPayload = {
  errors?: ServerErrorItem[];
};

type SignUpApiBody = {
  email: string;
  password: string;
  commandId?: string;
};

type SignUpApiResult = {
  token: string;
};

export class ApiRequestError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'ApiRequestError';
    this.code = code;
  }
}

const mapServerError = (payload: unknown): ApiRequestError => {
  const data = payload as ServerErrorPayload | undefined;
  const firstError = data?.errors?.[0];
  const code = firstError?.extensions?.code;
  const message = firstError?.message || code || 'unexpected_error';

  return new ApiRequestError(message, code);
};

export const signUpRequest = async ({ email, password, commandId = DEFAULT_COMMAND_ID }: SignUpApiBody): Promise<SignUpApiResult> => {
  const response = await fetch(`${AUTH_API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      commandId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw mapServerError(data);
  }

  return data as SignUpApiResult;
};

