import { BrowserRouter, Route, Routes } from "react-router";
import PublicHomePage from "./pages/Public/PublicHomePage";
import LoginPage from "./pages/Public/LoginPage";
import RegisterPage from "./pages/Public/RegisterPage";
import ReadPost from "./pages/Public/ReadPost";
import EditProfile from "./pages/Private/EditProfile";
import ProtectedRoute from "./components/App/ProtectedRoute";
import UserDashboard from "./pages/Private/UserDashboard";
import CreatePost from "./pages/Private/CreatePost";
import EditPost from "./pages/Private/EditPost";
import UserProfile from "./pages/Public/UserProfile";
import NotFound from "./components/App/NotFound";
import { AuthProvider } from "./context/AuthContext";
import LogoutUser from "./components/App/LogoutUser";
import Categories from "./pages/Public/Categories";
import UserProfileEdit from "./pages/Private/UserProfileEdit";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import CategoryPostList from "./pages/Public/CategoryPostList";
import About from "./pages/Public/About";

function AppComponent() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:id" element={<ReadPost />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/categoryPage/:id" element={<CategoryPostList />} />

          {/* Protected Routes */}
          <Route
            path="/editPofile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createPost"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editPost/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userdashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logoutUser"
            element={
              <ProtectedRoute>
                <LogoutUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/userEdit"
            element={
              <ProtectedRoute>
                <UserProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ThemeProvider>
        <AuthProvider>
          <ToastContainer
            position="top-center"
            theme="dark"
            newestOnTop
            closeOnClick
            autoClose={3000}
          />
          <AppComponent />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
