// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CompletedOrders = () => {
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:7575/api/courier/completedOrders")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCompletedOrders(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   const filteredOrders = completedOrders.filter((order) =>
//     order.employeeName?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container mt-5 p-4 glass-effect" id="ordcompletemp">
//       <h2 className="text-center mb-4">Completed Orders</h2>

//       <div className="form-group mb-4">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by employee name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="text-center">Loading completed orders...</p>
//       ) : error ? (
//         <p className="text-center text-danger">{error}</p>
//       ) : filteredOrders.length > 0 ? (
//         <table className="table table-hover">
//           <thead className="thead-dark">
//             <tr>
//               <th>Order ID</th>
//               <th>Employee Name</th>
//               <th>Delivery Address</th>
//               <th>Status</th>
//               <th>Delivery Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order.orderId} className="fade-in">
//                 <td>{order.orderId}</td>
//                 <td>{order.employeeName || "N/A"}</td>
//                 <td>{order.address}</td>
//                 <td>
//                   <span className="badge bg-success">{order.status}</span>
//                 </td>
//                 <td>{order.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center">No completed orders found.</p>
//       )}
//     </div>
//   );
// };

// export default CompletedOrders;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CompletedOrders = () => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:7575/api/courier/completedOrders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        setCompletedOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const filteredOrders = completedOrders.filter((order) =>
    order.employeeName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5 p-4 glass-effect" id="ordcompletemp">
      <h2 className="text-center mb-4">Completed Orders</h2>

      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by employee name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading completed orders...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : filteredOrders.length > 0 ? (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Order ID</th>
              <th>Employee Name</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId} className="fade-in">
                <td>{order.orderId}</td>
                <td>{order.employeeName || "N/A"}</td>
                <td>{order.address}</td>
                <td>
                  <span className="badge bg-success">{order.status}</span>
                </td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No completed orders found.</p>
      )}
    </div>
  );
};

export default CompletedOrders;