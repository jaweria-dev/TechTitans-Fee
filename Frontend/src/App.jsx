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
import StudentFilter from "./pages/Admin/StudentFilter";
import Courses from "./pages/User/Courses";
import UserDashboard from "./pages/User/UserDashboard";
import PrivateRoute from "./components/Routes/UserRoutes";
import PaymentsTable from "./pages/User/PaymentTable";


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
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/student/:slug" element={<StudentDetails />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/search" element={<Search />} />
          <Route path="/teacher/:slug" element={<TeacherStudents />} />


          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/courses" element={<Courses />} />
            <Route path="user/payment-method" element={<PaymentsTable />} />
          </Route>
    

          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-teacher" element={<CreateTeacher />} />
            <Route path="admin/create-student" element={<CreateStudent />} />
            <Route path="admin/students/:slug" element={<UpdateStudent />} />
            <Route path="admin/students" element={<AllStudents />} />
            <Route path="admin/all-students" element={<StudentFilter />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>

      </>
    )
  )
}

export default App;
