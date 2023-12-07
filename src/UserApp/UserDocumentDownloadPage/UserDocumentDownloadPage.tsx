import UserDocumentDownloadPageContent from "./UserDocumentDownloadPageContent";
import { UserDocumentDownloadPageContextProvider } from "./UserDocumentDownloadPageContext";

export default function UserDocumentDownloadPage() {
  return (
    <UserDocumentDownloadPageContextProvider>
      <UserDocumentDownloadPageContent />
    </UserDocumentDownloadPageContextProvider>
  );
}
