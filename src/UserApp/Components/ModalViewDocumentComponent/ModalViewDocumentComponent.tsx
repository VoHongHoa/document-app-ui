import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ViewDocumentComponent from "../ViewDocumentComponent/ViewDocumentComponent";
import useWindowSize from "../../../CustomeHook/useWindowSize";
interface IModalViewDocumentComponentProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  url: string;
}
export default function ModalViewDocumentComponent(
  props: IModalViewDocumentComponentProps
) {
  const { width } = useWindowSize();
  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={props.isOpenModal}
      fullScreen={width > 1023 ? false : true}
      maxWidth="md"
      PaperProps={{
        style: {
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, backgroundColor: "#2563EB", color: "white" }}
        id="customized-dialog-title"
      >
        Quick View Document
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={props.handleCloseModal}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "white",
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ViewDocumentComponent url={props.url} />
      </DialogContent>
    </Dialog>
  );
}
