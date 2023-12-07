import { useState } from "react";
import { sidebarItem } from ".";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { logOut } from "../../../../redux/slices/AuthSlice";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { RoleEnum } from "../../../../utils";
interface IProfileSideBarComponentProps {
  handleClose?: () => void;
  isShowBorder?: boolean;
}
export default function ProfileSideBarComponent(
  props: IProfileSideBarComponentProps
) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAppSelector((state) => state.login);
  const [activeSidebar, setActiveSidebar] = useState<string>(
    location.pathname || "/user"
  );

  const handleChangePage = (path: string) => {
    if (props.handleClose) {
      props.handleClose();
    }
    setActiveSidebar(path);
    navigate(path);
  };
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    dispatch(logOut());
  };
  const handleGoAdmin = () => {
    navigate("/admin");
  };
  return (
    <ul className={props.isShowBorder ? "border w-full" : ""}>
      {sidebarItem.map((item, index) => {
        return (
          <li
            key={`${item.title}_profile_lauout_${index}`}
            className={`flex cursor-pointer hover:bg-blue-500
               hover:text-white flex-row flex-wrap py-3 px-1 items-center gap-5 ${
                 activeSidebar === item.path && "bg-blue-500 text-white"
               }`}
            onClick={() => handleChangePage(item.path)}
          >
            <span>
              <item.icon fontSize="large"></item.icon>
            </span>
            <span>{item.title}</span>
          </li>
        );
      })}
      {user && user.role === RoleEnum.ADMIN && (
        <li
          className="flex cursor-pointer hover:bg-blue-500
               hover:text-white flex-row flex-wrap py-3 px-1 items-center gap-5"
          onClick={handleGoAdmin}
        >
          <span>
            <SupervisorAccountIcon fontSize="large" />
          </span>
          <span>Go Admin</span>
        </li>
      )}

      <li
        className="flex cursor-pointer hover:bg-blue-500
               hover:text-white flex-row flex-wrap py-3 px-1 items-center gap-5"
        onClick={handleLogOut}
      >
        <span>
          <PowerSettingsNewIcon fontSize="large" />
        </span>
        <span>Log out</span>
      </li>
    </ul>
  );
}
