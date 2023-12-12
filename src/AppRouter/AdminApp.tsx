import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import HomeDashboard from "../AdminApp/HomeDashboard/HomeDashboard";
import Role from "../AdminApp/Role/Role";
import User from "../AdminApp/User/User";
import Documents from "../AdminApp/Documents/Documents";
import AdminLayout from "../AdminApp/Components/Adminlayout/AdminLayout";
import { RoleEnum } from "../utils";
import Categories from "../AdminApp/Categories/Categories";
import Collections from "../AdminApp/Collections/Collections";

export default function AdminApp(): JSX.Element {
  const { isLogin, user } = useAppSelector((state) => state.auth);
  return (
    <Routes>
      <Route
        path="admin"
        element={
          isLogin && user && user.role === RoleEnum.ADMIN ? (
            <AdminLayout />
          ) : (
            <Navigate to={"/"} />
          )
        }
      >
        <Route index element={<HomeDashboard />} />
        <Route path="roles" element={<Role />} />
        <Route path="users" element={<User />} />
        <Route path="documents" element={<Documents />} />
        <Route path="categories" element={<Categories />} />
        <Route path="collections" element={<Collections />} />
      </Route>
    </Routes>
  );
}
