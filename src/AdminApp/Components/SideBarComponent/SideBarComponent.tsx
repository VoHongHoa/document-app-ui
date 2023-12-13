import { useContext, useState } from "react";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { TSideBarData, sidebarItem } from ".";
import { AdminLayoutContext } from "../Adminlayout/AdminLayoutContext";

export default function SideBarComponent(): JSX.Element {
  const { width } = useContext(AdminLayoutContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSidebar, setActiveSidebar] = useState<string>(
    location.pathname || "/admin"
  );
  const handleOnchangePage = (path: string) => {
    setActiveSidebar(path);
    navigate(path);
  };
  const handleGoToHomePage = () => {
    navigate("/");
  };
  return (
    <div className="sticky top-0 flex flex-col h-screen overflow-y-scroll custom-scrollbar border-r-2 bg-gray-100">
      <div
        className=" cursor-pointer h-16 flex flex-row items-center justify-center"
        onClick={handleGoToHomePage}
      >
        {width > 1023 ? (
          <span className="font-bold italic text-xl">ADMIN</span>
        ) : (
          <span className="font-bold italic text-xl">AD</span>
        )}
      </div>
      <Divider color="white" />
      <div className="flex flex-col">
        {sidebarItem.map((item: TSideBarData, index: number) => {
          return (
            <div
              key={index + "sidebar"}
              className={`flex flex-row flex-wrap gap-5 items-center justify-center lg:justify-start cursor-pointer p-4 hover:bg-blue-500 hover:text-white ${
                activeSidebar === item.path && "bg-blue-500 text-white"
              }`}
              onClick={() => handleOnchangePage(item.path)}
            >
              <item.icon />
              {width > 1023 && <span>{item.title}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
