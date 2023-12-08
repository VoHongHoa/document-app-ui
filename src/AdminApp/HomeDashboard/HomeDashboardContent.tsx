import BarChartComponent from "../Components/ChartComponent/BarChartComponent";
import LineChartComponent from "../Components/ChartComponent/LineChartComponent";
import PieChartComponent from "../Components/ChartComponent/PieChartComponent";
import Documents from "../Documents/Documents";
import User from "../User/User";
import OverViewComponent from "./Components/OverViewComponent";
export default function HomeDashboardContent() {
  const chartData = {
    labels: ["January", "February", "March", "April", "May"],
    data: [65, 59, 80, 200, 56],
  };
  return (
    <div className="flex flex-col p-2">
      <div className="mb-7">
        <OverViewComponent />
      </div>

      <div className="flex flex-wrap flex-row items-center justify-between mb-7 border">
        <div className="w-[60%]">
          <User />
        </div>
        <div className="w-[38%]">
          <LineChartComponent chartData={chartData} />
        </div>
      </div>
      <div className="flex flex-wrap flex-row items-center justify-between border">
        <div className="w-[60%]">
          <Documents />
        </div>
        <div className="w-[38%] flex flex-col flex-wrap">
          <BarChartComponent label="Chart bar" chartData={chartData} />
          <PieChartComponent chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
