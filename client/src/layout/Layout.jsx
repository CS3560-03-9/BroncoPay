// eslint-disable-next-line no-unused-vars
import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardLayout } from "@toolpad/core";
import SidebarFooter from "../components/Dashboard/SidebarFooter";

export default function Layout() {
  return (
    <DashboardLayout
      defaultSidebarCollapsed
      slots={{ sidebarFooter: SidebarFooter }}
    >
      <Outlet />
    </DashboardLayout>
  );
}
