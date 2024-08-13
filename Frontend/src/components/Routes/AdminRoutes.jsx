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
        const res = await axios.get(
          "http://localhost:9000/api/fee/portal/admin-auth",
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );
        console.log("Authorization response:", res.data);
        setOk(res.data.ok);
      } catch (error) {
        console.error(
          "Authorization check failed:",
          error.response ? error.response.data : error.message
        );
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  if (ok) {
    return <Outlet />;
  } else {
    return <Spinner path="" />;
  }
}
