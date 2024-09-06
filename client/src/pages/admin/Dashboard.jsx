import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import SIdeNavbar from "./components/SIdeNavbar";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="flex lg:flex-row flex-col overflow-y-hidden min-h-screen bg-gray-100">
      <div className="hidden lg:block px-10 py-3 flex-shrink-0 border-r border-r-black bg-violet-700">
        <SIdeNavbar />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
