import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../User/Profile.css';
import Layout from './../../components/Layout/Layout';
import UserMenu from './../../components/Layout/UserMenu';
import UserHeader from '../../components/Layout/UserHeader';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    rollNo: '',
    trainer: '',
    batchNo: '',
    phoneNo: '',
    joiningDate: '',
  });

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const { data } = await axios.get('/api/users/1'); // Replace with actual user ID or endpoint
  //     setProfile(data);
  //   };

  //   fetchProfile();
  // }, []);

  const [openMenuToggle, setOpenMenuToggle] = useState(false);

  useEffect(() => {
    console.log('Sidebar toggle state:', openMenuToggle);
  }, [openMenuToggle]);

  const OpenMenu = () => {
    setOpenMenuToggle(!openMenuToggle);
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };
  return (
    <Layout>
      <div className="profile-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <UserMenu openMenuToggle={openMenuToggle} OpenMenu={OpenMenu} />
            </div>
            <div className="col-md-9">
              <UserHeader OpenMenu={OpenMenu} />
              <div className="profile-box m-3 p-3">
                <div className="profile-header">
                  <h1>Your Profile</h1>
                </div>
                <form onSubmit={handleSubmit} className="profile-details">
                  <div className="profile-detail-item">
                    <strong>Name:</strong>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <strong>Email:</strong>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <strong>Roll No:</strong>
                    <input
                      type="text"
                      name="rollNo"
                      value={profile.rollNo}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <strong>Trainer:</strong>
                    <input
                      type="text"
                      name="trainer"
                      value={profile.trainer}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <strong>Batch No:</strong>
                    <input
                      type="text"
                      name="batchNo"
                      value={profile.batchNo}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <strong>Phone No:</strong>
                    <input
                      type="text"
                      name="phoneNo"
                      value={profile.phoneNo}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="profile-detail-item">
                    <strong>Joining Date:</strong>
                    <input
                      type="date"
                      name="joiningDate"
                      value={profile.joiningDate}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn-primary mt-3">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
