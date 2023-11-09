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
import AlertBox from "./components/Alert";

function App() {
  const [lightMode, setLightMode] = useState(
    localStorage["darkMode"] === "true" ? true : false
  );

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
      <AlertBox text={'Coucou'}/>
      <main id="main" className="min-h-[90vh] flex">
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
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
