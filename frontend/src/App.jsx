import { Navigate, Route, Routes } from "react-router";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import ChatPage from "./pages/ChatPage";
import NotificationsPage from "./pages/NotificationsPage";
import CallPage from "./pages/CallPage";
import Loader from "./components/Loader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import FriendsPage from "./pages/FriendsPage";

import { useSelector } from "react-redux";

export default function App() {
  const { authUser, isLoading } = useAuthUser();

  const theme = useSelector((state) => state.theme);

  const isOnboarded = authUser?.isOnBoarded;

  if (isLoading) return <Loader />;

  return (
    <div className="bg-base-100" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={true}>
                <Home />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !authUser ? (
              <SignupPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !authUser ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/onboarding"
          element={
            !isOnboarded ? (
              <OnboardingPage />
            ) : (
              <Navigate to={authUser ? "/" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            authUser && isOnboarded ? (
                <CallPage />
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
        <Route
          path="/friends"
          element={
            authUser && isOnboarded ? (
              <Layout showSidebar={true}>
                <FriendsPage />
              </Layout>
            ) : (
              <Navigate to={authUser ? "/onboarding" : "/login"} />
            )
          }
        />
      </Routes>
    </div>
  );
}
