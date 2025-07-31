import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
const ChangePassword = ({ token }) => {
  const navigate = useNavigate();
   
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      return alert("New passwords do not match");
    }

    try {
      const response = await axios.post(
        "https://localhost:7113/api/Account/ChangePassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Password changed successfully!");
      navigate('/dashboard');
      // setCurrentPassword("");
      // setNewPassword("");
      // setConfirmNewPassword("");
         
    } catch (error) {
      console.error("Change password error:", error.response?.data);
      alert(
        "Failed to change password: " +
        (error.response?.data?.[0]?.description ?? "Unknown error")
      );
    }
  };

  return (
    <>

      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-12 d-flex align-items-center stretch-card">
              <div className="d-flex justify-content-between align-items-center w-100">
                <h2 className="fs-1 Bricolage-font">
                  <i className="bi bi-pencil-square me-3"></i>
                  Change Password
                </h2>

              </div>
            </div>
          </div>
          <hr />
          <div className="col-xl-8 offset-xl-2 align-items-center stretch-card">
            <div className="card shadow border-0 rounded-lg mt-5">
              {/* <div className="card-header">
                            <h2 className="text-center font-weight-bold p-4 Bricolage-font">Add Event</h2>
                        </div> */}
              <div className="card-body">
                {/* encType="multipart/form-data" */}
                <form onSubmit={handleChangePassword} >

                  <div className="row gap-3 gap-md-0 mb-3 mt-4">
                    <div className="col-md-12 mb-4">
                      {/* <label className="pb-1">Current Password</label> */}
                      <input type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        placeholder='Current Password' />
                    </div>
                    <div className="col-md-12 mb-4">
                      {/* <label className="pb-1">New Password</label> */}
                        <input type="password"
                        className="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        placeholder='New Password' />
                    </div>
                     <div className="col-md-12 mb-4">
                      {/* <label className="pb-1">New Password</label> */}
                        <input type="password"
                        className="form-control"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        placeholder='Confirm New Password' />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="d-flex gap-2 align-items-center">
                      <button type="submit" className="btn section-btn btn-custom">
                        Change Password
                      </button>
                      <Link
                        className="btn btn-custom section-btn"
                        to="/dashboard"
                        style={{ background: '#333', color: 'white' }}
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>




      {/* <form
        onSubmit={handleChangePassword}
        className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md rounded-lg"
      >


        <div className="mb-4">
          <label className="block mb-1">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
 */}

    </>
  );
};

export default ChangePassword;
