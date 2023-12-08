import CategoriesContent from "./CategoriesContent";
import { CategoriesContextProvider } from "./CategoriesContext";

export default function Categories() {
  return (
    <CategoriesContextProvider>
      <CategoriesContent />
    </CategoriesContextProvider>
  );
}
