import jwtDecode from 'jwt-decode'

export const TOKEN_KEY = "user-token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem("user-id") !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUserId = () => localStorage.getItem("user-id");

export const saveToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
  let decoded = jwtDecode(token);
  let userId = decoded.sub;
  localStorage.setItem("user-id", userId);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user-id");
  localStorage.removeItem("order-id");
  localStorage.removeItem("cart");
  localStorage.setItem("qtyCart", 0);
  window.location.href = '/login'
};