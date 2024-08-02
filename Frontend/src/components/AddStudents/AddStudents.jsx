// import { DataGrid } from "@mui/x-data-grid";
import "../AddStudents/AddStudents.css";

const AddStudents = (props) => {
  // slug: string;
  // columns: DataGrid;
  // setOpen: React.Dispatch < React.SetStateAction < boolean >>;
}

const handleSubmit = (e) => {
  e.preventDefault();


  props.setOpen(false);

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type="text" placeholder={column.field} />
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;
