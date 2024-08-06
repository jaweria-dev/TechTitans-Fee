import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from '../../components/Layout/AdminHeader';
const AllStudents = () => {
    const [students, setStudents] = useState([]);

    //getall products
    const getAllStudents = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:9000/api/fee/portal/students/get-student"
            );
            setStudents(data.students);
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    //lifecycle method
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
        <div className="row">
            <div className="col-md-3">
                <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
            </div>
            <div className="col-md-9 ">
            <AdminHeader OpenMenu={OpenMenu}/>
                <h1 className="text-center">All Students List</h1>
                <div className="d-flex">
                    {students?.map((s) => (
                        <Link
                            key={s._id}
                            to={`/dashboard/admin/students/${s.slug}`}
                            className="student-link"
                        >
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`/api/fee/portal/students/student-photo/${s._id}`}
                                    className="card-img-top"
                                    alt={s.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{s.name}</h5>
                                    <p className="card-text">{s.rollNo}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllStudents;