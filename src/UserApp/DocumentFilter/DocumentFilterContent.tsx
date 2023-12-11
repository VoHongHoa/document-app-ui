import CatagoriesComponent from "./Components/CatagoriesComponent";
import FilterResultComponent from "./Components/FilterResultComponent";

export default function DocumentFilterContent() {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-between">
      <div className="w-full lg:w-[20%] bg-gray-200 h-fit border  rounded-md">
        <CatagoriesComponent />
      </div>
      <div className=" w-full lg:w-[78%] bg-gray-200 border rounded-md p-2">
        <FilterResultComponent />
      </div>
    </div>
  );
}
