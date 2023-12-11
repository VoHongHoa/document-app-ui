import { useContext } from "react";
import DocumentCardComponent from "../../Components/DocumentCardComponent/DocumentCardComponent";
import { DocumentFilterContext } from "../DocumentFilterContext";

export default function FilterResultComponent() {
  const { data } = useContext(DocumentFilterContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data &&
        data.map((item, index) => {
          return (
            <DocumentCardComponent key={`${item._id} - ${index}`} data={item} />
          );
        })}
    </div>
  );
}
