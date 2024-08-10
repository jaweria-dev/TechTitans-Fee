// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import axios from "axios";
// import { Checkbox, Radio } from "antd";
// import { useNavigate } from "react-router-dom";
// import { Batch } from './../components/Batch';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [checked, setChecked] = useState([]);
//   const [radio, setRadio] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const getAllTeachers = async () => {
//     try {
//       console.log("Fetching all teachers");
//       const { data } = await axios.get("http://localhost:9000/api/fee/portal/teacher/get-teacher");
//       console.log("Response data:", data);
//       if (data.success) {
//         setTeachers(data.teacher);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error in getting teachers:", error);
//       toast.error("Something went wrong in getting teachers");
//     }
//   };

//   useEffect(() => {
//     getAllTeachers();
//   }, []);

 
//   //get Studennt
// const getAllStudents = async () => {
//   try {
//     setLoading(true);
//     const response = await axios.get(
//       `http://localhost:9000/api/fee/portal/students/student-list/${page}`
//     );
//     console.log("API Response:", response);
    
//     const studentsData = response.data.students 

//     if (studentsData) {
//       setStudents(studentsData);
//     } else {
//       console.error("Expected students data not found in API response.");
//     }
//   } catch (error) {
//     console.log("Error fetching students:", error.response ? error.response.data : error.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   // getTOtal COunt
//   const getTotal = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:9000/api/fee/portal/students/student-count"
//       );
//       console.log("Total count response:", response.data);
//       setTotal(response.data?.total || 0);
//     } catch (error) {
//       console.error("Error fetching total count:", error.response ? error.response.data : error.message);
//     }
//   };
//   useEffect(() => {
//     if (page !== 1) {
//       loadMore();
//     }
//   }, [page]);

  
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:9000/api/fee/portal/students/student-list/${page}`
//       );
//       setStudents(prevStudents => [...prevStudents, ...response.data?.students || []]);
//     } catch (error) {
//       console.error("Error loading more students:", error.response ? error.response.data : error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getTotal();
//   }, []);



//   // filter by teacher
//   const handleFilter = (value, id) => {
//     let all = [...checked];
//     if (value) {
//       all.push(id);
//     } else {
//       all = all.filter((s) => s !== id);
//     }
//     setChecked(all);
//   };
//   useEffect(() => {
//     if (!checked.length || !radio.length) getAllStudents();
//   }, [checked.length, radio.length]);

//   useEffect(() => {
//     if (checked.length || radio.length) filterStudent();
//   }, [checked, radio]);

//   //get filtered student
//   const filterStudent = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://localhost:9000/api/fee/portal/students/student-filters",
//         {
//           checked,
//           radio,
//         }
//       );
//       setStudents(data?.students);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       <div className="container-fluid row mt-3">
//         <div className="col-md-2">
//           {/* <h4 className="text-center">Filter By Teacher</h4> */}
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {teachers?.map((t) => (
//               <Checkbox
//                 key={t._id}
//                 onChange={(e) => handleFilter(e.target.checked, t._id)}
//               >
//                 {t.name}
//               </Checkbox>
//             ))}
//           </div>
//           {/* price filter */}
//           <h4 className="text-center mt-4">Filter By batch</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Batch?.map((s) => (
//                 <div key={s._id}>
//                   <Radio value={s.array}>{s.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column">
//             <button
//               className="btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9">
//           <h1 className="text-center">All Students</h1>
//           <div className="d-flex flex-wrap">
//             {students?.map((s) => (
//               <div className="card m-2" style={{ width: "18rem" }}>
//                 <img
//                   src={`http://localhost:9000/api/fee/portal/students/student-photo/${s._id}`}
//                   className="card-img-top"
//                   alt={s.name} height="200px" width="200px"
//                   onError={(e) => e.target.src = 'path/to/fallback-image.jpg'}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{s.name}</h5>
//                   <button
//                     className="btn-primary ms-1" style={{position:"relative", left:"-10px", margin:"10px"}}
//                     onClick={() => navigate(`/student/${s.slug}`)}
//                   >
//                     More Details
//                   </button>
//                   {/* <button class="btn btn-secondary ms-1">ADD TO CART</button> */}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {students && students.length < total && (
//               <button
//                 className="btn-warning"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Loadmore"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;



import React from 'react'
import Layout from '../components/Layout/Layout'

const HomePage = () => {
  return (
    <Layout>
      <h1>home</h1>
    </Layout>
  )
}

export default HomePage
