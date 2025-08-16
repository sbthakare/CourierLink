import React, { useState } from 'react';
import "../css/CourierTracking.css";

const SimpleTracker = () => {
    const [trackingId, setTrackingId] = useState('');
    const [courierData, setCourierData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async () => {
        if (!trackingId.trim()) {
            setError('Please enter a valid tracking ID.');
            setCourierData(null);
            return;
        }

        setLoading(true);
        setError(null);
        setCourierData(null);

        try {
            const response = await fetch(`http://localhost:7575/api/courier/track/${trackingId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch tracking information. Please check the tracking ID.');
            }

            const text = await response.text();
            if (!text) {
                throw new Error('No data found for this tracking ID.');
            }

            const data = JSON.parse(text);

            if (!data || !data.tracking) {
                throw new Error('Invalid response format. Please try again.');
            }

            setCourierData(data);
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="Parenttracking">
            <div className="thisisclass">
            <div className="container CourierTrackingc">
                <h1 className="Cttitle">Courier Tracker</h1>
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID"
                    className="trackingidinput"
                />
                <button onClick={handleTrack} className="trackingbtn">
                    Track
                </button>

                {loading && <p className="trackingloading">Loading...</p>}
                {error && <p className="trackingerror">{error}</p>}
               
                {courierData && courierData.tracking && (
                    <div className="trackingdetails">
                        <h2 id="trdtitle">Tracking Details</h2>
                        <p><strong>Tracking ID:</strong> {courierData.tracking.trackingId}</p>
                        <p><strong>Status:</strong> {courierData.status}</p>
                        <p><strong>Current Location:</strong> {courierData.tracking.currentLocation}</p>
                        <p><strong>Expected Delivery:</strong>{new Date(new Date(courierData.bookingDate).setDate(new Date(courierData.bookingDate).getDate() + 3)).toLocaleDateString()} </p>
                    </div>
                )}
            </div>
            </div>
        </div>
    );
};

export default SimpleTracker;














