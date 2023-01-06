export function getItemKey() {
  return localStorage.getItem("JWT_ACCESS_KEY");
}

export function setKey(value) {
  return localStorage.setItem("JWT_ACCESS_KEY", value);
}

export function deleteKey() {
  localStorage.removeItem("JWT_ACCESS_KEY");
}
