import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = apiURL + "/auth";

export function loginUser(username, password) {
  return http.post(apiEndpoint, { username, password });
}
