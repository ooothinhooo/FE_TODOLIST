import "./App.css";
import Header from "./components/partials/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import { useState } from "react";
import About from "./components/About.jsx";
function App() {
  const info = localStorage.getItem("user");

  const [user, setUser] = useState(JSON.parse(info));
  // console.log(info);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
