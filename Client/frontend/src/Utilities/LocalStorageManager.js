export function getAccessKey() {
  return localStorage.getItem("JWT_ACCESS_KEY");
}

export function setAccessKey(value) {
  return localStorage.setItem("JWT_ACCESS_KEY", value);
}

export function deleteAccessKey() {
  localStorage.removeItem("JWT_ACCESS_KEY");
}
