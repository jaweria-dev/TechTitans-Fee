import React from "react";
import "./HomePage.css"; // Import the CSS file for styling
import Layout from "../components/Layout/Layout";
import { useAuth } from "../components/context/Context";

const HomePage = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="user-details">
        <h1>User Details</h1>
        <form className="user-form">
          <div className="form-group">
            <label>User ID:</label>
            <input type="text" value={auth.userId || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={auth.email || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={auth.username || ""} readOnly />
          </div>
          {/* Add more fields as needed */}
          <div className="form-group">
            <label>Token:</label>
            <input type="text" value={auth.token || ""} readOnly />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <input type="text" value={auth.role || ""} readOnly />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default HomePage;
