import React from "react";
import { getCurrentUser } from "./../services/authService";

const Profile = () => {
  const user = getCurrentUser();

  return (
    <div className="container-fluid mainContent">
      <h1>Profile Page</h1>
      <div className="container">
        <p>Unique ID: {user._id}</p>
        <p>Name: {user.name}</p>
      </div>
    </div>
  );
};

export default Profile;
