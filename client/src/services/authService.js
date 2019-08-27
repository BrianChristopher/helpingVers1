import http from "./httpService";
import { apiURL } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiURL + "/auth";
const tokenKey = "token";

http.setJWT(getJWT());

export async function loginUser(username, password) {
  const { data: jwt } = await http.post(apiEndpoint, { username, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginUserWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJWT() {
  const jwt = localStorage.getItem("token");
  return jwt;
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  loginUser,
  loginUserWithJWT,
  getCurrentUser,
  getJWT,
  logout
};
