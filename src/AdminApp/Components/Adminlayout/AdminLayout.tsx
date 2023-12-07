import { AdminLayoutContextProvider } from "./AdminLayoutContext";
import AdminLayoutContent from "./AdminLayoutContent";

export default function AdminLayout() {
  return (
    <AdminLayoutContextProvider>
      <AdminLayoutContent />
    </AdminLayoutContextProvider>
  );
}
