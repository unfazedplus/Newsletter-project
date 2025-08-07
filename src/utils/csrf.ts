export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const validateCSRFToken = (token: string): boolean => {
  const storedToken = sessionStorage.getItem('csrfToken');
  return storedToken === token;
};

export const setCSRFToken = (): string => {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrfToken', token);
  return token;
};