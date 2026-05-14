export const auth = {
  appName: 'Customer Directory',
  tagline: 'Sign in to manage your customers',
  title: 'Sign In',
  fields: {
    username: 'Username',
    password: 'Password',
  },
  placeholders: {
    username: 'Enter your username',
    password: 'Enter your password',
  },
  submit: 'Sign In',
  validation: {
    usernameTooShort: 'Username must be at least 2 characters',
    passwordTooShort: 'Password must be at least 4 characters',
  },
  hint: {
    title: 'Demo credentials',
    username: 'Username',
    password: 'Password',
  },
} as const;

export type AuthNS = typeof auth;
