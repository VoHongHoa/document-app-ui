import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../HeaderComponent/HeaderComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import NotificationSystemComponent from "../NotificationSystemComponent/NotificationSystemComponent";

const UserLayout: React.FC = () => {
  return (
    <div className="">
      <div className="w-[100%] mb-5 sticky top-0 z-50 ">
        <HeaderComponent />
        <NotificationSystemComponent />
      </div>
      <div className="max-sm:w-[90%] w-[80%] m-[auto] ">
        <main className="mb-5">
          <Outlet />
        </main>
      </div>
      <div className="w-full h-2 bg-blue-500 mb-1"></div>
      <div className="max-sm:w-[90%] w-[80%] m-[auto]">
        <FooterComponent />
      </div>
    </div>
  );
};

export default UserLayout;
