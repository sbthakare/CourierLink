import React, { useState, useEffect } from "react";
import "../css/Userprofile.css";

function UserProfile() {
  const storedData = localStorage.getItem("userData");
  const dataa = storedData ? JSON.parse(storedData) : null;
  const userId = dataa?.id; 

  console.log("User Data from localStorage:", dataa);
  console.log("Extracted User ID:", userId);

  const [isEditing, setIsEditing] = useState(false);
  const [udataa, setUdatac] = useState({});

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    if (!userId) {
      console.warn("User ID is missing. Skipping API call.");
      return;
    }

    const fetchUserData = async () => {
      console.log("Fetching user data for ID:", userId);
      try {
        const respo = await fetch(`http://localhost:7575/user/get/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (respo.ok) {
          const userData = await respo.json();
          console.log("User data:", userData);
          setUdatac(userData);

          setNewName(userData.userName || "");
          setNewEmail(userData.userEmail || "");
        } else {
          console.error(`Failed to fetch user data. Status: ${respo.status}`);
        }
      } catch (error) {
        console.error("Something went wrong while fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveProfile = async () => {
    if (!userId) {
      console.error("User ID is missing. Cannot update profile.");
      return;
    }

    const updatedProfile = {
      id: userId, 
      userName: newName,
      userEmail: newEmail,
      userMobileNo: udataa.userMobileNo || "",
    };

    try {
      const response = await fetch(`http://localhost:7575/user/update/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const updatedUser = await response.json();

        const updatedUserWithId = { ...updatedUser, id: userId };
        setUdatac(updatedUserWithId);
        setIsEditing(false);
        alert("Profile updated successfull",{newEmail})
        localStorage.setItem("userData", JSON.stringify(updatedUserWithId));

        console.log("Profile updated successfully!");
      } else {
        console.error("Failed to update profile. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="userprofilecontainer">
    <div className="uprofile">
      <div className="uprof">
        {isEditing ? (
          <>
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
          </>
        ) : (
          <div className="profile-text">
            <p><strong>Name:</strong> {udataa.userName || "N/A"}</p>
            <p><strong>Email:</strong> {udataa.userEmail || "N/A"}</p>
            <button className="button edit-button" onClick={toggleEdit}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default UserProfile;

