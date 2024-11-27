import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { authAction } from "./components/Auth/AuthForm";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { logoutAction } from "./components/Layout/Logout";
import { tokenLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    id: "layout",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
        action: authAction,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
