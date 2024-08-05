import React, { useState, useEffect } from 'react'
import DataTable from "../../components/dataTable/DataTable";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminHeader from '../../components/Layout/AdminHeader';
import "./Students.css"
import AddStudents from '../../components/AddStudents/AddStudents';
import { Button } from '@mui/material';
import { useAuth } from "../../components/context/Context";

const Students = () => {
    // const [updatedName, setUpdatedName] = useState("");
    const [rows, setRows] = useState("");
    const [open, setOpen] = useState(false);
    const [openMenuToggle, setOpenMenuToggle] = useState(false);
    const [auth] = useAuth(); 

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone", width: 200 },
        { field: "rollNo", headerName: "Roll No", width: 150 },
        { field: "batchNo", headerName: "Batch No", width: 150 },
        { field: "teacher", headerName: "Teacher", width: 150 },
    ];

    useEffect(() => {
        console.log('Sidebar toggle state:', openMenuToggle);
    }, [openMenuToggle]);

    const OpenMenu = () => {
        setOpenMenuToggle(!openMenuToggle);
    };

    const addStudent = (newStudent) => {
        newStudent.id = rows.length + 1; // Generate new ID (or implement your own logic)  
        setRows([...rows, newStudent]); // Add the new student to the list  
    };

    // const axiosInstance = axios.create({  
    //     baseURL: "http://localhost:9001/api/fee/portal/students",  
    //     headers: {  
    //       "Authorization": `Bearer ${auth?.token}`  
    //     }  
    //   });  
    //    // Log token to ensure it's valid
    //    console.log("Token used:", auth?.token); 


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
                            <Button className='std-btn' onClick={() => setOpen(true)} variant='contained' color='primary'>Add New Student</Button>
                        </div>

                        <DataTable slug="users" columns={columns} rows={rows} />


                        <AddStudents open={open} setOpen={setOpen} addStudent={addStudent} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Students
