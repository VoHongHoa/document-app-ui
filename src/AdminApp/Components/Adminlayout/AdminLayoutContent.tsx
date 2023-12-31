import { useContext } from "react";
import { AdminLayoutContext } from "./AdminLayoutContext";
import AdminHeaderComponent from "../../Components/AdminHeaderComponent/AdminHeaderComponent";
import { Outlet } from "react-router-dom";
import SideBarComponent from "../SideBarComponent/SideBarComponent";

export default function AdminLayoutContent(): JSX.Element {
  const { showSideBar } = useContext(AdminLayoutContext);
  return (
    <div className="m-[auto] flex flex-row flex-wrap min-h-screen">
      {showSideBar && (
        <div className="w-[15%] md:w-[7%] lg:w-[15%]">
          <SideBarComponent />
        </div>
      )}
      <div
        className={`${
          showSideBar === false ? "w-full" : "w-[85%] md:w-[93%] lg:w-[85%]"
        } `}
      >
        <div className="sticky top-0 border-b-2 z-50">
          <AdminHeaderComponent />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
