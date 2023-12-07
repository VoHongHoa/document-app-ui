import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import { Format } from "../../../utils";
import { Document } from "../../../interface";
import { useNavigate } from "react-router-dom";
interface IDocumentCardComponent {
  data: Omit<Document, "url_download">;
}
export default function DocumentCardComponent(props: IDocumentCardComponent) {
  const navigate = useNavigate();
  const handleViewDetail = () => {
    navigate(`/document/${props.data._id}`);
  };
  return (
    <div className="bg-white overflow-hidden rounded-md shadow-md border mt-2 ">
      <div>
        <img
          className="w-full h-full"
          src="https://tailieu.vn/image/gdoc/151_1621388624.jpg"
        />
      </div>

      <div
        className="bg-blue-400 text-white font-bold hover:bg-blue-300 cursor-pointer p-1 text-sm max-h-48"
        onClick={handleViewDetail}
      >
        <p>{props.data.title}</p>
      </div>

      <div className="flex flex-row flex-wrap justify-between p-1">
        <div className="flex flex-col gap-2">
          <span>
            <CalendarMonthIcon fontSize="small" />{" "}
            {Format.formatDate(props.data.createdAt || new Date())}
          </span>
          <span>
            <PersonIcon fontSize="small" /> honghoa1
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span>
            <FileCopyIcon fontSize="small" /> {props.data.total_page} page
          </span>
          <div className="flex flex-row flex-wrap gap-2">
            <span>
              <VisibilityIcon fontSize="small" /> {props.data.total_view}
            </span>
            <span>
              <DownloadIcon fontSize="small" />
              {props.data.total_download}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
