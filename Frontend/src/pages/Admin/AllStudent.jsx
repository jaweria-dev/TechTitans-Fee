import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from "../../components/Layout/AdminHeader";
import "../Admin/Admin.css";
import Layout from "../../components/Layout/Layout";

const AllStudents = () => {
    const [students, setStudents] = useState([]);

    // Get all students
    const getAllStudents = async () => {
        try {
            const { data } = await axios.get("http://localhost:9000/api/fee/portal/students/get-student");
            setStudents(data.students);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Lifecycle method
    useEffect(() => {
        getAllStudents();
    }, []);

    const [openMenuToggle, setOpenMenuToggle] = useState(false);

    useEffect(() => {
        console.log('Sidebar toggle state:', openMenuToggle);
    }, [openMenuToggle]);

    const OpenMenu = () => {
        setOpenMenuToggle(!openMenuToggle);
    };

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
                </div>
                <div className="col-md-9">
                    <AdminHeader OpenMenu={OpenMenu} />
                    <h1 className="text-center" style={{ color: "black", fontWeight: "bold" }}>
                        All Students List
                    </h1>
                    <div className="d-flex flex-wrap">
                        {students?.map((s) => (
                            <Link
                                key={s._id}
                                to={`/dashboard/admin/students/${s.slug}`}
                                className="student-link"
                            >
                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`http://localhost:9000/api/fee/portal/students/student-photo/${s._id}`}
                                        className="card-img-top"
                                        alt={s.name} height="200px" width="200px"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{s.name}</h5>
                                        <p className="card-text">{s.rollNo}</p>
                                        <p className="card-text">{s.email}</p>
                                        <p className="card-text">{s.phone}</p>
                                        <p className="card-text">{s.batchNo}</p>
                                        <p className="card-text">{s.teacher?.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AllStudents;