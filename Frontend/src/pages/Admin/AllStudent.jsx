import React, { useState, useEffect } from "react";
import axios from "axios";
import SweetAlert from "sweetalert2";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from "../../components/Layout/AdminHeader";
import "../Admin/Admin.css";
import Layout from "../../components/Layout/Layout";
import SearchInput from "./../../components/Form/SearchInput";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all students
  const getAllStudents = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/fee/portal/students/get-student"
      );
      setStudents(data.students);
    } catch (error) {
      console.log(error);
      SweetAlert.fire({
        icon: "error",
        title: "something went wrong",
      });
      // toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllStudents();
  }, []);

  const [openMenuToggle, setOpenMenuToggle] = useState(false);

  useEffect(() => {
    console.log("Sidebar toggle state:", openMenuToggle);
  }, [openMenuToggle]);

  const OpenMenu = () => {
    setOpenMenuToggle(!openMenuToggle);
  };

  // total studnets
  const getTotal = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/fee/portal/students/student-count"
      );
      setTotal(response.data?.total || 0);
    } catch (error) {
      console.error(
        "Error fetching total count:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // load more stundets

  useEffect(() => {
    if (page !== 1) {
      loadMore();
    }
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9000/api/fee/portal/students/student-list/${page}`
      );
      setStudents((prevStudents) => [
        ...prevStudents,
        ...(response.data?.students || []),
      ]);
    } catch (error) {
      console.error(
        "Error loading more students:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
        </div>
        <div className="col-md-9">
          <AdminHeader OpenMenu={OpenMenu} />
          <SearchInput />
          <h1 className="text-center">All Students List</h1>
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
                    alt={s.name}
                    height="200px"
                    width="200px"
                  />
                  <div className="card-body">
                    <h4 className="card-title">Name: {s.name}</h4>
                    <p className="card-text">
                      <b>Roll No: </b>
                      {s.rollNo}
                    </p>
                    <p className="card-text">
                      <b>Email:</b> {s.email}
                    </p>
                    <p className="card-text">
                      <b>Phone: </b>
                      {s.phone}
                    </p>
                    <p className="card-text">
                      <b>Batch No:</b> {s.batchNo}
                    </p>
                    <p className="card-text">
                      <b>Teacher Name:</b> {s.teacher?.name}
                    </p>
                  </div>
                  <button className="more-detail">Update Student</button>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-3">
            {students && students.length < total && (
              <button
                className="btn-warning"
                style={{ height: "40px", width: "160px", fontSize: "14px" }}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllStudents;
