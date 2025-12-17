export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; SameSite=Strict`;
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

export function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export function setRole(role: string) {
  setCookie("admin_role", role);
}

export function getRole() {
  return getCookie("admin_role");
}
