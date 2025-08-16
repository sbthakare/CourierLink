import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CuriorBook() {
  var [pricee, setpricee] = useState("");
  var [quantityy, setquantity] = useState("");

  var kelometer = useRef();
  var quantity = useRef();
  var senderName = useRef();
  var senderAddress = useRef();
  var senderPincode = useRef();
  var senderMobileNo = useRef();
  var senderEmail = useRef();
  var senderCity = useRef();
  var receiverName = useRef();
  var receiverAddress = useRef();
  var receiverPincode = useRef();
  var receiverMobileNo = useRef();
  var receiverEmail = useRef();
  var receiverCity = useRef();
  var senderItem = useRef();

  const navigate = useNavigate();

  function calculatePrice(event) {
    event.preventDefault();
    var distanceValue = parseInt(kelometer.current.value, 10) || 0;
    var quantityValue = parseInt(quantity.current.value, 10) || 0;

    if (!distanceValue || !quantityValue) {
      alert("Please enter valid distance and quantity.");
      return;
    }

    var price = distanceValue * quantityValue * 8;
    setpricee(price);
    setquantity(quantityValue);
  }
  const dataa = JSON.parse(localStorage.getItem("userData"));
  const userIdd = dataa?.id;
  function submitForm(event) {
    event.preventDefault();
  
    const courierData = {
      bookingDate: new Date().toISOString(),
      senderName: senderName.current?.value || "",
      senderAddress: senderAddress.current?.value || "",
      senderPincode: senderPincode.current?.value || "",
      senderContactNo: senderMobileNo.current?.value || "",
      senderEmail: senderEmail.current?.value || "",
      senderCity: senderCity.current?.value || "",
  
      receiverName: receiverName.current?.value || "",
      receiverAddress: receiverAddress.current?.value || "",
      receiverPincode: receiverPincode.current?.value || "",
      receiverContactNo: receiverMobileNo.current?.value || "",
      receiverEmail: receiverEmail.current?.value || "",
      receiverCity: receiverCity.current?.value || "",
  
      distance: parseInt(kelometer.current?.value, 10) || 0, 
      item: senderItem.current?.value || "",
      quantity: parseInt(quantityy, 10) || 1, 
      price: parseFloat(pricee) || 0.0, 
      status: "BOOKED",
      userId: userIdd
    };
    
    console.log("Sending Data:", JSON.stringify(courierData, null, 2)); 
  
    fetch("http://localhost:7575/api/courier/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courierData),
    })
      .then((response) => response.text()) 
      .then((text) => {
        try {
          const data = JSON.parse(text); 
          console.log("Server Response:", data);

          alert("Courier booked successfully!");
          navigate("/bill")
        } catch (error) {
          console.error("Invalid JSON response:", text);
          alert("Error: Server returned invalid JSON.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      });
      localStorage.setItem("senderName", courierData.senderName);
      localStorage.setItem("quantity", courierData.quantity);
      localStorage.setItem("price", courierData.price);
  }
  
  function handleReset() {
    setpricee("");
    setquantity("");
  }

  return (
    <div className="row courierbookrow">
      <div className="container ok">
        <div className="row" id="mirror">
          <h3 id="title">CUSTOMER REGISTRATION FORM</h3>
          <h4 id="title">CREATE PICKUP REQUEST</h4>
          <hr />
          <form id="cform">
            <table id="tabl" align="center" cellPadding={6}>
              <thead id="tablehead">
                <tr id="tablerow">
                  <th id="headcoloum" colSpan={2}>SENDER</th>
                  <th colSpan={2}>RECEIVER</th>
                </tr>
              </thead>
              <tbody id="tablebody">
                <tr className="tbodyrowss">
                  <td>Sender Name</td>
                  <td><input id="inputt" type="text" ref={senderName} required /></td>
                  <td>Receiver Name</td>
                  <td><input id="inputt" type="text" ref={receiverName} required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Sender Address</td>
                  <td><input id="inputt" type="text" ref={senderAddress} required /></td>
                  <td>Receiver Address</td>
                  <td><input id="inputt" type="text" ref={receiverAddress} required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Sender Pincode</td>
                  <td><input id="inputt" type="text" ref={senderPincode} required /></td>
                  <td>Receiver Pincode</td>
                  <td><input id="inputt" type="text" ref={receiverPincode} required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Sender Mobile No</td>
                  <td><input id="inputt" type="text" ref={senderMobileNo} required /></td>
                  <td>Receiver Mobile No</td>
                  <td><input id="inputt" type="text" ref={receiverMobileNo} required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Sender Email</td>
                  <td><input id="inputt" type="email" ref={senderEmail} required /></td>
                  <td>Receiver Email</td>
                  <td><input id="inputt" type="email" ref={receiverEmail} required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Sender City</td>
                  <td><input id="inputt" type="text" ref={senderCity} required /></td>
                  <td>Receiver City</td>
                  <td><input id="inputt" type="text" ref={receiverCity} required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Distance</td>
                  <td>
                    <select id="inputt" ref={kelometer}>
                      <option value="10">1-10km</option>
                      <option value="20">11-20km</option>
                      <option value="30">21-30km</option>
                      <option value="40">31-40km</option>
                      <option value="50">41-50km</option>
                    </select>
                  </td>
                  <td>Item</td>
                  <td><input ref={senderItem} id="inputt" type="text" required /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td>Enter Quantity</td>
                  <td><input id="inputt" type="Number" ref={quantity} required /></td>
                  <td>Price</td>
                  <td><input id="inputt" type="Number" value={pricee} readOnly /></td>
                </tr>
                <tr className="tbodyrowss">
                  <td colSpan={4}>
                    <button id="lastrow" type="button" onClick={calculatePrice}>
                      Calculate Price
                    </button>
                  </td>
                </tr>
                <tr className="tbodyrowss">
                  <td colSpan={2}>
                    <button id="lastbtn1" type="button" onClick={submitForm}>
                      Submit
                    </button>
                  </td>
                  <td colSpan={2}>
                    <button id="lastbtn2" type="reset" onClick={handleReset}>
                      Reset
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}
