import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Layout from "./layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Payment from "./pages/Payment.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Account from "./pages/Account.jsx";
import Business from "./pages/Business.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/",
            Component: Dashboard,
          },
          {
            path: "/payment",
            Component: Payment,
          },
          {
            path: "/account",
            Component: Account,
          },
          {
            path: "/subscriptions",
            Component: Subscriptions,
          },
          {
            path: "/business",
            Component: Business,
          },
        ],
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
