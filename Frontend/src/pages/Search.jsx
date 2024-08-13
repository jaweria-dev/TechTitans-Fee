import React from "react";
import { useSearch } from "../components/context/searchContext";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  console.log("Search values:", values);
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Students Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((s) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:9000/api/fee/portal/students/student-photo/${s._id}`}
                  className="card-img-top"
                  alt={s.name}
                />
                <div className="card-body">
                  <h5 className="card-title">Name: {s.name}</h5>
                  <p className="card-text">Roll No: {s.rollNo}</p>
                  <button
                    className="btn-primary ms-1"
                    style={{ height: "40px" }}
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

export default Search;
