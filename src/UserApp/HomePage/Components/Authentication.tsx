import { Divider } from "@mui/material";
import { useContext } from "react";
import { HomePageContext } from "../HomePageContext";
import Avatar from "@mui/material/Avatar";
import { AppContext } from "../../../AppContext";
import { useAppSelector } from "../../../redux/hooks";

export default function Authentication() {
  const { signUpData, handleOnchangeInput, handleSignUp } =
    useContext(HomePageContext);
  const { handleOpenMadal } = useContext(AppContext);
  const { isLogin, user } = useAppSelector((state) => state.login);
  const renderContent = () => {
    if (!isLogin) {
      return (
        <div className="max-sm:w-full flex flex-col w-[25%] border p-2 gap-4">
          <p className="text-lg text-center text-blue-600 font-bold">
            Sign Up Account
          </p>
          <button className="border p-3 bg-blue-600 text-white">
            Sign up with Facebook
          </button>
          <Divider>
            <span className="text-center">Or</span>
          </Divider>
          <input
            className="border p-2"
            placeholder="Email"
            value={signUpData.email}
            onChange={(e) => handleOnchangeInput("email", e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="Password"
            value={signUpData.password}
            onChange={(e) => handleOnchangeInput("password", e.target.value)}
          />
          <input
            className="border p-2"
            placeholder="DisplayName"
            value={signUpData.username}
            onChange={(e) =>
              handleOnchangeInput("display_name", e.target.value)
            }
          />
          <button
            className="border p-3 bg-orange-500 text-white"
            onClick={handleSignUp}
          >
            Đăng ký
          </button>
          <span>
            Bạn đã có tài khoản?
            <strong
              className="text-blue-600 cursor-pointer"
              onClick={() => handleOpenMadal("signInModal")}
            >
              Đăng nhập
            </strong>
          </span>
        </div>
      );
    }
    return (
      <div className="max-sm:w-full flex flex-col w-[25%] border p-2 gap-4 items-center">
        <div className="relative">
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className="cursor-pointer"
            sx={{ width: "200px", height: "200px", zIndex: "-50" }}
          />
        </div>

        <span className="font-bold">{user?.email || "Email Người dùng"}</span>
        <span className="font-bold">
          {user?.display_name || "Tên Người dùng"}
        </span>
      </div>
    );
  };
  return renderContent();
}
