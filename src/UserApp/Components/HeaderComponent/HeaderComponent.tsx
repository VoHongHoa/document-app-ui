import HeaderContent from "./HeaderContent";
import { HeaderContextProvider } from "./HeaderContext";

export default function HeaderComponent() {
  return (
    <HeaderContextProvider>
      <HeaderContent />
    </HeaderContextProvider>
  );
}
