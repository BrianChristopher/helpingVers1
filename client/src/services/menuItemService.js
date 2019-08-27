import http from "./httpService";
import { apiURL } from "../config.json";
import { getCurrentUser } from "./authService";

const apiEndpoint = apiURL + "/menuItems";

export function createNewMenuItem(menuItem, userID) {
  return http.post(apiEndpoint, {
    category: menuItem.category,
    ingredients: menuItem.ingredients,
    name: menuItem.name,
    user: userID
  });
}

export function getMenuItems() {
  return http.get(apiEndpoint);

}

export default {
  createNewMenuItem,
  getMenuItems
};
