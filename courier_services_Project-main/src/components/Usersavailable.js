import React, { useEffect, useState } from "react";

export default function Useravailable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7575/user/getUsers`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  console.log(users);
  let content;
  if (users.length > 0) {
    content = (
      <table className="useravailabletable">
        <thead className="utthead">
          <tr>
            <th className="uath">ID</th>
            <th className="uath">Name</th>
            <th className="uath">Email</th>
            <th className="uath">Mobile Number</th>
            <th className="uath">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => (
            <tr key={e.userId} className="uatr">
              <td className="uatd">{e.userId}</td>
              <td className="uatd">{e.userName}</td>
              <td className="uatd">{e.userEmail}</td>
              <td className="uatd">{e.userMobileNo}</td>
              <td className="uatd">{e.userAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    content = <p>No users available</p>;
  }

  return (
    <div className="uavailable" id="use">
      <div className="utitleb">
        <h1>USERS</h1>
        <div>{content}</div>
      </div>
    </div>
  );
}