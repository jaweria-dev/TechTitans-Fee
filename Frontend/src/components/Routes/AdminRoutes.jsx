
import { useState, useEffect } from "react";
import { useAuth } from "../../components/context/Context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoutes() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            if (!auth?.token) {
                console.error("No token provided");
                setOk(false);
                return;
            }

            try {
                const res = await axios.get('http://localhost:9000/api/fee/portal/admin-auth', {
                    headers: {
                        "Authorization": `Bearer ${auth?.token}`
                    }
                });
                setOk(res.data.ok);
            } catch (error) {
                console.error("Authorization check failed:", error);
                setOk(false);
            }
        };

        authCheck();
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path="" />;
}

