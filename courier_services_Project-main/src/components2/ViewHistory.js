import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ViewHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHistory([
        {
          id: 1,
          date: '2024-12-20',
          sender: 'pradip mane',
          recipient: 'pradip',
          status: 'Delivered',
        },
        {
          id: 2,
          date: '2024-12-18',
          sender: 'nikhil',
          recipient: 'durgesh',
          status: 'In Transit',
        },
        {
          id: 3,
          date: '2024-12-15',
          sender: 'jagdish',
          recipient: 'noor',
          status: 'Canceled',
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="row viewhistoryrow">
    <div className="container mt-5">
      <div className="card history-card shadow glass-effect">
        <div className="card-body">
          <h3 className="card-title text-center">View History</h3>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : history.length === 0 ? (
            <p className="text-center mt-3">No history available.</p>
          ) : (
            <table className="table table-striped mt-4">
              <thead className="thead-dark">
                <tr>
                  <th>Date</th>
                  <th>Sender</th>
                  <th>Recipient</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.sender}</td>
                    <td>{record.recipient}</td>
                    <td>
                      <span
                        className={`badge ${
                          record.status === 'Delivered'
                            ? 'badge-success'
                            : record.status === 'In Transit'
                            ? 'badge-warning'
                            : 'badge-danger'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewHistory;
