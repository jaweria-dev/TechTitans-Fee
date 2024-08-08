// import React, {useState} from 'react'
// import Layout from '../components/Layout/Layout'
// import { useAuth } from './../components/context/Context';

// const HomePage = () => {
//   const [auth] = useAuth()
//   return (
//     <Layout>
//       <h1>Home Page</h1>
//       <pre>{JSON.stringify(auth, null, 4)}</pre>
//     </Layout>
//   )
// }

// export default HomePage



import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";

import axios from "axios";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { Batch } from './../components/Batch';

const HomePage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllTeacher = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9001/api/fee/portal/teacher/get-teacher"
      );
      if (data?.success) {
        setTeachers(data?.teacher);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeacher();
    getTotal();
  }, []);
  //get products
  const getAllStudents = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:9000/api/fee/portal/students/student-list/${page}`
      );
      setLoading(false);
      setStudents(data.studnets);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9000/api/fee/portal/students/student-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:9000/api/fee/portal/students/student-list/${page}`
      );
      setLoading(false);
      setStudents([...students, ...data?.students]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by teacher
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((s) => s !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllStudents();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterStudent();
  }, [checked, radio]);

  //get filtered student
  const filterStudent = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:9000/api/fee/portal/students/student-filters",
        {
          checked,
          radio,
        }
      );
      setStudents(data?.students);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Teacher</h4>
          <div className="d-flex flex-column">
            {teachers?.map((t) => (
              <Checkbox
                key={t._id}
                onChange={(e) => handleFilter(e.target.checked, t._id)}
              >
                {t.name}
              </Checkbox>
            ))}
          </div>
          {/* batch filter */}
          <h4 className="text-center mt-4">Filter By batch</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Batch?.map((s) => (
                <div key={s._id}>
                  <Radio value={s.array}>{s.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Students</h1>
          <div className="d-flex flex-wrap">
            {students?.map((s) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:9000/api/fee/portal/students/student-photo/${s._id}`}
                  className="card-img-top"
                  alt={s.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">{s.rollNo}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/student/${s.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {students && students.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;