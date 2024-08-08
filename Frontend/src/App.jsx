import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import { Toaster } from 'react-hot-toast'
import AdminRoute from './components/Routes/AdminRoutes';;
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useState } from 'react'
import './App.css'
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/Forgotpassword";
import CreateTeacher from "./pages/Admin/CreateTeacher";
import "./pages/Admin/Admin.css";
import CreateStudent from "./pages/Admin/CreateStudent";
// import { useSpring, animated } from 'react-spring';
import AllStudents from './pages/Admin/AllStudent';
import StudentDetails from "./pages/StudentDetails";
import Teachers from './pages/Teachers';
import Search from './pages/Search';
import UpdateStudent from './pages/Admin/UpdateStudent';
import TeacherStudents from "./pages/TeacherStudents";


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
          <Route path="/students/:slug" element={<StudentDetails />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/search" element={<Search />} />
          <Route path="/teacher/:slug" element={<TeacherStudents />} />

          {/* <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
         
        </Route> */}


          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-teacher" element={<CreateTeacher />} />
            <Route path="admin/create-student" element={<CreateStudent />} />
            <Route path="admin/students/:slug" element={<UpdateStudent />} />
            <Route path="admin/students" element={<AllStudents />} />
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
