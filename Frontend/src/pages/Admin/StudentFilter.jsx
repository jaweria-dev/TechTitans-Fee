import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { Batch } from "./../../components/Batch";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from "../../components/Layout/AdminHeader";
import "../Admin/Students.css";
import SearchInput from "./../../components/Form/SearchInput";

const StudentFilter = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllTeachers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/fee/portal/teacher/get-teacher"
      );
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

  const getAllStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:9000/api/fee/portal/students/student-list/${page}`
      );
      const studentsData = response.data.students;
      if (studentsData) {
        setStudents(studentsData);
      } else {
        console.error("Expected students data not found in API response.");
      }
    } catch (error) {
      console.log(
        "Error fetching students:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    getAllStudents();
    getTotal();
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

  // Handle filter change
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((s) => s !== id);
    }
    setChecked(all);
  };

  // Handle Radio (Batch) Filter Change
  const handleBatchFilter = (e) => {
    setRadio(e.target.value);
  };

  // Fetch Students based on filters
  const fetchFilteredStudents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:9000/api/fee/portal/students/student-filters",
        {
          checked,
          radio,
        }
      );
      setStudents(data.students || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      fetchFilteredStudents();
    } else {
      setPage(1);
      getAllStudents();
    }
  }, [checked, radio]);

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
    getAllStudents();
    getTotal(); // Reset the total count
  };

  const [openMenuToggle, setOpenMenuToggle] = useState(false);

  useEffect(() => {
    console.log("Sidebar toggle state:", openMenuToggle);
  }, [openMenuToggle]);

  const OpenMenu = () => {
    setOpenMenuToggle(!openMenuToggle);
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-md-3`}>
            <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
          </div>
          <div className="col-md-9">
            <AdminHeader OpenMenu={OpenMenu} />
            <SearchInput />
            <div className="mt-3">
              <div className="filter-section bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-3">
                  <div className="teacher-filter">
                    <h4 className="text-center text-dark fs-3">
                      Filter By Teacher
                    </h4>
                    <div className="d-flex flex-column mb-3">
                      {teachers?.map((t) => (
                        <Checkbox
                          key={t._id}
                          onChange={(e) =>
                            handleFilter(e.target.checked, t._id)
                          }
                          className="mb-2"
                        >
                          {t.name}
                        </Checkbox>
                      ))}
                    </div>
                  </div>

                  {/* <div className="batch-filter">
                    <h4 className="text-center text-dark fs-3">
                      Filter By Batch
                    </h4>

                    <div className="d-flex flex-column mb-3">
                      <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {Batch?.map((s) => (
                          <div key={s._id}>
                            <Radio value={s.array} className="mb-2">
                              {s.name}
                            </Radio>
                          </div>
                        ))}
                      </Radio.Group>
                    </div>
                  </div> */}
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn-primary"
                    style={{ height: "30px", width: "150px" }}
                    onClick={resetFilters}
                  >
                    RESET FILTERS
                  </button>
                </div>
              </div>
              <div className="students-section mt-4">
                <h1 className="text-center">All Students</h1>
                <div className="d-flex flex-wrap justify-content-center">
                  {students?.map((s) => (
                    <div
                      className="card m-2"
                      style={{ width: "18rem" }}
                      key={s._id}
                    >
                      <img
                        src={`http://localhost:9000/api/fee/portal/students/student-photo/${s._id}`}
                        className="card-img-top"
                        alt={s.name}
                        height="200px"
                        width="200px"
                        onError={(e) =>
                          (e.target.src = "path/to/fallback-image.jpg")
                        }
                      />
                      <div className="card-body">
                        <h5 className="card-title">Name: {s.name}</h5>
                        <button
                          className="std-filter btn-primary"
                          style={{
                            height: "40px",
                            margin: "10px",
                            width: "100%",
                            maxWidth: "200px",
                            fontSize: "1rem",
                          }}
                          onClick={() => navigate(`/student/${s.slug}`)}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  {students && students.length < total && (
                    <button
                      className="btn-warning"
                      style={{
                        height: "40px",
                        width: "160px",
                        fontSize: "14px",
                        marginBottom: "10px",
                      }}
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentFilter;
