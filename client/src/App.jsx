import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from '@mui/icons-material/Login';
import PaymentIcon from '@mui/icons-material/Payment';


import { AppProvider } from "@toolpad/core";
import { Outlet } from "react-router-dom";

function App() {
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
      segment: "Payment",
      title: "Payments",
      icon: <PaymentIcon />,
    },
    {
      segment: "login",
      title: "Login",
      icon: <LoginIcon />,
    },
  ];

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        title: "BroncoPay",
      }}
    >
      {/* <BasicTable /> */}
      {/* <ButtonUsage/> */}
      <Outlet />
      
    </AppProvider>
  );
}

export default App;
