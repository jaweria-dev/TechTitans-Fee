import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "../dataTable/DataTable.css"

const DataTable = (props) => {



    const handleDelete = (id) => {
    
        // axios.delete("localhost:9001/api")
        // console.log(id + "has been deleted")
    };

    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div className="action">
                    <Link to={`/${props.slug}/${params.row.id}`}>
                        {/* <img src="/view.svg" alt="" /> */}
                        <button className="button-btn1 btn-primary ms-2">Edit</button>
                    </Link>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        {/* <img src="/delete.svg" alt="" /> */}
                        <button className="button-btn2 btn-danger ms-2">Delete</button>
                    </div>
                </div>
            );
        },
    };

    return (
        <div className="dataTable">
            <DataGrid
                className="dataGrid"
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 6,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                    },
                }}
                pageSizeOptions={[6]}
                checkboxSelection
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
        </div>
    );
};

export default DataTable;
