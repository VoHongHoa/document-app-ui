import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useState } from "react";
import { HeaderContext } from "./HeaderContext";
import SignInModal from "./Components/SignInModal";
import { AppContext } from "../../../AppContext";
import SignUpModal from "./Components/SignUpModal";
import { useAppSelector } from "../../../redux/hooks";
import UserNavigation from "./Components/UserNavigation";
import useWindowSize from "../../../CustomeHook/useWindowSize";
import { useNavigate } from "react-router-dom";
import UploadDocument from "./Components/UploadDocument";
import Search from "./Components/Search";
export default function HeaderContent() {
  const navigate = useNavigate();
  const { handleMouseEnter, handleMouseLeave, isHovered } =
    useContext(HeaderContext);
  const { handleOpenMadal } = useContext(AppContext);
  const { isLogin } = useAppSelector((state) => state.auth);
  const { width } = useWindowSize();
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
    <div className="bg-cyan-800 p-3 w-full h-16">
      <div className="flex flex-row flex-wrap items-center text-white justify-between">
        <div className="cursor-pointer" onClick={handleReturnHomepage}>
          <img
            className="w-full"
            src="https://tailieu.vn/static/b2013az/templates/version1/default/images/tailieu.png"
          />
        </div>

        <UploadDocument />
        <Search />
        {renderUserNavigation()}
      </div>
    </div>
  );
  const desktopNavigation: JSX.Element = (
    <div className="bg-cyan-800 py-3 w-full h-fit ">
      <div className="flex flex-row flex-wrap text-white w-[80%] m-auto justify-between">
        <div className="w-[55%] flex flex-wrap flex-row items-center justify-between">
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
          <Search />
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
