import { useState, useEffect, useContext, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { AppContext } from "../../../AppContext";
import { DocumentService } from "../../../Service";
import { Document, ExceptionResponse } from "../../../interface";
import DocumentCardComponent from "../../Components/DocumentCardComponent/DocumentCardComponent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
interface IDocumentWithManyViewProps {
  numOfCardPerRow?: number;
}

export default function DocumentWithManyView(
  props: IDocumentWithManyViewProps
) {
  const navigate = useNavigate();
  const [data, setData] = useState<Omit<Document, "url_download">[]>([]);
  const { handleOpenNotify } = useContext(AppContext);
  const fetchData = useCallback(() => {
    DocumentService.getDocumentWithManyView()
      .then((response) => {
        setData(response);
      })
      .catch((error: ExceptionResponse) => {
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  }, [handleOpenNotify]);
  const handleViewMore = () => {
    navigate("/document-filter");
  };
  useEffect(() => {
    return fetchData();
  }, [fetchData]);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row flex-wrap justify-between">
        <span className="text-blue-600 text-2xl uppercase">
          Tài liệu Được xem nhiều nhất
        </span>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleViewMore}
        >
          Xem thêm
        </Button>
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
