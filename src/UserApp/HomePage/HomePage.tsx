import ViewDocumentComponent from "../Components/ViewDocumentComponent/ViewDocumentComponent";
import HomePageContent from "./HomePageContent";
import { HomePageContextProvider } from "./HomePageContext";

export default function HomePage() {
  return (
    <HomePageContextProvider>
      <HomePageContent />
    </HomePageContextProvider>
  );
}
