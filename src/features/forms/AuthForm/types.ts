import { FormProps } from 'src/features/forms/types';

export enum AuthMode {
  signIn = 'signIn',
  signUp = 'signUp',
}

export type AuthFormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type AuthFormProps = FormProps<AuthFormValues> & {
  mode: AuthMode;
};


