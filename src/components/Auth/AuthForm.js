import { useId } from "react";
import { redirect, useFetcher, useSearchParams } from "react-router-dom";
import { loginOrCreateAccount } from "../../services/accountService";
import { clearAuth, saveAuth } from "../../utils/auth";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const id = useId();
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLogin = searchParams.get("method") !== "signup";
  const isSubmitting = fetcher.state === "submitting";
  const data = fetcher.data;

  const emailId = "email" + id;
  const passwordId = "password" + id;

  const switchAuthModeHandler = () => {
    searchParams.set("method", isLogin ? "signup" : "login");
    setSearchParams(searchParams);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      {data && data.errors && (
        <ul className={classes["invalid-list"]}>
          {data.errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
      <fetcher.Form method="post">
        <div className={classes.control}>
          <label htmlFor={emailId}>Your Email</label>
          <input type="email" name="email" id={emailId} required />
        </div>
        <div className={classes.control}>
          <label htmlFor={passwordId}>Your Password</label>
          <input type="password" name="password" id={passwordId} required />
        </div>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting
              ? "Submitting..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </fetcher.Form>
    </section>
  );
};

export const authAction = async ({ request }) => {
  clearAuth();
  const searchParams = new URL(request.url).searchParams;
  const isLogin = searchParams.get("method") !== "signup";
  const data = await request.formData();

  const res = await loginOrCreateAccount(
    data.get("email"),
    data.get("password"),
    isLogin
  );

  const authJson = await res.json();

  if (res.status === 400) {
    return {
      errors: authJson.error.errors.map((e) => e.message),
    };
  }

  const auth = {
    token: authJson.idToken,
    refreshToken: authJson.refreshToken,
    expiresIn: authJson.expiresIn,
  };

  if (!auth) {
    // Thay vì sử dụng json(), dùng Response để trả về lỗi
    return new Response(JSON.stringify({ message: "System error!" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  saveAuth(auth);
  return redirect("/");
};

export default AuthForm;
