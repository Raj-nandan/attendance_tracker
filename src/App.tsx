// import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Emp from "./pages/Emp";
import { useEffect, useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | false>(false);
  const id = localStorage.getItem("id");
  useEffect(() => {
    if (id) {
      setIsLoggedIn(true);
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emp" element={<Emp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
