import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = apiURL + "/users"

export function registerUser(user) {
    return http.post(apiEndpoint, {
        username: user.username,
        password: user.password,
        name: user.name
    });
}

export default {
    registerUser
}