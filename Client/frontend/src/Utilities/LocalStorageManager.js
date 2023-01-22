export const ACCESS_KEY = "JWT_ACCESS_KEY";
export const ACTIVE_BTN = "currentActiveTab";
export function getAccessKey(key) {
  return localStorage.getItem(key);
}

export function setAccessKey(key, value) {
  return localStorage.setItem(key, value);
}

export function deleteAccessKey(key) {
  localStorage.removeItem(key);
}
