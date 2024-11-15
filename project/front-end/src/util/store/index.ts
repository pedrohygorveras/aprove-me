export function setUser(user: any) {
  sessionStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const user = sessionStorage.getItem("user");

  if (user) {
    return JSON.parse(user);
  }
}
