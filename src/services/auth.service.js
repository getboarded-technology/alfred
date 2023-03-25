import jwt_decode from "jwt-decode";

export function isUserLoggedIn() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const exp = jwt_decode(accessToken).exp;

    if (new Date(Date.now()) < new Date(exp * 1000)) {
      return true;
    }
  }

  logout();
  return false;
}

export function getAuthenticatedUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    return user;
  }
  return null;
}

export function getAccessToken() {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return accessToken;
  }
  return null;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}


