import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from "../../components/context/Context";
import "../dataTable/DataTable.css";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";

const DataTable = ({ students, getAllStudents }) => {
    const [auth] = useAuth();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [updatedData, setUpdatedData] = useState({
        name: "",
        email: "",
        phone: "",
        rollNo: "",
        batchNo: "",
        teacher: "",
    });

    DataTable.propTypes = {
        students: PropTypes.array.isRequired,
        getAllStudents: PropTypes.func.isRequired,
    };

    const deleteStudent = async (id) => {
        if (!id) {
            console.error("Invalid student ID");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:9000/api/fee/portal/students/delete-student/${id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${auth?.token}`
                    }
                }
            );
            if (response.data.success) {
                toast.success(`Student with ID ${id} is deleted`);
                getAllStudents(); // Refresh the data table
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while deleting the student");
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent) return;

        try {
            const response = await axios.put(
                `http://localhost:9000/api/fee/portal/students/update-student/${selectedStudent._id}`,
                updatedData,
                {
                    headers: {
                        "Authorization": `Bearer ${auth?.token}`
                    }
                }
            );
            if (response.data.success) {
                toast.success(`${updatedData.name} is updated`);
                setSelectedStudent(null); // Hide update form
                setUpdatedData({ name: "", email: "", phone: "", rollNo: "", batchNo: "", teacher: "" }); // Reset form fields
                getAllStudents(); // Refresh the student list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong while updating the student");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                    <div className="w-75">
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Roll No</th>
                                    <th>Batch No</th>
                                    <th>Teacher</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students && students.length > 0 ? (
                                    students.map((student) => (
                                        <tr key={student._id}>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.rollNo}</td>
                                            <td>{student.batchNo}</td>
                                            <td>{student.teacher}</td>
                                            <td>
                                                <button onClick={() => {
                                                    setSelectedStudent(student);
                                                    setUpdatedData({
                                                        name: student.name,
                                                        email: student.email,
                                                        phone: student.phone,
                                                        rollNo: student.rollNo,
                                                        batchNo: student.batchNo,
                                                        teacher: student.teacher,
                                                    });
                                                }}>Edit</button>
                                                <button className="btn2 btn-danger ms-2" onClick={() => deleteStudent(student._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No students available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {selectedStudent && (
                            <div className="update-form">
                                <h3>Update Student</h3>
                                <form onSubmit={handleUpdateSubmit}>
                                    <input
                                        type="text"
                                        value={updatedData.name}
                                        onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                                        placeholder="Enter name"
                                    />
                                    <input
                                        type="email"
                                        value={updatedData.email}
                                        onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                                        placeholder="Enter email"
                                    />
                                    <input
                                        type="text"
                                        value={updatedData.phone}
                                        onChange={(e) => setUpdatedData({ ...updatedData, phone: e.target.value })}
                                        placeholder="Enter phone number"
                                    />
                                    <input
                                        type="number"
                                        value={updatedData.rollNo}
                                        onChange={(e) => setUpdatedData({ ...updatedData, rollNo: e.target.value })}
                                        placeholder="Enter roll number"
                                    />
                                    <input
                                        type="number"
                                        value={updatedData.batchNo}
                                        onChange={(e) => setUpdatedData({ ...updatedData, batchNo: e.target.value })}
                                        placeholder="Enter batch number"
                                    />
                                    <input
                                        type="text"
                                        value={updatedData.teacher}
                                        onChange={(e) => setUpdatedData({ ...updatedData, teacher: e.target.value })}
                                        placeholder="Enter teacher"
                                    />
                                    <button type="submit" className="button-btn1 btn-primary">Save</button>
                                    <button type="button" onClick={() => setSelectedStudent(null)} className="button-btn2 btn-danger">Cancel</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
