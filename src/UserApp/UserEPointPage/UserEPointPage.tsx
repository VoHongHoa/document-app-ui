import UserEPointPageContent from "./UserEPointPageContent";
import { UserEPointPageContextProvider } from "./UserEPointPageContext";

export default function UserEPointPage() {
  return (
    <UserEPointPageContextProvider>
      <UserEPointPageContent />
    </UserEPointPageContextProvider>
  );
}
