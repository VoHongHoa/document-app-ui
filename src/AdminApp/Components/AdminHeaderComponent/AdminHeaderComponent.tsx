import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
export default function AdminHeaderComponent() {
  const { user } = useAppSelector((state) => state.login);
  return (
    <div className="h-14 flex flex-row flex-wrap items-center justify-between p-2">
      <div className="flex flex-row flex-wrap items-center gap-6">
        <MenuIcon fontSize="large" />
        <div className="relative">
          <input className="border p-2 bg-gray-100 w-96" />
          <SearchIcon
            fontSize="large"
            className="cursor-pointer absolute right-0 top-1"
          />
        </div>
      </div>

      <div className="flex flex-row gap-3 items-center">
        <LanguageIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <FullscreenIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <DarkModeIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <NotificationsIcon fontSize="large" sx={{ cursor: "pointer" }} />
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className="cursor-pointer"
          />
          <span className="font-bold">{user?.username || "Người dùng"}</span>
        </div>
      </div>
    </div>
  );
}
