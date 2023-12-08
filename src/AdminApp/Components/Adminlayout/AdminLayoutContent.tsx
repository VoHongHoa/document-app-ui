import { useContext } from "react";
import { AdminLayoutContext } from "./AdminLayoutContext";
import AdminHeaderComponent from "../../Components/AdminHeaderComponent/AdminHeaderComponent";
import { Outlet } from "react-router-dom";
import AdminFooterComponent from "../../Components/AdminFooterComponent/AdminFooterComponent";
import SideBarComponent from "../SideBarComponent/SideBarComponent";

export default function AdminLayoutContent(): JSX.Element {
  const {} = useContext(AdminLayoutContext);
  return (
    <div className="m-[auto] flex flex-row flex-wrap min-h-screen">
      <div className="w-[15%] ">
        <SideBarComponent />
      </div>
      <div className="w-[85%]">
        <div className="sticky top-0 border-b-2 z-50">
          <AdminHeaderComponent />
        </div>
        <div className="">
          <Outlet />
        </div>
        {/* <div>
          <AdminFooterComponent />
        </div> */}
      </div>
    </div>
  );
}
