import UserProfilePageContent from "./UserProfilePageContent";
import { UserProfilePageContextProvider } from "./UserProfilePageContext";

export default function UserProfilePage() {
  return (
    <UserProfilePageContextProvider>
      <UserProfilePageContent />
    </UserProfilePageContextProvider>
  );
}
