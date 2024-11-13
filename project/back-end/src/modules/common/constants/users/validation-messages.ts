// Login validation messages
export const LOGIN_REQUIRED = 'Login is required.';
export const LOGIN_MIN_LENGTH = 'Login must be at least 4 characters.';
export const LOGIN_MAX_LENGTH = 'Login cannot exceed 50 characters.';
export const LOGIN_PATTERN = 'Login can only contain letters and numbers.';

// Password validation messages
export const PASSWORD_REQUIRED = 'Password is required.';
export const PASSWORD_MIN_LENGTH = 'Password must be at least 8 characters.';
export const PASSWORD_MAX_LENGTH = 'Password cannot exceed 32 characters.';

// Role validation messages
export const ROLE_REQUIRED = 'Role is required.';
export const ROLE_INVALID = (roles: string) =>
  `Role must be one of the following values: ${roles}`;
