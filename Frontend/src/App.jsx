import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import { Toaster } from 'react-hot-toast'
import AdminRoute from './components/Routes/AdminRoutes';
// import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from "./pages/Admin/AdminDashboard";
// import CreateCategory from "./pages/Admin/CreateCategory";
// import CreateProduct from "./pages/Admin/CreateProduct";
// import Users from "./pages/Admin/Users";
import { useState } from 'react'
import './App.css'
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/Forgotpassword";

function App() {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("circles");
  if (spinner) {
    setTimeout(() => {
      circles.style.display = "none";
      setLoading(false);
    }, 1000);
  }



  return (
    !loading && (
      <>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/login" element={<Login/>} />


          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
          </Route>
        </Routes>

      </>
    )
  )
}

export default App;
