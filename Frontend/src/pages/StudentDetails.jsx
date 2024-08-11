import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [relatedStudents, setRelatedStudents] = useState([]);

  // Initial student details
  useEffect(() => {
    if (params?.slug) getStudent();
  }, [params?.slug]);

  // Get student details
  const getStudent = async () => {
    try {
      const { data } = await axios.get(
        `https://tech-titans-fee-portal.vercel.app/api/fee/portal/students/get-student/${params.slug}`
      );
      setStudent(data?.student);
      // Fetch related students
      getSimilarStudent(data?.student._id, data?.student.teacher._id);
    } catch (error) {
      console.log(error);
    }
  };

  // Get similar students
  const getSimilarStudent = async (sid, tid) => {
    try {
      const { data } = await axios.get(
        `https://tech-titans-fee-portal.vercel.app/api/fee/portal/students/related-students/${sid}/${tid}`
      );
      setRelatedStudents(Array.isArray(data?.students) ? data?.students : []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`https://tech-titans-fee-portal.vercel.app/api/fee/portal/students/student-photo/${student._id}`}
            className="card-img-top"
            alt={student.name}
            height="300"
            width={"350px"} style={{margin:"10px"}}
          />
        </div>
        <div className="col-md-6 " >
          <h1 className="m-3 fw-bold">Student Details</h1>
          <h6 className="m-3 fs-5">Name : {student.name}</h6>
          <h6 className="m-3 fs-5">Email: {student.email}</h6>
          <h6 className="m-3 fs-5">Roll No: {student.rollNo}</h6>
          <h6 className="m-3 fs-5">Batch No : {student.batchNo}</h6>
          <h6 className="m-3 fs-5" >Teacher Name : {student?.teacher?.name}</h6>

        </div>
        <br />
        <hr />
        <div className="row container">
          <h6 className="fw-bold fs-2">Similar Students</h6>
          {relatedStudents.length < 1 && (
            <p className="text-center">No Similar Students found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedStudents?.map((s) => (
              <div className="card m-2" style={{ width: "18rem" }} key={s._id}>
                <img
                  src={`https://tech-titans-fee-portal.vercel.app/api/fee/portal/students/student-photo/${s?._id}`}
                  className="card-img-top" height="200px" width="200px"
                  alt={s.name}
                />
                <div className="card-body">
                  <h5 className="card-title">Name: {s.name}</h5>
                  <p className="card-text">Roll No: {s.rollNo}</p>
                  <p className="card-text">Batch No: {s.batch}</p>
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
      </div>
    </Layout>
  );
};

export default StudentDetails;
