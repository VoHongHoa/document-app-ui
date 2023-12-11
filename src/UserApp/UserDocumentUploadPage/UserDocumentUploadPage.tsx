import UserDocumentDownloadPageContent from "./UserDocumentUploadPageContent";
import { UserDocumentUploadPageContextProvider } from "./UserDocumentUploadPageContext";

export default function UserDocumentUploadPage() {
  return (
    <UserDocumentUploadPageContextProvider>
      <UserDocumentDownloadPageContent />
    </UserDocumentUploadPageContextProvider>
  );
}
