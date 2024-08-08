import { useState, useEffect } from "react";
import { useAuth } from "../../components/context/Context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function PrivateRoute(){
    const[ok, setOk] = useState(false)
    const[auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async() =>{
           const res = await axios.get('http://localhost:9000/api/fee/portal/admin-auth', {
            headers:{
                "Authorization":auth?.token
            }
           })
           if(res.data.ok){
            setOk(true)
           } else {
            setOk(false)
           }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])
    
    return ok ? <Outlet/> : <Spinner path=""/>
}




