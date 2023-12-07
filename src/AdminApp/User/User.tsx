import UserContent from "./UserContent";
import { UserContextProvider } from "./UserContext";

export default function User(): JSX.Element {
  return (
    <UserContextProvider>
      <UserContent />
    </UserContextProvider>
  );
}
