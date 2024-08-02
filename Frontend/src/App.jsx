import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import { Toaster } from 'react-hot-toast'
import AdminRoute from './components/Routes/AdminRoutes';
// import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useState } from 'react'
import './App.css'
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/Forgotpassword";
import CreateTeacher from "./pages/Admin/CreateTeacher";
import CreateProduct from "./pages/Admin/CreateProduct";
import Students from "./pages/Admin/Students";
// import AdminHeader from './components/Layout/AdminHeader';
// import AdminMenu from "./components/Layout/AdminMenu"
import "./pages/Admin/Admin.css";
import HomePage from "../src/pages/HomePage"
// import { useSpring, animated } from 'react-spring';


function App() {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("circles");
  if (spinner) {
    setTimeout(() => {
      circles.style.display = "none";
      setLoading(false);
    }, 1000);
  }


//   const {number} = useSpring({
//     from:{number:0},
//     delay:200,
//     config:{mass:1, tension: 20, friction:10},
// })
// return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;

  return (
    !loading && (
      <>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />


          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-teacher" element={<CreateTeacher />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/students" element={<Students />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>

      </>
    )
  )
}

export default App;
