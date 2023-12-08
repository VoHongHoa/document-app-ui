import HomeDashboardContent from "./HomeDashboardContent";
import { HomeDashboardContextProvider } from "./HomeDashboardContext";

export default function HomeDashboard() {
  return (
    <HomeDashboardContextProvider>
      <HomeDashboardContent />
    </HomeDashboardContextProvider>
  );
}
