import React from "react";
import { DocumentsContextProvider } from "./DocumentContext";
import DocumentsContent from "./DocumentsContent";
export default function Documents(): JSX.Element {
  return (
    <DocumentsContextProvider>
      <DocumentsContent />
    </DocumentsContextProvider>
  );
}
