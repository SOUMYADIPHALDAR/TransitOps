import { Outlet } from "react-router-dom";
import { SideMenu } from "./sideMenu";

const AppLayout = () => (
  <div className="min-h-screen bg-slate-50 lg:pl-64">
    <SideMenu />
    <Outlet />
  </div>
);

export default AppLayout;
