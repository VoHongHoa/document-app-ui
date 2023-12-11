import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useState } from "react";
import { HeaderContext } from "./HeaderContext";
import SignInModal from "./Components/SignInModal";
import { AppContext } from "../../../AppContext";
import SignUpModal from "./Components/SignUpModal";
import { useAppSelector } from "../../../redux/hooks";
import UserNavigation from "./Components/UserNavigation";
import useWindowSize from "../../../CustomeHook/useWindowSize";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import UploadDocument from "./Components/UploadDocument";
export default function HeaderContent() {
  const navigate = useNavigate();
  const {
    handleMouseEnter,
    handleMouseLeave,
    isHovered,
    handleOpenModalUpload,
  } = useContext(HeaderContext);
  const { handleOpenMadal } = useContext(AppContext);
  const { isLogin } = useAppSelector((state) => state.login);
  const { width } = useWindowSize();
  const [showSearchInput, setShowSeachInput] = useState<boolean>(false);
  const handleOnclickSearchIcon = () => {
    const currentState = showSearchInput;
    setShowSeachInput(!currentState);
  };

  const handleUploadDocument = () => {
    if (!isLogin) {
      return handleOpenMadal("signInModal");
    }
    handleOpenModalUpload();
  };
  const handleReturnHomepage = () => {
    navigate("/");
  };
  const renderUserNavigation = (): JSX.Element => {
    if (!isLogin) {
      if (width <= 1023) {
        return (
          <div>
            <button
              className="border p-1"
              onClick={() => handleOpenMadal("signInModal")}
            >
              Đăng nhập
            </button>
            <SignInModal />
            <SignUpModal />
          </div>
        );
      }
      return (
        <div className="flex flex-row gap-4">
          <span
            className="cursor-pointer"
            onClick={() => handleOpenMadal("signInModal")}
          >
            Đăng nhập
          </span>
          <SignInModal />
          <div className="w-[1px] bg-white"></div>
          <span
            className="cursor-pointer"
            onClick={() => handleOpenMadal("signUpModal")}
          >
            Đăng ký
          </span>
          <SignUpModal />
        </div>
      );
    }
    return <UserNavigation />;
  };

  const mobileNavigation: JSX.Element = (
    <div className="bg-cyan-800 py-3 w-full h-14">
      <div className="flex flex-row flex-wrap items-center text-white justify-between">
        <div className="cursor-pointer" onClick={handleReturnHomepage}>
          <img
            className="w-full"
            src="https://tailieu.vn/static/b2013az/templates/version1/default/images/tailieu.png"
          />
        </div>

        <UploadDocument />

        <SearchIcon onClick={handleOnclickSearchIcon} />
        {showSearchInput && (
          <div className="absolute top-14 left-0 w-full text-black flex flex-row justify-between items-center">
            <input className="p-2 w-full" placeholder="Search" autoFocus />
            <SendIcon
              className="absolute right-2 text-gray-400"
              fontSize="small"
            />
          </div>
        )}

        {renderUserNavigation()}
      </div>
    </div>
  );
  const desktopNavigation: JSX.Element = (
    <div className="bg-cyan-800 py-3 w-full h-14 ">
      <div className="flex flex-row flex-wrap text-white w-[80%] m-auto justify-between">
        <div className="w-[50%] flex flex-wrap flex-row items-center justify-between">
          <div className="cursor-pointer" onClick={handleReturnHomepage}>
            <img src="https://tailieu.vn/static/b2013az/templates/version1/default/images/tailieu.png" />
          </div>
          <div className="flex flex-row flex-wrap items-center cursor-pointer">
            <MenuIcon />
            <span onMouseEnter={() => handleMouseEnter("subMenu")}>
              Danh mục
            </span>
            {isHovered.subMenu && (
              <div
                className="bg-white text-black p-2 absolute top-14 w-[200px] border"
                onMouseLeave={() => handleMouseLeave("subMenu")}
              >
                <ul>
                  <li className="p-1 hover:bg-cyan-800 hover:text-white">
                    Tài liệu tham khảo
                  </li>
                  <li className="p-1 hover:bg-cyan-800 hover:text-white">
                    Bộ tài liệu 4.0
                  </li>
                  <li className="p-1 hover:bg-cyan-800 hover:text-white">
                    Bộ sưu tập
                  </li>
                  <li className="p-1 hover:bg-cyan-800 hover:text-white">
                    Luận văn và Luận đề
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative w-1/2">
            <input className="outline-none p-1 text-black w-[80%]" />
            <SearchIcon className="relative right-[1.5rem] cursor-pointer z-50 text-black" />
          </div>
        </div>
        <div className="w-[40%] flex flex-wrap flex-row items-center justify-between">
          <UploadDocument />
          <span className="cursor-pointer">
            Nâng cấp <strong className="bg-orange-400 p-1">VIP</strong>
          </span>
          {renderUserNavigation()}
        </div>
      </div>
    </div>
  );

  const renderNavigation = (): JSX.Element => {
    if (width <= 1023) {
      return mobileNavigation;
    } else {
      return desktopNavigation;
    }
  };

  return renderNavigation();
}
