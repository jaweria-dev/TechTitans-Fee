// import { useState, useEffect } from "react";
// import { useAuth } from "../context/Context";
// import { Outlet } from "react-router-dom";
// import axios from "axios";
// import Spinner from "./Spinner";

// export default function PrivateRoute(){
//     const[ok, setOk] = useState(false)
//     const[auth, setAuth] = useAuth()

//     useEffect(() => {
//         const authCheck = async() =>{
//            const res = await axios.get('http://localhost:9001/api/fee/portal/user-auth', {
//             headers:{
//                 "Authorization":auth?.token
//             }
//            })
//            if(res.data.ok){
//             setOk(true)
//            } else {
//             setOk(false)
//            }
//         }
//         if (auth?.token) authCheck()
//     }, [auth?.token])
    
//     return ok ? <Outlet/> : <Spinner/>
// }


import { useState, useEffect } from "react";
import { useAuth } from "../context/Context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";



export default function PrivateRoute(){
        const[ok, setOk] = useState(false)
        const[auth, setAuth] = useAuth();


        useEffect(() => {
            const authCheck = async () => {
                if (!auth?.token) {
                    console.error("No token provided");
                    setOk(false);
                    return;
                }
    
    
                try {
                    const res = await axios.get('http://localhost:9000/api/fee/portal/user-auth', {
                        headers: {
                            "Authorization": `Bearer ${auth?.token}`
                        }
                    });
                    console.log('Authorization response:', res.data); // Debugging
                    setOk(res.data.ok);
                } catch (error) {
                    console.error("Authorization check failed:", error.response ? error.response.data : error.message);
                    setOk(false);
                }
            };
    
            authCheck();
        }, [auth?.token]);
    
        if (ok) {
            return <Outlet />;
        } else {
            return <Spinner />;
        }
    }