import React, { useState, useEffect } from 'react'
import DataTable from "../../components/dataTable/DataTable";
import AddStudents from "../../components/AddStudents/AddStudents";
import studentsData from "../../components/data/studentsData";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from '../../components/Layout/AdminHeader';
import "./Students.css"
// import "../../components/dataTable/DataTable.css"
// import AdminMenu from '../../components/Layout/AdminMenu'

const Students = () => {
    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "img",
            headerName: "Avatar",
            width: 100,
            renderCell: (params) => {
                return <img src={params.row.img || "/noavatar.png"} alt="" />;
            },
        },
        {
            field: "Name",
            headerName: "Name",
            width: 150,
            editable: true,
        },
        {
            field: "email",
            headerName: "Email",
            width: 200,
        },
        {
            field: "phone",
            headerName: "Phone",
            width: 200,
        },
        {
            field: "rollno",
            headerName: "Roll No",
            width: 150,
        },
        {
            field: "batchno",
            headerName: "Batch No",
            width: 150,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            width: 200,
        },
        {
            field: "verified",
            headerName: "Verified",
            width: 150,
            type: "boolean",
        },
    ];
    const [open, setOpen] = useState(false);

    const [openMenuToggle, setOpenMenuToggle] = useState(false);

    useEffect(() => {
        console.log('Sidebar toggle state:', openMenuToggle);
    }, [openMenuToggle]);

    const OpenMenu = () => {
        setOpenMenuToggle(!openMenuToggle);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
                </div>

                <div className="col-md-9">
                    <div className="col-md-3">
                        <AdminHeader OpenMenu={OpenMenu} />
                    </div>

                    <div className="students">
                        <div className="info">
                            <h1>All Students List</h1>
                            <button onClick={() => setOpen(true)}>Add New User</button>
                        </div>
                        <DataTable slug="users" columns={columns} rows={studentsData} />

                        {open && <AddStudents slug="user" columns={columns} setOpen={setOpen} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students
