import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTeacher from './../hooks/useTeacher';
const Teachers = () => {
  const teachers = useTeacher();
  return (
      <div className="container">
        <div className="row">
          {teachers.map((t) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={t._id}>
              <Link to={`/teacher/${t.slug}`} className="btn btn-primary">
                {t.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
  );
};

export default Teachers;