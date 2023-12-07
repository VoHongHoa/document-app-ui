import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../../../AppContext";
import { DocumentService } from "../../../Service";
import { Document, ExceptionResponse } from "../../../interface";
import DocumentCardComponent from "../../Components/DocumentCardComponent/DocumentCardComponent";

interface ICollectionSectionProps {
  numOfCardPerRow?: number;
}

export default function CollectionSection(props: ICollectionSectionProps) {
  const [data, setData] = React.useState<Omit<Document, "url_download">[]>([]);
  const { handleOpenNotify } = React.useContext(AppContext);
  const fetchData = () => {
    DocumentService.getDocumentHomePage()
      .then((response) => {
        setData(response);
      })
      .catch((error: ExceptionResponse) => {
        handleOpenNotify("error", error.message || "Upload unsuccess");
      });
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row flex-wrap justify-between">
        <span className="text-blue-600 text-2xl uppercase">
          Tài liệu nổi bật
        </span>
        <button className="border p-1">
          <AddIcon fontSize="small" /> Xem thêm
        </button>
      </div>
      <div
        className={
          props.numOfCardPerRow
            ? `grid grid-cols-${props.numOfCardPerRow}`
            : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`
        }
      >
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
  );
}
