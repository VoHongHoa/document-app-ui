import Avatar from "@mui/material/Avatar";
import { useAppSelector } from "../../../../redux/hooks";

export default function AvartarComponent() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col flex-wrap items-center gap-1">
      <Avatar
        alt="Remy Sharp"
        src={
          user?.avatar ||
          "https://inkythuatso.com/uploads/thumbnails/800/2022/03/avatar-mac-dinh-nu-co-mau-30-10-31-43.jpg"
        }
        sx={{ width: 250, height: 250 }}
      />
      <span className="font-bold">
        {user?.display_name || user?.username || "Người dùng"}
      </span>
      <span className="font-bold">{user?.email || "Email Người dùng"}</span>
    </div>
  );
}
