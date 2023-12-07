import DocumentDetailContent from "./DocumentDetailContent";
import { DocumentDetailContextProvider } from "./DocumentDetailContext";

export default function DocumentDetail() {
  return (
    <DocumentDetailContextProvider>
      <DocumentDetailContent />
    </DocumentDetailContextProvider>
  );
}
