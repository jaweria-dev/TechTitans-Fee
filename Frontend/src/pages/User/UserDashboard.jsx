import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../User/UserDashboard.css";
import UserMenu from "./../../components/Layout/UserMenu";
import UserHeader from "../../components/Layout/UserHeader";
import Layout from "../../components/Layout/Layout";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate("/dashboard/user/payment-method");
  };

  const [openMenuToggle, setOpenMenuToggle] = useState(false);

  useEffect(() => {
    console.log("Sidebar toggle state:", openMenuToggle);
  }, [openMenuToggle]);

  const OpenMenu = () => {
    setOpenMenuToggle(!openMenuToggle);
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
            </div>
            <div className="container-md col-md-9">
              <div className="col-md-3">
                <UserHeader OpenMenu={OpenMenu} />
                <h1 className="m-3" style={{ color: "#8ac642" }}>
                  Dashboard
                </h1>
              </div>
              <div className="row frst m-3">
                <div className="col-12 rap">
                  <div className="pak">
                    <h4 className="middle">Welcome Back SMIT Student 👋</h4>
                    <p className="m-3">
                      "Welcome to the Student Dashboard! We're excited to have
                      you here. This portal is designed to make managing your
                      academic journey easier and more efficient. Explore the
                      features, stay updated with your progress, and feel free
                      to reach out if you need any assistance. Thank you for
                      being a part of our community!"
                    </p>
                  </div>
                </div>
              </div>
              <div className="container-md">
                <div className="row">
                  <div className="col-12 stus m-3">
                    <h4>Fees Status</h4>
                  </div>
                </div>
              </div>
              <div className="container-md flex col-md-9">
                <div
                  className="row m-3"
                  style={{ gap: "10px", position: "relative", left: "23px" }}
                >
                  <div className="col-5 red">
                    <div className="pay">
                      <div className="pack">
                        <i
                          className="fa-solid fa-coins"
                          style={{ fontSize: 22, color: "#8ac642" }}
                        />
                        <p style={{ fontWeight: "bold" }}>12000</p>
                        <p>Total payable</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 red">
                    <div className="pay">
                      <div className="pack">
                        <i
                          className="fa-solid fa-coins"
                          style={{ fontSize: 22, color: "#8ac642" }}
                        />
                        <p style={{ fontWeight: "bold" }}>1000</p>
                        <p>Total paid</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-md">
                <div className="row">
                  <div className="col-12 stus m-3">
                    <h4>Enrolled courses</h4>
                  </div>
                </div>
              </div>
              <div className="container-md">
                <div className="row lst m-3">
                  <div className="col-4 red cd">
                    <div className="pack">
                      <p style={{ color: "#8ac642" }}>
                        Web and App Development
                      </p>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleViewClick}
                        style={{ width: "100px" }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                  <div className="col-4 red cd">
                    <div className="pack">
                      <p style={{ color: "#8ac642" }}>Graphic Designing</p>
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={handleViewClick}
                        style={{ width: "100px" }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
