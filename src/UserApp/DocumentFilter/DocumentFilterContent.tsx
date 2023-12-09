import CatagoriesComponent from "./Components/CatagoriesComponent";
import FilterResultComponent from "./Components/FilterResultComponent";

export default function DocumentFilterContent() {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-between">
      <div className="w-full lg:w-[20%]">
        <CatagoriesComponent />
      </div>
      <FilterResultComponent />
    </div>
  );
}
