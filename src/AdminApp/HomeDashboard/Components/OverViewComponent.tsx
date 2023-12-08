import { useContext } from "react";
import { HomeDashboardContext } from "../HomeDashboardContext";

export default function OverViewComponent() {
  const { overViewData } = useContext(HomeDashboardContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="bg-green-500 text-white border border-solid p-5 rounded-lg flex flex-col gap-5">
        <span className="text-2xl">Tổng số người dùng</span>
        <span className="font-bold text-5xl">{overViewData.num_of_user}</span>
      </div>
      <div className="bg-blue-400 text-white border border-solid p-5 rounded-lg flex flex-col gap-5">
        <span className="text-2xl">Tổng số tài liệu</span>
        <span className="font-bold text-5xl">
          {overViewData.num_of_document}
        </span>
      </div>
      <div className="bg-red-400 text-white border border-solid p-5 rounded-lg flex flex-col gap-5">
        <span className="text-2xl">Tổng số lượt xem</span>
        <span className="font-bold text-5xl">
          {overViewData.num_of_total_view}
        </span>
      </div>
      <div className="bg-yellow-400 text-white border border-solid p-5 rounded-lg flex flex-col gap-5">
        <span className="text-2xl">Tổng số lượt tải</span>
        <span className="font-bold text-5xl">
          {overViewData.num_of_total_download}
        </span>
      </div>
    </div>
  );
}
