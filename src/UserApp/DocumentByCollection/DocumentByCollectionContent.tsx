import { useContext } from "react";
import DocumentCardComponent from "../Components/DocumentCardComponent/DocumentCardComponent";
import CollectionComponent from "./Components/CollectionComponent";
import { DocumentByCollectionContext } from "./DocumentByCollectionContext";

export default function DocumentByCollectionContent() {
  const { data } = useContext(DocumentByCollectionContext);
  return (
    <div className="flex flex-col lg:flex-row flex-wrap justify-between">
      <div className="w-full lg:w-[20%]">
        <CollectionComponent />
      </div>

      <div className="w-full lg:w-[78%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data &&
            data.map((item, index) => {
              return (
                <DocumentCardComponent
                  key={`${item._id} - ${index}`}
                  data={item}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
