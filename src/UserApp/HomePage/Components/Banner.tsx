import { useContext, useEffect, useState } from "react";
import { Collection, ExceptionResponse } from "../../../interface";
import { CollectionService } from "../../../Service";
import { StatusEnum } from "../../../utils";
import { AppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const { handleOpenNotify } = useContext(AppContext);
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection[]>([]);
  const fetchData = () => {
    CollectionService.getDataSelect(StatusEnum.Active)
      .then((response) => {
        if (response) {
          setCollection(response);
        }
      })
      .catch((error: ExceptionResponse) => {
        handleOpenNotify("error", error.message || "Lỗi server");
      });
  };
  const handleViewCollection = (id: string) => {
    navigate(`document-collection/${id}`);
  };
  useEffect(() => {
    return fetchData();
  }, []);
  return (
    <div className="max-sm:w-full flex flex-row w-full">
      <div className="flex flex-col w-full">
        <div className="w-full">
          <img
            className="w-full"
            src="https://tailieu.vn/banners/836_1658975426.jpg"
          />
        </div>
        <div className="flex flex-row justify-between my-5">
          {collection &&
            collection.map((item, index) => {
              if (index <= 2) {
                return (
                  <div
                    key={item._id}
                    className="w-[30%] border shadow p-2 cursor-pointer hover:bg-slate-400"
                    onClickCapture={() => handleViewCollection(item._id)}
                  >
                    <img className="w-full h-full" src={item.theme_image} />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
