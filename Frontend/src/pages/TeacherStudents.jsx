import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const TeacherStudents = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [teacher, setTeacher] = useState([]);

    useEffect(() => {
        if (params?.slug) getStudentsByTeacher();
    }, [params?.slug]);
    const getStudentsByTeacher = async () => {
        try {
            const { data } = await axios.get(
                `/api/fee/portal/students/students-teacher/${params.slug}`
            );
            setStudents(data?.students);
            setTeacher(data?.teacher);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>

            <div className="container mt-3">
                <h4 className="text-center">Student - {teacher?.name}</h4>
                <h6 className="text-center">{students?.length} result found </h6>
                <div className="row">
                    <div className="col-md-9 offset-1">
                        <div className="d-flex flex-wrap">
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
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{s.name}</h5>
                                        <p className="card-text">
                                            {s.description.substring(0, 30)}...
                                        </p>
                                        <p className="card-text"> $ {s.price}</p>
                                        <button
                                            className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${s.slug}`)}
                                        >
                                            More Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="m-2 p-3">
            {products && products.length < total && (
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
          </div> */}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TeacherStudents;