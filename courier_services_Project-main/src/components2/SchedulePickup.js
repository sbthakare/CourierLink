import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SchedulePickup = () => {
  const [pickupDetails, setPickupDetails] = useState({
    senderName: '',
    senderAddress: '',
    recipientName: '',
    recipientAddress: '',
    pickupDate: '',
    pickupTime: '',
    packageDetails: '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPickupDetails({ ...pickupDetails, [name]: value });
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    setConfirmationMessage('Pickup successfully scheduled!');
    setPickupDetails({
      senderName: '',
      senderAddress: '',
      recipientName: '',
      recipientAddress: '',
      pickupDate: '',
      pickupTime: '',
      packageDetails: '',
    });
  };

  return (
    <div className='sp'>
    <div className="row updatedate">
    <div className="container mt-5">
      <div className="card schedule-card shadow glass-effect">
        <div className="card-body">
          <h3 className="card-title text-center">Schedule a Pickup</h3>
          {confirmationMessage && (
            <div className="alert alert-success" role="alert">
              {confirmationMessage}
            </div>
          )}
          <form onSubmit={handleSchedule}>
            <div className="form-group">
              <label>Sender Name</label>
              <input
                type="text"
                className="form-control"
                name="senderName"
                value={pickupDetails.senderName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Sender Address</label>
              <textarea
                className="form-control"
                name="senderAddress"
                value={pickupDetails.senderAddress}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>Recipient Name</label>
              <input
                type="text"
                className="form-control"
                name="recipientName"
                value={pickupDetails.recipientName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Recipient Address</label>
              <textarea
                className="form-control"
                name="recipientAddress"
                value={pickupDetails.recipientAddress}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label>previous Date</label>
              <input
                type="date"
                className="form-control"
                name="pickupDate"
                value={pickupDetails.pickupDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>New Date</label>
              <input
                type="date"
                className="form-control"
                name="pickupDate"
                value={pickupDetails.pickupDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Package Details</label>
              <textarea
                className="form-control"
                name="packageDetails"
                value={pickupDetails.packageDetails}
                onChange={handleChange}
                placeholder="e.g., Weight, Dimensions, Content"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              update
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SchedulePickup;
