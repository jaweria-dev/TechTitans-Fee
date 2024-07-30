import React, { useEffect, useState } from "react";
// import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import TeacherForm from "./../../components/Form/TeacherForm";
import { Modal } from "antd";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from '../../components/Layout/AdminHeader';
const CreateTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [open, setopen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:9001/api/fee/portal/teacher/create-teacher", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllTeacher();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };

  //get all teachers
  const getAllTeacher = async () => {
    try {
      const { data } = await axios.get("http://localhost:9001/api/fee/portal/teacher/get-teacher");
      if (data?.success) {
        setTeachers(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting teachers");
    }
  };

  useEffect(() => {
    getAllTeacher();
  }, []);

  //update teacher
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:9001/api/fee/portal/teacher/update-teacher/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setopen(false);
        getAllTeacher();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //delete teacher
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:9001/api/fee/portal/teacher/delete-teacher/${pId}`
      );
      if (data.success) {
        toast.success(`teacher is deleted`);

        getAllTeacher();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="container-fluid dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="col-md-3">
            <AdminHeader />
          </div>
          <h1 className="teahcer-heading">Manage Teacher</h1>
          <div className="p-3 w-50">
            <TeacherForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Teachers Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setopen(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setopen(false)}
            footer={null}
            open={open}
          >
            <TeacherForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;