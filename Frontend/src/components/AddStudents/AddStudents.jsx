import React, { useState } from 'react';  
import { Modal, Button, TextField } from '@mui/material';  
import toast from "react-hot-toast";  
import "../AddStudents/AddStudents.css";  
import axios from "axios";  
import { useAuth } from "../../components/context/Context";  

const AddStudents = ({ open, setOpen, addStudent }) => {  
  const [auth] = useAuth();  
// console.log(auth);

  const axiosInstance = axios.create({  
    baseURL: "http://localhost:9010/api/fee/portal/students",  
    headers: {  
      "Authorization": `${auth?.token}`,
      "Content-Type": "multipart/form-data"  
    }  
  });  
   // Log token to ensure it's valid
   console.log("Token used:", auth?.token);

  const [studentData, setStudentData] = useState({  
    name: '',  
    email: '',  
    phone: '',  
    rollNo: '',  
    batchNo: '',  
    // teacher: "",  
  });  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
};

  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const { data } = await axiosInstance.post("/create-student", studentData);  
      console.log(data,"check./");
      
      if (data?.success) {  
        toast.success(`${studentData} is created`);  
        addStudent(studentData);  
        setStudentData({  
          name: '',  
          email: '',  
          phone: '',  
          rollNo: '',  
          batchNo: '',  
          // teacher: "",  
        });  
        setOpen(false);  
      } else {  
        toast.error(data.message);  
      }  
    } catch (error) {  
      console.error(error);  
      toast.error(error?.response?.data?.message || "Something went wrong in input form");  
    }  
  };  

  return (  
    <Modal open={open} onClose={() => setOpen(false)}>  
      <div className="modalContent">  
        <h2>Add New Student</h2>  
        <form onSubmit={handleSubmit}>  
          <TextField  
            label="Name"  
            name="name"  
            value={studentData.name}  
            onChange={handleInputChange}  
            fullWidth  
            margin="normal"  
            required  
          />  
          <TextField  
            label="Email"  
            name="email"  
            value={studentData.email}  
            onChange={handleInputChange}  
            fullWidth  
            margin="normal"  
            required  
          />  
          <TextField  
            label="Phone"  
            name="phone"  
            value={studentData.phone}  
            onChange={handleInputChange}  
            fullWidth  
            margin="normal"  
            required  
          />  
          <TextField  
            label="Roll No"  
            name="rollNo"  
            type="number"  
            value={studentData.rollNo}  
            onChange={handleInputChange}  
            fullWidth  
            margin="normal"  
            required  
          />  
          <TextField  
            label="Batch No"  
            name="batchNo"  
            type="number"  
            value={studentData.batchNo}  
            onChange={handleInputChange}  
            fullWidth  
            margin="normal"  
            required  
          />  
          {/* <TextField  
            label="Teacher"  
            name="teacher"  
            type="text"  
            value={studentData.teacher}  
            onChange={handleInputChange}  
            fullWidth  
            margin="normal"  
            required  
          />   */}
          <Button className='addstdbtn' style={{ marginTop: "10px" }} type="submit" variant="contained" color="primary">  
            Add Student  
          </Button>  
          <Button className='addstdbtn' style={{ marginLeft: "10px", marginTop: "10px" }} variant="outlined" onClick={() => setOpen(false)}>  
            Cancel  
          </Button>  
        </form>  
      </div>  
    </Modal>  
  );  
};  

export default AddStudents;