import { Navigate, Route, Routes } from "react-router-dom";
import UserLayout from "../UserApp/Components/UserLayout/UserLayout";
import HomePage from "../UserApp/HomePage/HomePage";
import DocumentDetail from "../UserApp/DocumentDetail/DocumentDetail";
import ProfileLayout from "../UserApp/Components/ProfileLayout/ProfileLayout";
import UserProfilePage from "../UserApp/UserProfilePage/UserProfilePage";
import UserDocumentPage from "../UserApp/UserDocumentPage/UserDocumentPage";
import UserDocumentDownloadPage from "../UserApp/UserDocumentDownloadPage/UserDocumentDownloadPage";
import UserEPointPage from "../UserApp/UserEPointPage/UserEPointPage";
import { useAppSelector } from "../redux/hooks";
import DocumentFilter from "../UserApp/DocumentFilter/DocumentFilter";
import DocumentByCollection from "../UserApp/DocumentByCollection/DocumentByCollection";
import SignInCallback from "../UserApp/Components/HeaderComponent/Components/SignInCallback";

export default function UserApp(): JSX.Element {
  const { isLogin } = useAppSelector((state) => state.login);
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="google-auth"
          element={isLogin ? <Navigate to={"/"} /> : <SignInCallback />}
        />
        <Route path="document/:id" element={<DocumentDetail />} />
        <Route
          path="user"
          element={isLogin ? <ProfileLayout /> : <Navigate to={"/"} />}
        >
          <Route index element={<UserProfilePage />} />
          <Route path="my-document" element={<UserDocumentPage />} />
          <Route
            path="download-document"
            element={<UserDocumentDownloadPage />}
          />
          <Route path="my-epoint" element={<UserEPointPage />} />
        </Route>
        <Route path="document-filter" element={<DocumentFilter />} />
        <Route
          path="document-collection/:id"
          element={<DocumentByCollection />}
        />
      </Route>
    </Routes>
  );
}
