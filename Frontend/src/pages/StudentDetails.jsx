import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const StudentDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
   const [student, setStudent]  = useState({});
    const [relatedStudents, setRelatedStudents] = useState([]);

    //initalp details
    useEffect(() => {
        if (params?.slug) getStudent();
    }, [params?.slug]);
    //getStudent
    const getStudent = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:9000/api/fee/portal/students/get-student/${params.slug}`
            );
            setStudent(data?.student);
            setRelatedStudents(data?.student._id, data?.student.teacher._id);
        } catch (error) {
            console.log(error);
        }
    };
    //get similar product
    const getSimilarStudent = async (sid, tid) => {
        try {
            const { data } = await axios.get(
                `http://localhost:9000/api/fee/portal/students/related-students/${sid}/${tid}`
            );
            setRelatedStudents(data?.students);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img
                        src={`http://localhost:9000/api/fee/portal/students/student-photo/${student._id}`}
                        className="card-img-top"
                        alt={student.name}
                        height="300"
                        width={"350px"}
                    />
                </div>
                <div className="col-md-6 ">
                    <h1 className="text-center">Student Details</h1>
                    <h6>Name : {student.name}</h6>
                    <h6>Email : {student.email}</h6>
                    <h6>Phone : {student.phone}</h6>
                    <h6>Roll No : {student.rollNo}</h6>
                    <h6>Batch No : {student.batchNo}</h6>
                    <h6>Teacher Name : {student?.teacher?.name}</h6>
                </div>
            </div>
            <hr />
            <div className="row container">
                <h6>Similar Students</h6>
                {relatedProducts.length < 1 && (
                    <p className="text-center">No Similar Students found</p>
                )}
                <div className="d-flex flex-wrap">
                    {relatedProducts?.map((p) => (
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`http://localhost:9001/api/fee/portal/students/student-photo//${s?._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{s.name}</h5>
                                <p className="card-text"> $ {s.email}</p>
                                <p className="card-text"> $ {s.phone}</p>
                                <p className="card-text"> $ {s.rollNo}</p>
                                <p className="card-text"> $ {s.batchNo}</p>
                                <button
                                    className="btn btn-primary ms-1"
                                    onClick={() => navigate(`/student/${s.slug}`)}
                                >
                                    More Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StudentDetails;