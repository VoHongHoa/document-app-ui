import CollectionsContent from "./CollectionsContent";
import { CollectionsContextProvider } from "./CollectionsContext";

export default function Collections() {
  return (
    <CollectionsContextProvider>
      <CollectionsContent />
    </CollectionsContextProvider>
  );
}
