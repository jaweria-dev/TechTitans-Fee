import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
import "./Students.css"
import AdminHeader from '../../components/Layout/AdminHeader';
import { useAuth } from "../../components/context/Context";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [teacher, setTeacher] = useState("");
  const [photo, setPhoto] = useState("");
  const [auth] = useAuth();
  //get all teacher
  // const getAllTeacher = async () => {
  //   try {
  //     const { data } = await axios.get("http://localhost:9000/api/fee/portal/teacher/get-teacher");
  //     if (data?.success) {
  //       setTeachers(data?.teacher);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something wwent wrong in getting teachers");
  //   }
  // };

  // useEffect(() => {
  //   getAllTeacher();
  // }, []);

  const getAllTeacher = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/fee/portal/teacher/get-teacher");
      if (response.data?.success) {
        setTeachers(response.data.teacher);
      } else {
        toast.error("Failed to fetch teachers");
      }
    } catch (error) {
      console.error("Error fetching teachers:", error.response ? error.response.data : error.message);
      toast.error("Something went wrong in getting teachers");
    }
  };

  useEffect(() => {
    getAllTeacher();
  }, []);


  //create student function
  const handleCreate = async (e) => {
    e.preventDefault();
    
    try {
      const studentData = new FormData();
      studentData.append("name", name);
      studentData.append("email", email);
      studentData.append("phone", phone);
      studentData.append("rollNo", rollNo);
      studentData.append("batchNo", batchNo);
      studentData.append("teacher", teacher);
      studentData.append("answer", answer);
      studentData.append("password", password);
      studentData.append("photo", photo);
  
      // Log FormData for debugging
      console.log('FormData:', studentData);
  
      // Await axios.post to ensure data is received
      const response = await axios.post(
        "http://localhost:9000/api/fee/portal/students/create-student",
        studentData,
        {
          headers: {
            'Authorization': `Bearer ${auth?.token}`,
            'Content-Type': 'multipart/form-data', // Ensure this header is set for FormData
          },
        }
      );
  
      // Handle the API response
      if (response.data?.success) {
        toast.success("Student Created Successfully");
        navigate("/dashboard/admin/students");
      } else {
        toast.error(response.data?.message || "Failed to create student");
      }
    } catch (error) {

      console.error(error);
      toast.error("something went wrong");

    }
  };
  

  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const studentData = new FormData();
  //     studentData.append("name", name);
  //     studentData.append("email", email);
  //     studentData.append("phone", phone);
  //     studentData.append("rollno", rollNo);
  //     studentData.append("batchno", batchNo);
  //     studentData.append("teacher", teacher);
  //     studentData.append("answer", answer);
  //     studentData.append("password", password);
  //     studentData.append("photo", photo);

  //     console.log(studentData,'studentData');
      
  //     const { data } = axios.post(
  //       "http://localhost:9000/api/fee/portal/students/create-student",
  //       studentData,

  //       {  headers:{
  //           'Authorization': `Bearer ${auth?.token}`,
  //         }}
  //     );
  //     if (data?.success) {
  //       toast.error(data?.message);
  //     } else {
  //       toast.success("Student Created Successfully");
  //       navigate("/dashboard/admin/students");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("something went wrong");
  //   }
  // };

  const [openMenuToggle, setOpenMenuToggle] = useState(false);

  useEffect(() => {
      console.log('Sidebar toggle state:', openMenuToggle);
  }, [openMenuToggle]);

  const OpenMenu = () => {
      setOpenMenuToggle(!openMenuToggle);
  };

  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
          <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu}/>
          </div>
          <div className="col-md-9">
          <AdminHeader OpenMenu={OpenMenu}/>
            <h1 className="m-3">Create Student</h1>
            <div className="m-3 w-98">
              <Select
               variant="unstyled"
                placeholder="Select a teacher"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setTeacher(value);
                }}
              >
                {teachers?.map((t) => (
                  <Option key={t._id} value={t._id}>
                    {t.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn-btn1 btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input 
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="student_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={email}
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={phone}
                  placeholder="Enter Phone Number"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                 <input
    type="password"
    value={password}
    placeholder="Enter Password"
    className="form-control mt-2"
    onChange={(e) => setPassword(e.target.value)}
  />
              </div>
              <div className="mb-3">
               <input
    type="text"
    value={answer}
    placeholder="Enter Answer"
    className="form-control mt-2"
    onChange={(e) => setAnswer(e.target.value)}
  />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={rollNo}
                  placeholder="Enter Roll No"
                  className="form-control"
                  onChange={(e) => setRollNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Batch No "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setBatchNo(value);
                  }}
                >
                  <Option value="0">9</Option>
                  <Option value="1">10</Option>
                  <Option value="1">11</Option>
                  <Option value="1">12</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn-primary" onClick={handleCreate}>
                  CREATE STUDENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CreateStudent;