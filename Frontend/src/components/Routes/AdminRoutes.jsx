import { useState, useEffect } from "react";
import { useAuth } from "../../components/context/Context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('http://localhost:9000/api/fee/portal/admin-auth', {
                    headers: {
                        "Authorization": `Bearer ${auth?.token}`
                    }
                });
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.error("Authorization check failed:", error);
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
}

