import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ActiveOrder = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
  
    setOrders([
      { id: 1, recipient: 'Pradip', address: 'nashik', status: 'In Transit' },
      { id: 2, recipient: 'Pratik', address: 'govind nagar', status: 'Out for Delivery' },
      { id: 3, recipient: 'Noor', address: 'govind nagar', status: 'Delivered' },
    ]);
  }, []);

  const handleCancel = (id) => {
    const confirmed = window.confirm('Are you sure you want to cancel this order?');
    if (confirmed) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const filteredOrders = orders.filter(order => 
    order.recipient.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="row mt-5 p-4 glass-effect" id="actusercont">
      <h2 className="text-center mb-4">Active Order Details</h2>

      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by recipient name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredOrders.length > 0 ? (
        <table className="table table-hover">
          <thead className="thead-dark" >
            <tr>
              <th>Order ID</th>
              <th>Recipient Name</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="fade-in">
                <td>{order.id}</td>
                <td>{order.recipient}</td>
                <td>{order.address}</td>
                <td>{order.status}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No active orders found.</p>
      )}
    </div>
  );
};

export default ActiveOrder;