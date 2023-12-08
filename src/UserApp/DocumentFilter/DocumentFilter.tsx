import { useContext } from "react";
import DocumentFilterContent from "./DocumentFilterContent";
import {
  DocumentFilterContext,
  DocumentFilterContextProvider,
} from "./DocumentFilterContext";

export default function DocumentFilter() {
  const {} = useContext(DocumentFilterContext);
  return (
    <DocumentFilterContextProvider>
      <DocumentFilterContent />
    </DocumentFilterContextProvider>
  );
}
