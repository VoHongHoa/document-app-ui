import UserDocumentPageContent from "./UserDocumentPageContent";
import { UserDocumentPageContextProvider } from "./UserDocumentPageContext";

export default function UserDocumentPage() {
  return (
    <UserDocumentPageContextProvider>
      <UserDocumentPageContent />
    </UserDocumentPageContextProvider>
  );
}
