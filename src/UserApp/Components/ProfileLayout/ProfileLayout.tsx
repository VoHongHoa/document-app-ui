import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBarComponent from "./Components/ProfileSideBarComponent";
import AvartarComponent from "./Components/AvartarComponent";
import useWindowSize from "../../../CustomeHook/useWindowSize";

const ProfileLayout: React.FC = () => {
  const { width } = useWindowSize();
  return (
    <main className="mb-5">
      <div className="flex flex-col lg:flex-row flex-wrap justify-between">
        <div className="w-full lg:w-[25%] flex flex-col items-center gap-5">
          <AvartarComponent />
          {width > 624 && <ProfileSideBarComponent isShowBorder={true} />}
        </div>
        <div className="w-full lg:w-[70%]">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ProfileLayout;
