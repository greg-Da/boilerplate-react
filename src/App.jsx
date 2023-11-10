import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { AlertProvider } from "./components/Alert";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import getFetch from "./utils/getFetch";
import { logIn } from "./state/auth/authSlice";

function App() {
  const [lightMode, setLightMode] = useState(
    localStorage["darkMode"] === "true" ? true : false
  );

  const currentUser = useSelector((state) => state.auth.user);
  let dispatch = useDispatch();

  const token = Cookies.get("token");
  if (!currentUser.id && token !== undefined) {
    getFetch(`http://localhost:1337/api/users/me`, token)
      .then((data) => {
        dispatch(logIn(data));
      })
      .catch((err) => {
        throw err;
      });
  }

  useEffect(() => {
    lightMode
      ? document.body.classList.add("darkmode")
      : document.body.classList.remove("darkmode");
    localStorage["darkMode"] = lightMode;
    console.log(localStorage["darkMode"]);
  }, [lightMode]);
  return (
    <BrowserRouter>
      <Navbar mode={lightMode} onSwitchChange={setLightMode} />
      <main id="main" className="min-h-[90vh] flex">
        <AlertProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AlertProvider>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
