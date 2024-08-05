import React from "react";
import "../../pages/Admin/Admin.css"
import { Button } from '@mui/material';

const TeacherForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter new teacher" value={value}
            onChange={(e) => setValue(e.target.value)}/>
        </div>

        {/* <button type="submit" className="btn-btn btn-primary">
          Submit</button> */}

          <Button type="submit" variant="contained" color="primary">  
            Submit  
          </Button> 
      </form>
    </>
  );
};

export default TeacherForm;


