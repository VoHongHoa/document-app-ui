import { Outlet } from "react-router-dom";
import CatagoriesComponent from "./Components/CatagoriesComponent";

export default function DocumentFilterLayout() {
  return (
    <main className="mb-5">
      <div className="flex flex-col lg:flex-row flex-wrap justify-between">
        <div className="w-full lg:w-[25%] flex flex-col items-center gap-5">
          <CatagoriesComponent />
        </div>
        <div className="w-full lg:w-[70%]">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
