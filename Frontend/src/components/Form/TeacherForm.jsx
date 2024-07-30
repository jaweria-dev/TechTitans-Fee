import React from "react";
// import "../../styles/Admin.css"

const TeacherForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter new teacher" value={value}
            onChange={(e) => setValue(e.target.value)}/>
        </div>

        <button type="submit" className="btn-btn btn-primary">
          Submit</button>
      </form>
    </>
  );
};

export default TeacherForm;