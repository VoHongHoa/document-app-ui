import { useState } from "react";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { TSideBarData, sidebarItem } from ".";

export default function SideBarComponent(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSidebar, setActiveSidebar] = useState<string>(
    location.pathname || "/admin"
  );
  const handleOnchangePage = (path: string) => {
    setActiveSidebar(path);
    navigate(path);
  };
  return (
    <div className="sticky top-0 flex flex-col h-screen overflow-y-scroll custom-scrollbar border-r-2 bg-gray-100">
      <div className=" cursor-pointer h-14 flex flex-row items-center justify-center">
        <span className="font-bold italic text-xl">ADMIN DASHBOARD</span>
      </div>
      <Divider color="white" />
      <div className="flex flex-col">
        {sidebarItem.map((item: TSideBarData, index: number) => {
          return (
            <div
              key={index + "sidebar"}
              className={`flex flex-row flex-wrap gap-5 items-center cursor-pointer p-4 hover:bg-blue-500 ${
                activeSidebar === item.path && "bg-blue-500 text-white"
              }`}
              onClick={() => handleOnchangePage(item.path)}
            >
              <item.icon />
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
