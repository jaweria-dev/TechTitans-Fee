import React from "react";
import { useSearch } from "../components/context/searchContext";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
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
                  src={`http://localhost:9000/api/fee/portal/students/student-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">
                    {s.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {s.rollNo}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Search;
