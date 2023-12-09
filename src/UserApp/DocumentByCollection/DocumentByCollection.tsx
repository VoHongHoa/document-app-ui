import DocumentByCollectionContent from "./DocumentByCollectionContent";
import { DocumentByCollectionContextProvider } from "./DocumentByCollectionContext";

export default function DocumentByCollection() {
  return (
    <DocumentByCollectionContextProvider>
      <DocumentByCollectionContent />
    </DocumentByCollectionContextProvider>
  );
}
