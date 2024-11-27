const API_KEY = "AIzaSyBeAa_x3oVlIj-x31YTLu5uus0DeaqWA0I";

/**
 * @param {string} email
 * @param {string} password
 * @param {boolean} isLogin
 */
export async function loginOrCreateAccount(email, password, isLogin) {
  const action = isLogin ? "signInWithPassword" : "signUp";
  return await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${action}?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
}
