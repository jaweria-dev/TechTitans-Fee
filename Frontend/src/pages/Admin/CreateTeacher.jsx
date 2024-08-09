import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import TeacherForm from "./../../components/Form/TeacherForm";
import { Modal } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from '../../components/Layout/AdminHeader';
import { useAuth } from "../../components/context/Context";
import "./Students.css"
import Layout from '../../components/Layout/Layout'

const CreateTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [auth] = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:9000/api/fee/portal/teacher",
    headers: {
      "Authorization": `Bearer ${auth?.token}`
    }
  });

  // Handle form submission for creating a teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/create-teacher", { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllTeachers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in input form");
    }
  };

  // Fetch all teachers
  const getAllTeachers = async () => {
    try {
      console.log("Fetching all teachers");
      const { data } = await axios.get("http://localhost:9000/api/fee/portal/teacher/get-teacher");
      console.log("Response data:", data);
      if (data.success) {
        setTeachers(data.teacher);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in getting teachers:", error);
      toast.error("Something went wrong in getting teachers");
    }
  };

  useEffect(() => {
    getAllTeachers();
  }, []);

  // Handle update teacher
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(`/update-teacher/${selected._id}`, { name: updatedName });
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllTeachers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while updating teacher");
    }
  };

  // Handle delete teacher
  const handleDelete = async (teacherId) => {
    try {
      const { data } = await axiosInstance.delete(`/delete-teacher/${teacherId}`);
      if (data.success) {
        toast.success(`${name} is deleted`);
        getAllTeachers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong while deleting teacher");
    }
  };

  const [openMenuToggle, setOpenMenuToggle] = useState(false);

  useEffect(() => {
    console.log('Sidebar toggle state:', openMenuToggle);
  }, [openMenuToggle]);

  const OpenMenu = () => {
    setOpenMenuToggle(!openMenuToggle);
  };

  return (
    <Layout>
      <div className="container-fluid dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
          </div>
          <div className="col-md-9">
            <AdminHeader OpenMenu={OpenMenu} />
            <h1 className="teacher-heading">Manage Teacher</h1>
            <div className="p-3 w-50">
              <TeacherForm handleSubmit={handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Teacher Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers?.map((teacher) => (
                    <tr key={teacher._id}>
                      <td>{teacher.name}</td>
                      <td>
                        <button className="btn1  ms-2" onClick={() => { setOpen(true); setUpdatedName(teacher.name); setSelected(teacher); }}>
                          Edit
                        </button>
                        <button className="btn2 ms-2" onClick={() => handleDelete(teacher._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <TeacherForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateTeacher;
