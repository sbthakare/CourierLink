import React, { useState } from "react";


const FeedBackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfService: "",
    trackingNumber: "",
    deliveryLocation: "",
    packageType: "",
    timeliness: "",
    packageCondition: "",
    staffBehavior: "",
    trackingEase: "",
    likes: "",
    improvements: "",
    issues: "",
    recommend: "",
    overallSatisfaction: "",
    followUpConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    alert("Thank you for your feedback!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      dateOfService: "",
      trackingNumber: "",
      deliveryLocation: "",
      packageType: "",
      timeliness: "",
      packageCondition: "",
      staffBehavior: "",
      trackingEase: "",
      likes: "",
      improvements: "",
      issues: "",
      recommend: "",
      overallSatisfaction: "",
      followUpConsent: false,
    });
  };

  return (
    <div className="Appli">
      <div className="feedcont">
        <h1 id="feedtitle">Courier Service Feedback</h1>
        <form  id="feedform" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Personal Information</h2>
            <label id="flabel">
              Name:
              <input id="feedinput"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label id="flabel">
              Email:
              <input id="feedinput"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label id="flabel">
              Phone:
              <input id="feedinput"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label id="flabel">
              Date of Service:
              <input id="feedinput"
                type="date"
                name="dateOfService"
                value={formData.dateOfService}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="feedsection">
            <h2 id="feedsubtitle">Delivery Details</h2>
            <label id="flabel">
              Tracking Number:
              <input id="feedinput"
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleChange}
                required
              />
            </label>
            <label id="flabel">
              Delivery Location:
              <select id="feedselect"
                name="deliveryLocation"
                value={formData.deliveryLocation}
                onChange={handleChange}
                required
              >
                <option value="">Select a Location</option>
                <option value="Urban">Urban</option>
                <option value="Suburban">Suburban</option>
                <option value="Rural">Rural</option>
              </select>
            </label>
            <label id="flabel">
              Type of Package Delivered:
              <select id="feedselect"
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
              >
                <option value="">Select Package Type</option>
                <option value="Documents">Documents</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="form-section">
            <h2 id="feedsubtitle">Rate Our Service</h2>
            <label id="flabel">
              Timeliness of Delivery:
              <div className="radio-group">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num}>
                    <input
                      type="radio"
                      name="timeliness"
                      value={num}
                      checked={formData.timeliness === String(num)}
                      onChange={handleChange}
                    />
                    {num}
                  </label>
                ))}
              </div>
            </label>
            <label id="flabel">
              Condition of Package Upon Delivery:
              <div className="radio-group">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num}>
                    <input
                      type="radio"
                      name="packageCondition"
                      value={num}
                      checked={formData.packageCondition === String(num)}
                      onChange={handleChange}
                    />
                    {num}
                  </label>
                ))}
              </div>
            </label >
            <label id="flabel">
              Courier Staff Behavior:
              <div className="ratinggroup">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label  id="flabel"  key={num}>
                    <input
                      type="radio"
                      name="staffBehavior"
                      value={num}
                      checked={formData.staffBehavior === String(num)}
                      onChange={handleChange}
                    />
                    {num}
                  </label>
                ))}
              </div>
            </label>
            <label id="flabel">
              Ease of Tracking Shipment:
              <div className="ratinggroup">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num} id="flabel">
                    <input
                      type="radio"
                      name="trackingEase"
                      value={num}
                      checked={formData.trackingEase === String(num)}
                      onChange={handleChange}
                    />
                    {num}
                  </label>
                ))}
              </div>
            </label>
          </div>

          <div className="form-section">
            <h2 id="feedsubtitle">Additional Feedback</h2>
            <label id="flabel">
              What did you like about our service?
              <textarea id="feedtextarea"
                name="likes"
                value={formData.likes}
                onChange={handleChange}
              ></textarea>
            </label>
            <label id="flabel">
              What could we improve?
              <textarea id="feedtextarea"
                name="improvements"
                value={formData.improvements}
                onChange={handleChange}
              ></textarea>
            </label>
            <label id="flabel">
              Were there any issues or delays?
              <textarea id="feedtextarea"
                name="issues"
                value={formData.issues}
                onChange={handleChange}
              ></textarea>
            </label>
          </div>

          <div className="form-section">
            <h2 id="feedsubtitle">Recommendation</h2>
            <label id="flabel">
              Would you recommend our courier service to others?
              <div className="radio-group">
                <label id="flabel">
                  <input
                    type="radio"
                    name="recommend"
                    value="Yes"
                    checked={formData.recommend === "Yes"}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label id="flabel">
                  <input
                    type="radio"
                    name="recommend"
                    value="No"
                    checked={formData.recommend === "No"}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </label>

            <label id="flabel">
              How satisfied are you with our overall service?
              <select id="feedselect"
                name="overallSatisfaction"
                value={formData.overallSatisfaction}
                onChange={handleChange}
              >
                <option value="">Select Satisfaction Level</option>
                <option value="Very Satisfied">Very Satisfied</option>
                <option value="Satisfied">Satisfied</option>
                <option value="Neutral">Neutral</option>
                <option value="Dissatisfied">Dissatisfied</option>
                <option value="Very Dissatisfied">Very Dissatisfied</option>
              </select>
            </label>
          </div>

          <div className="form-section">
            <h2 id="feedsubtitle">Consent for Follow-Up</h2>
            <label id="flabel">
              <input
                type="checkbox"
                name="followUpConsent"
                checked={formData.followUpConsent}
                onChange={handleChange}
              />
              May we contact you to discuss your feedback?
            </label>
          </div>

          <button id="fbtn" type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default FeedBackForm;

