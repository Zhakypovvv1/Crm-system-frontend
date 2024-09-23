import { Routes, Route } from "react-router-dom";
import AppLayout from "../Layout/AppLayout";
import { Suspense } from "react";
import HomePage from "../../pages/HomePage/HomePage";
import AuthorizationPage from "../../pages/AuthorizationPage/AuthorizationPage";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import NotesPage from "../../pages/NotesPage/NotesPage";
import DetailsPage from "../../pages/DetailsPage/DetailsPage";

const AppRouter = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/tasks/:id/notes" element={<NotesPage />} />
          <Route path="/tasks/:id/details" element={<DetailsPage />} />
          <Route path="/categories" element={<HomePage />} />
          <Route path="/tags" element={<HomePage />} />
        </Route>
        <Route path="/auth/authorization" element={<AuthorizationPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
