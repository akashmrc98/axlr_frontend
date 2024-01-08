const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const TOKEN_BEARER = import.meta.env.VITE_TOKEN_BEARER;

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const authBearerHeader = () => {
  return TOKEN_BEARER + " " + getToken();
};
