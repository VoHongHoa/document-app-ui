import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import { ExceptionResponse, Notification } from "../../../../interface";
import { AppContext } from "../../../../AppContext";
import { NotificationService } from "../../../../Service";
import { Avatar } from "@mui/material";
import { formatDate } from "../../../../utils/format";
import ViewNotificationDetail from "./ViewNotificationDetail";
export default function NotificationComponent() {
  const { handleOpenBackDrop, handleCloseBackDrop, handleOpenNotify } =
    useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [data, setData] = useState<Notification[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleViewDetail = (item: Notification) => {
    setSelectedId(item._id);
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setSelectedId("");
    setIsOpenModal(false);
  };

  const fetchData = () => {
    handleOpenBackDrop();
    NotificationService.geUserNotification()
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setData(response);
          const number = response.filter(
            (item) => item.isRead === false
          ).length;

          setNumber(number);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  useEffect(() => {
    return fetchData();
  }, []);

  return (
    <div>
      <div className="relative">
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          color="inherit"
        >
          <NotificationsIcon fontSize={"large"} sx={{ cursor: "pointer" }} />
        </IconButton>
        <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-red-500 text-white flex flex-row justify-center items-center">
          <p className="text-sm font-bold">{number}</p>
        </div>
      </div>

      {selectedId !== "" && (
        <ViewNotificationDetail
          id={selectedId}
          isOpenModal={isOpenModal}
          handleClose={handleCloseModal}
          handleAfterCloseModal={fetchData}
        />
      )}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        disableScrollLock
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="h-[50vh] w-[300px] flex flex-col flex-wrap items-center p-2 gap-1">
          {data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div
                  className={`cursor-pointer p-2 rounded-lg flex flex-row flex-wrap justify-between items-center ${
                    item.isRead === false && "bg-gray-200"
                  } hover:bg-gray-200 w-full`}
                  key={item._id}
                  onClick={() => handleViewDetail(item)}
                >
                  <Avatar
                    src={item.sender.avatar}
                    sx={{ height: 40, width: 40 }}
                  />
                  <div className="w-[80%] text-sm">
                    <p className="">
                      <strong>{item.sender.display_name}</strong> đã upload{" "}
                      <strong>{item.document?.title}</strong>
                    </p>
                    <div className="flex flex-row flex-wrap justify-between">
                      <p className="italic text-[11px]">
                        {formatDate(item.createAt || new Date())}
                      </p>
                      {item.isRead === true && (
                        <p className="italic text-[11px]"> Đã đọc</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Hiện không có thông báo!</p>
          )}
        </div>
      </Popover>
    </div>
  );
}
