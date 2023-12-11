import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { Popover } from "@mui/material";
import ProfileSideBarComponent from "../../ProfileLayout/Components/ProfileSideBarComponent";
import useWindowSize from "../../../../CustomeHook/useWindowSize";
export default function UserNavigation() {
  const { user } = useAppSelector((state) => state.login);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { width } = useWindowSize();
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar
        alt="Remy Sharp"
        src={user?.avatar}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        className="cursor-pointer relative"
        id="avatar"
      />
      {width >= 1023 && (
        <span className="font-bold">
          {user?.display_name || "Tên Người dùng"}
        </span>
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
        sx={{ padding: 0 }}
      >
        <div className="p-2">
          <ProfileSideBarComponent handleClose={handleClose} />
        </div>
      </Popover>
    </div>
  );
}
