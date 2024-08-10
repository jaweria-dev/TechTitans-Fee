import React from "react";
import "../../pages/Admin/Admin.css";

const TeacherForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form className="teacher-from" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control teacher-input"
            placeholder="Enter new teacher"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-btn3">
          Submit
        </button>
      </form>
    </>
  );
};

export default TeacherForm;
