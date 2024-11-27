/**
 * @typedef {Object} Auth
 * @property {string} token
 * @property {string} refreshToken
 * @property {string} expiresIn
 */

/**
 * @returns {Auth}
 */
export function getAuth() {
  return {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
    expiresIn: localStorage.getItem("expiresIn"),
  };
}

/**
 * @param {Auth} auth
 */
export function saveAuth(auth) {
  localStorage.setItem("token", auth.token);
  localStorage.setItem("refreshToken", auth.refreshToken);
  localStorage.setItem("expiresIn", auth.expiresIn);
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("expiresIn");
}

export function tokenLoader() {
  return getAuth();
}
