import { useContext, useEffect, useState } from "react";
import { DocumentDetailContext } from "../DocumentDetailContext";
import { Avatar, IconButton, Popover } from "@mui/material";
import { AppContext } from "../../../AppContext";
import { useAppSelector } from "../../../redux/hooks";
import InputEmoji from "react-input-emoji";
import { CommentService } from "../../../Service";
import { Comment, ExceptionResponse } from "../../../interface";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CommentComponent() {
  const { detaiDocument } = useContext(DocumentDetailContext);
  const { handleOpenBackDrop, handleCloseBackDrop, handleOpenNotify } =
    useContext(AppContext);
  const { user, isLogin } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const [text, setText] = useState<string>("");
  const [data, setData] = useState<Comment[]>([]);
  const handleOnEnter = (text: string) => {
    if (isLogin) {
      createComment(text);
    } else {
      handleOpenNotify("warning", "Vui lòng đăng nhập để tiếp tục");
    }
  };
  const createComment = (text: string) => {
    handleOpenBackDrop();
    CommentService.create({
      text,
      document_id: detaiDocument._id,
    })
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          handleOpenNotify("success", "Thêm mới bình luận thành công");
          fetchCommentByDocument();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const fetchCommentByDocument = () => {
    handleOpenBackDrop();
    CommentService.getCommentByDocument(detaiDocument._id)
      .then((response) => {
        handleCloseBackDrop();
        if (response) {
          setData(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  useEffect(() => {
    return fetchCommentByDocument();
  }, [detaiDocument]);

  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (comment_id: string) => {};

  const handleDelete = (comment_id: string) => {
    handleClose();
    handleOpenBackDrop();
    CommentService.remove(comment_id)
      .then((response) => {
        if (response) {
          fetchCommentByDocument();
        }
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  return (
    <div className="">
      <div className="flex flex-row flex-wrap justify-between items-center mb-3">
        <div className="w-[10%]">
          <Avatar
            alt="Remy Sharp"
            src={user?.avatar}
            className="cursor-pointer relative"
          />
        </div>

        <div className="w-[88%]">
          <InputEmoji
            value={text}
            onChange={setText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Type a message"
            inputClass="p-5"
          />
        </div>
      </div>
      <div className="h-[50vh] overflow-y-scroll custom-scrollbar">
        {data &&
          data.map((item, index) => {
            return (
              <div key={item._id} className="flex flex-row flex-wrap  my-2">
                <div className="w-[15%]">
                  <Avatar
                    alt="Remy Sharp"
                    src={item.createdBy?.avatar}
                    className="cursor-pointer relative"
                  />
                </div>

                <div className="bg-white border rounded-lg p-2 w-[75%]">
                  <p className="font-bold">{item.createdBy?.display_name}</p>
                  <p>{item.text}</p>
                </div>
                {user?._id === item.createdBy?._id && (
                  <div className="w-[9%]">
                    <IconButton
                      aria-label="actions"
                      onClick={(e) => handleActionsClick(e)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
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
                    >
                      <div className="w-40">
                        <div
                          className="pr-2 cursor-pointer flex flex-row items-center hover:bg-slate-300"
                          onClick={() => handleEdit(item._id)}
                        >
                          <IconButton aria-label="actions">
                            <EditIcon fontSize="small" className="text-black" />
                          </IconButton>
                          <span>Edit</span>
                        </div>
                        <div
                          className="pr-2 cursor-pointer flex flex-row items-center text-red-600 hover:bg-slate-300"
                          onClick={() => handleDelete(item._id)}
                        >
                          <IconButton aria-label="actions">
                            <DeleteIcon
                              fontSize="small"
                              className="text-red-600"
                            />
                          </IconButton>
                          <span>Delete</span>
                        </div>
                      </div>
                    </Popover>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
