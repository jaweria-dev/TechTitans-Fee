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
import AllStudents from './pages/Admin/AllStudent';
import StudentDetails from "./pages/StudentDetails";
import Teachers from './pages/Teachers';
import Search from './pages/Search';
import UpdateStudent from './pages/Admin/UpdateStudent';
import TeacherStudents from "./pages/TeacherStudents";
import Courses from "./pages/User/Courses";
import Profile from "./pages/User/Profile";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./components/Routes/UserRoutes";


function App() {
  const [loading, setLoading] = useState(true);
  const spinner = document.getElementById("canvas1");
  if (spinner) {
    setTimeout(() => {
      canvas1.style.display = "none";
      setLoading(false);
    }, 9000);
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
          <Route path="/students/:slug" element={<StudentDetails />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/search" element={<Search />} />
          <Route path="/teacher/:slug" element={<TeacherStudents />} />


          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/courses" element={<Courses />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/teacher/:slug" element={<TeacherStudents />} />



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
