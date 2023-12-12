import { useContext } from "react";
import { AppContext } from "../../AppContext";
import DocumentCardComponent from "../Components/DocumentCardComponent/DocumentCardComponent";

export default function SearchPage() {
  const { searchResult } = useContext(AppContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchResult &&
        searchResult.map((item, index) => {
          return (
            <DocumentCardComponent key={`${item._id} - ${index}`} data={item} />
          );
        })}
    </div>
  );
}
