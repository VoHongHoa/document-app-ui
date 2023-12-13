import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import UserNavigation from "../../../UserApp/Components/HeaderComponent/Components/UserNavigation";
import NotificationComponent from "./Components/Notification";
import { useContext } from "react";
import { AdminLayoutContext } from "../Adminlayout/AdminLayoutContext";
export default function AdminHeaderComponent() {
  const { handleChangeSideBarMode, width } = useContext(AdminLayoutContext);
  return (
    <div className="h-16 flex flex-row flex-wrap items-center justify-between p-2 bg-gray-100">
      <div className="flex flex-row flex-wrap items-center gap-1 w-[70%]">
        <MenuIcon
          className="cursor-pointer"
          fontSize={"large"}
          onClick={handleChangeSideBarMode}
        />
        <div className="bg-white w-[80%] flex flex-row items-center">
          <input className="p-2 outline-none w-full" />
          <SearchIcon fontSize="large" className="cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-row items-center w-[30%]">
        {/* <LanguageIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <FullscreenIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <DarkModeIcon fontSize="large" sx={{ cursor: "pointer" }} /> */}

        <NotificationComponent />
        <div className="flex flex-row items-center">
          <UserNavigation />
        </div>
      </div>
    </div>
  );
}
