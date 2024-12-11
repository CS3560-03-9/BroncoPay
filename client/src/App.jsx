
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { useEffect, useState } from "react";
import { fetchBusiness } from "./api/businesses";

import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SellIcon from "@mui/icons-material/Sell";

import { AppProvider } from "@toolpad/core";
import { Outlet } from "react-router-dom";
import LoadingPage from "./components/LoadingPage";

function App() {
  const [isBusiness, setIsBusiness] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentHandler = localStorage.getItem("handler");

  useEffect(() => {
    const checkBusiness = async () => {
      try {
        const result = await fetchBusiness(currentHandler);
        if (result.length > 0) {
          setIsBusiness(true);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkBusiness();
  }, [currentHandler]); 


  const NAVIGATION = [
    {
      kind: "header",
      title: "",
    },
    {
      segment: "",
      title: "Dashboard",
      icon: <DashboardIcon />,
      pattern: "/",
    },
    {
      segment: "payment",
      title: "Payments",
      icon: <PaymentIcon />,
    },
    ...(currentHandler !== 'disney'
      ? [
          {
            segment: "subscriptions",
            title: "Subscriptions",
            icon: <SellIcon />,
          },
        ]
      : []),
    ...(isBusiness
      ? [
          {
            segment: "business",
            title: "Business",
            icon: <BusinessCenterIcon />,
          },
        ]
      : []),
    {
      kind: "divider",
    },
    {
      segment: "account",
      title: "Account",
      icon: <ManageAccountsIcon />,
    },
    {
      segment: "login",
      title: "Logout",
      icon: <LogoutIcon />,
    },
  ];

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: "BroncoPay",
      }}
    >
      <Outlet />
    </AppProvider>
  );
}

export default App;
