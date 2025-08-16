import React, { useState } from 'react';

function EmployeeProfile() {
  const [profile, setProfile] = useState({
    name: 'Rithik Roshan',
    email: 'ritik@123gmail.com',
  });

  const [isEditing, setIsEditing] = useState(false);

  const [newName, setNewName] = useState(profile.name);
  const [newEmail, setNewEmail] = useState(profile.email);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = () => {
    setProfile({
      name: newName,
      email: newEmail,
    });
    setIsEditing(false); 
  };

  const renderProfileView = () => {
    return (
      <div className="profile-text">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <button className="button edit-button" onClick={toggleEdit}>Edit Profile</button>
      </div>
    );
  };

  const renderProfileEdit = () => {
    return (
      <div className="uprofile">
      <div className="uprof">
        <div className="up"> 
          <label className="input-label">Name: </label>
          <input
            className="input-field"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label className="input-label">Email: </label>
          <input
            className="input-field"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <button className="button save-button" onClick={saveProfile}>Save</button>
        <button className="button cancel-button" onClick={toggleEdit}>Cancel</button>
      </div>
      </div>
    );
  };

  if (isEditing) {
    return renderProfileEdit();
  } else {
    return renderProfileView();
  }
}

export default EmployeeProfile;
