import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/EMpProfile.css";
const EmpProfile = () => {
  const [user, setUser] = useState({
    name: 'Nikhil',
    email: 'nikhar@12gmail.com',
    phone: '9876543210',
    address: 'nandurbar',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [newProfilePicture, setNewProfilePicture] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newProfilePicture) {
      setEditedUser({ ...editedUser, profilePicture: newProfilePicture });
    }
    setUser(editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedUser(user);
    setNewProfilePicture(null);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='empprofilee'>
    <div className="container mt-5" id="empprofile">
      <div className="card profile-card shadow glass-effect">
        <div className="card-body text-center">
          <h3 className="card-title">User Profile</h3>

          <div className="profile-picture-container mb-4">
            {isEditing && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="form-control"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Name</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
              />
            ) : (
              <p>{user.name}</p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
              />
            ) : (
              <p>{user.email}</p>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            {isEditing ? (
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{user.phone}</p>
            )}
          </div>

          <div className="form-group">
            <label>Address</label>
            {isEditing ? (
              <textarea
                className="form-control"
                name="address"
                value={editedUser.address}
                onChange={handleChange}
              ></textarea>
            ) : (
              <p>{user.address}</p>
            )}
          </div>

          {isEditing ? (
            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary mt-3" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmpProfile;