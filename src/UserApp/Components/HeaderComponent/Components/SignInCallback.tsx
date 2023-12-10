import { useContext, useEffect } from "react";
import { AppContext } from "../../../../AppContext";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/hooks";
import { UserService } from "../../../../Service";
import { ExceptionResponse } from "../../../../interface";
import { loginSuccess } from "../../../../redux/slices/AuthSlice";

export default function SignInCallback() {
  const { handleOpenNotify, handleOpenBackDrop, handleCloseBackDrop } =
    useContext(AppContext);
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const access_token = searchParams.get("access_token") || "";
  localStorage.setItem("access_token", access_token);

  const fetchUserData = () => {
    handleOpenBackDrop();
    UserService.getMe()
      .then((response) => {
        handleOpenBackDrop();
        dispatch(
          loginSuccess({
            isLogin: true,
            access_token: access_token,
            user: response,
          })
        );
      })
      .catch((error: ExceptionResponse) => {
        handleCloseBackDrop();
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  useEffect(() => {
    return fetchUserData();
  }, [access_token]);

  return <div className="h-[80vh]">Dang tiến hành đăng nhập</div>;
}
