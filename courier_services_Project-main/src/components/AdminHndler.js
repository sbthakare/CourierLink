import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const billData = useSelector((state) => state.bill);

  const [employees, setEmployees] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
  });
    localStorage.setItem("taskdata", JSON.stringify(couriers));
  useEffect(() => {
    fetchEmployees();
    fetchCouriers();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:7575/employee/getEmployees"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchCouriers = async () => {
    try {
      const response = await fetch(
        "http://localhost:7575/api/courier/pendingOrders"
      );
      const data = await response.json();
      setCouriers(data);
    } catch (error) {
      console.error("Error fetching couriers:", error);
    }
  };

  const assignCourier = async (courierId, employeeId) => {
    try {
      await fetch(
        `http://localhost:7575/api/courier/update-location/${courierId}?newLocation=${employeeId}`,
        {
          method: "PUT",
        }
      );

      setCouriers((prevCouriers) =>
        prevCouriers.map((courier) =>
          courier.id === courierId
            ? { ...courier, status: "Assigned", assignedTo: employeeId }
            : courier
        )
      );
      console.log(couriers)
    } catch (error) {
      console.error("Error assigning courier:", error);
    }
  };

  const addEmployee = async () => {
    try {
      const response = await fetch("http://localhost:7575/employee/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (response.ok) {
        fetchEmployees(); 
        setNewEmployee({ name: "", email: "", phone: "" });
        
      } else {
        console.error("Error adding employee");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="admin-page">
      <header className="adhed">
        <h1>Courier Services - Admin Dashboard</h1>
      </header>

      <section className="csection">
        <h2>Placed Couriers</h2>
        <table className="courier-table adtable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {couriers.map((courier) => (
              <tr key={courier.id}>
                <td>{courier.id}</td>
                <td>{courier.receiverName}</td>
                <td>{courier.destination}</td>
                <td>{courier.status}</td>
                <td>
                  {courier.assignedTo
                    ? `Employee ${courier.assignedTo}`
                    : "Not Assigned"}
                </td>
                <td>
                  <select
                    onChange={(e) => assignCourier(courier.id, e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Employee
                    </option>
                    {employees.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="esection">
        <h2>Manage Employees</h2>
        <table className="employee-table adtable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Add New Employee</h3>
        <form
          className="formad"
          onSubmit={(e) => {
            e.preventDefault();
            addEmployee();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={newEmployee.phone}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            required
          />
          <button type="submit">Add Employee</button>
        </form>
      </section>
    </div>
  );
}























