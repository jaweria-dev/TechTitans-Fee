// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const StudentDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [student, setStudent] = useState({});
//   const [relatedStudents, setRelatedStudents] = useState([]);
//   // const [feeDetails, setFeeDetails] = useState({ paid: false }); // Placeholder data
//   const [feeDetails, setFeeDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Initial student details
//   useEffect(() => {
//     if (params?.slug) getStudent();
//   }, [params?.slug]);

//   // Get student details
//   const getStudent = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:9000/api/fee/portal/students/get-student/${params.slug}`
//       );
//       setStudent(data?.student);
//       // Fetch related students
//       getSimilarStudent(data?.student._id, data?.student.teacher._id);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get similar students
//   const getSimilarStudent = async (sid, tid) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:9000/api/fee/portal/students/related-students/${sid}/${tid}`
//       );
//       setRelatedStudents(Array.isArray(data?.students) ? data?.students : []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getFeeDetails = async (studentId) => {
//     try {
//       // Placeholder URL, replace with actual API endpoint
//       const { data } = await axios.get(
//         `http://localhost:9000/api/fee/portal/students/fee/${studentId}`
//       );
//       setFeeDetails(data?.feeDetails || { paid: false });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const FeeStatusComponent = ({ feeDetails }) => {
//   const [status, setStatus] = useState(feeDetails?.paid);

//   const handleClick = () => {
//     if (feeDetails) {
//       setStatus(!status); // Toggle the status on click
//     }
//   };

//   useEffect(() => {
//     const fetchFeeDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:9000/api/fee/paymentStatus/${studentId}`
//         );
//         setFeeDetails(response.data);
//       } catch (err) {
//         setError("Failed to fetch payment details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeeDetails();
//   }, [studentId]);

//   if (loading)
//     return (
//       <button className="btn btn-secondary fs-5" disabled>
//         Loading...
//       </button>
//     );
//   if (error) return <p>{error}</p>;

//   return (
//     <Layout>
//       <div className="row container mt-2">
//         <div className="col-md-6">
//           <img
//             src={`http://localhost:9000/api/fee/portal/students/student-photo/${student._id}`}
//             className="card-img-top"
//             alt={student.name}
//             height={"500px"}
//             width={"350px"}
//             style={{ margin: "10px" }}
//           />
//         </div>
//         <div className="col-md-6">
//           <h1 className="m-3 fw-bold">Student Details</h1>
//           <h6 className="m-3 fs-5">Name : {student.name}</h6>
//           <h6 className="m-3 fs-5">Roll No: {student.rollNo}</h6>
//           <h6 className="m-3 fs-5">Batch No : {student.batchNo}</h6>
//           <h6 className="m-3 fs-5">Teacher Name : {student?.teacher?.name}</h6>
//           <hr />
//           <div className="d-flex align-items-center m-3">
//             <h6 className="mb-0 fs-5 me-3">Fee Status:</h6>
//           {/* <div>
//             <button
//               style={{ width: "90px" }}
//               className={`btn ${
//                 feeDetails
//                   ? feeDetails.paid
//                     ? "btn-success"
//                     : "btn-danger"
//                   : "btn-secondary"
//               } fs-5`}
//               disabled={!feeDetails}
//             >
//               {feeDetails
//                 ? feeDetails.paid
//                   ? "Paid"
//                   : "Unpaid"
//                 : "Loading..."}
//             </button>

//             {feeDetails && (
//               <p>
//                 <strong>Amount:</strong> {feeDetails.amount} |
//                 <strong> Month:</strong> {feeDetails.month} |
//                 <strong> Status:</strong>{" "}
//                 {feeDetails.paid ? "Payment Completed" : "Payment Pending"} |
//                 <strong> Date:</strong>{" "}
//                 {new Date(feeDetails.date).toLocaleDateString()}
//               </p>
//             )}
//           </div> */}
//           <button
//               style={{ width: "90px" }}
//               className={`btn-danger ${
//                 feeDetails
//                   ? feeDetails.paid
//                     ? "btn-success"
//                     : "btn-danger"
//                   : "btn-secondary"
//               } fs-5`}
//               disabled={!feeDetails}
//             >
//               {feeDetails
//                 ? feeDetails.paid
//                   ? "Paid"
//                   : "Unpaid"
//                 : "Loading..."}
//             </button>
//            </div>
//         </div>
//         <br />
//         <hr />
//         <div className="row container">
//           <h6 className="fw-bold fs-2">Similar Students</h6>
//           {relatedStudents.length < 1 && (
//             <p className="text-center">No Similar Students found</p>
//           )}
//           <div className="d-flex flex-wrap">
//             {relatedStudents?.map((s) => (
//               <div className="card m-2" style={{ width: "18rem" }} key={s._id}>
//                 <img
//                   src={`http://localhost:9000/api/fee/portal/students/student-photo/${s?._id}`}
//                   className="card-img-top"
//                   height="200px"
//                   width="200px"
//                   alt={s.name}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">Name: {s.name}</h5>
//                   <p className="card-text">Roll No: {s.rollNo}</p>
//                   <p className="card-text">Batch No: {s.batchNo}</p>
//                   <button
//                     className="btn-primary ms-1"
//                     onClick={() => navigate(`/student/${s.slug}`)}
//                   >
//                     More Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default StudentDetails;

import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StudentDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [relatedStudents, setRelatedStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student details
  useEffect(() => {
    if (params?.slug) getStudent();
  }, [params?.slug]);

  const getStudent = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/fee/portal/students/get-student/${params.slug}`
      );
      setStudent(data?.student);
      // Fetch payments
      getPayments(data?.student._id);
      // Fetch related students
      getSimilarStudent(data?.student._id, data?.student.teacher._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarStudent = async (sid, tid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/fee/portal/students/related-students/${sid}/${tid}`
      );
      setRelatedStudents(Array.isArray(data?.students) ? data?.students : []);
    } catch (error) {
      console.log(error);
    }
  };

  const getPayments = async (studentId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:9000/api/fee/paymentStatus/${studentId}`
      );
      setPayments(data?.payments || []);
    } catch (error) {
      setError("Failed to fetch payment details.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle payment status function
  const togglePaymentStatus = async (paymentId, currentStatus) => {
    try {
      const newStatus = currentStatus === "Completed" ? "Pending" : "Completed";
      await axios.patch(
        `http://localhost:9000/api/fee/paymentStatus/${paymentId}`,
        { status: newStatus }
      );
      // Update the payment status in the state
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId
            ? { ...payment, status: newStatus }
            : payment
        )
      );
    } catch (error) {
      console.error("Failed to update payment status:", error);
    }
  };

  if (loading)
    return (
      <button className="btn btn-secondary fs-5" disabled>
        Loading...
      </button>
    );
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:9000/api/fee/portal/students/student-photo/${student._id}`}
            className="card-img-top"
            alt={student.name}
            height={"500px"}
            width={"350px"}
            style={{ margin: "10px" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="m-3 fw-bold">Student Details</h1>
          <h6 className="m-3 fs-5">Name : {student.name}</h6>
          <h6 className="m-3 fs-5">Roll No: {student.rollNo}</h6>
          <h6 className="m-3 fs-5">Batch No : {student.batchNo}</h6>
          <h6 className="m-3 fs-5">Teacher Name : {student?.teacher?.name}</h6>
          <hr />
          <h6 className="m-3 fs-5">Payments:</h6>
          <ul>
            {payments.length === 0 ? (
              <li>
                <strong>Status:</strong>{" "}
                <button className="btn btn-danger fs-5 " disabled>
                  Unpaid
                </button>
              </li>
            ) : (
              payments.map((payment) => (
                <li key={payment._id}>
                  <strong>Month:</strong> {payment.month}
                  <br />
                  <strong>Amount:</strong> Rs{payment.amount}
                  <br />
                  <strong>Status:</strong> {payment.status}
                  <br />
                  <strong>Date:</strong>{" "}
                  {new Date(payment.date).toLocaleDateString()}
                  <br />
                  {/* Button to toggle the payment status */}
                  <button
                    className={`btn ${
                      payment.status === "Completed"
                        ? "btn-success"
                        : "btn-danger"
                    } fs-5 mt-2`}
                    onClick={() =>
                      togglePaymentStatus(payment._id, payment.status)
                    }
                  >
                    {payment.status === "Completed" ? "Paid" : "Unpaid"}
                  </button>
                </li>
              ))
            )}
          </ul>
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
                  src={`http://localhost:9000/api/fee/portal/students/student-photo/${s?._id}`}
                  className="card-img-top"
                  height="200px"
                  width="200px"
                  alt={s.name}
                />
                <div className="card-body">
                  <h5 className="card-title">Name: {s.name}</h5>
                  <p className="card-text">Roll No: {s.rollNo}</p>
                  <p className="card-text">Batch No: {s.batchNo}</p>
                  <button
                    className="btn-primary ms-1"
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
