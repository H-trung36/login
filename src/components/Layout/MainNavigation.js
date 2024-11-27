import { Link, Form, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const auth = useRouteLoaderData("layout");

  const isLogin = !!auth.token;

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogin && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLogin && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
