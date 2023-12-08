import { useContext } from "react";
import { DocumentDetailContext } from "./DocumentDetailContext";
import ViewDocumentComponent from "../Components/ViewDocumentComponent/ViewDocumentComponent";
import { formatDate } from "../../utils/format";
import Banner from "../HomePage/Components/Banner";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Button } from "@mui/material";
import CollectionSection from "../HomePage/Components/CollectionSection";
import DocumentWithManyDownLoad from "../HomePage/Components/DocumentWithManyDownLoad";
import FlagIcon from "@mui/icons-material/Flag";
import FavoriteIcon from "@mui/icons-material/Favorite";
export default function DocumentDetailContent() {
  const { detaiDocument, hadnleBuyDocumnent } = useContext(
    DocumentDetailContext
  );
  return (
    <div className="flex flex-row flex-wrap gap-5">
      <div className="flex flex-col flex-wrap lg:flex-row lg:justify-around ">
        <div className="w-full lg:w-[70%]">
          <div className="flex flex-row flex-wrap items-center justify-between ">
            <div className="flex flex-col mb-5 gap-5">
              <h1 className="font-bold text-4xl text-blue-500">
                {detaiDocument.title}{" "}
              </h1>
              <div className="flex flex-row flex-wrap gap-5">
                <span>
                  Ngày đăng: {formatDate(detaiDocument.createdAt || new Date())}
                </span>
                <span>Số trang: {detaiDocument.total_page}</span>
              </div>
              <div className="flex flex-row flex-wrap gap-5">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<FavoriteIcon />}
                  onClick={hadnleBuyDocumnent}
                >
                  Yêu thích
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<ShoppingBasketIcon />}
                  onClick={hadnleBuyDocumnent}
                >
                  Mua ngay
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  startIcon={<FlagIcon />}
                  onClick={hadnleBuyDocumnent}
                >
                  Báo cáo
                </Button>
              </div>
            </div>
            <div className="flex flex-rowf flex-wrap gap-5 justify-center">
              <div className="flex flex-wrap flex-col gap-1">
                <span className="text-red-500">{detaiDocument.total_view}</span>
                <span>Lượt xem</span>
              </div>
              <div className="flex flex-wrap flex-col gap-1 justify-center">
                <span className="text-red-500">
                  {detaiDocument.total_download}
                </span>
                <span>Lượt tải</span>
              </div>
            </div>
          </div>

          <div className="lg:h-[650px] mb-5">
            {detaiDocument && detaiDocument.url_download !== "" && (
              <ViewDocumentComponent url={detaiDocument.url_download} />
            )}
          </div>

          <div className="flex flex-row flex-wrap gap-5">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ShoppingBasketIcon />}
              onClick={hadnleBuyDocumnent}
            >
              Mua ngay
            </Button>
          </div>
          <p className="my-5 text-2xl font-bold">Mô tả tài liệu</p>

          <div className="">{detaiDocument.description}</div>
        </div>
        <div className="w-full lg:w-[25%]">
          <Banner />

          <div className="h-[80vh] overflow-scroll custom-scrollbar px-5 py-2 border-collapse border">
            {/* <OtherDocument /> */}
            <CollectionSection numOfCardPerRow={1} />
          </div>
        </div>
      </div>
      <div className="px-3">
        <DocumentWithManyDownLoad />
      </div>
    </div>
  );
}
