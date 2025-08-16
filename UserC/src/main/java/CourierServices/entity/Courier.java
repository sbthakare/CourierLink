package CourierServices.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "couriers")
public class Courier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String senderName;

	@Column(nullable = true)
	private String senderAddress;

	@Column(nullable = true)
	private String senderPincode;

	@Column(nullable = true)
	private String senderContactNo;

	@Column(nullable = true)
	private String senderEmail;

	@Column(nullable = true)
	private String senderCity;

	@Column(nullable = true)
	private String receiverName;

	@Column(nullable = true)
	private String receiverAddress;

	@Column(nullable = true)
	private String receiverPincode;

	@Column(nullable = true)
	private String receiverContactNo;

	@Column(nullable = true)
	private String receiverEmail;

	@Column(nullable = true)
	private String receiverCity;

	@Column(nullable = true)
	private String item;

	@Column(nullable = true)
	private int distance;

	@Column(nullable = true)
	private int quantity;

	@Column(nullable = true)
	private double price;

	@Column(nullable = true)
	private String destination;

	@Column(nullable = true)
	private String status = "Pending"; // Default status

	@Column(unique = true, nullable = true)
	private String trackingId;

	@Column(nullable = true)
	private LocalDateTime bookingDate = LocalDateTime.now();

	@ManyToOne
	@JoinColumn(name = "employee_id", referencedColumnName = "id")
	@JsonBackReference
	private Employee assignedEmployee;

	@OneToOne(mappedBy = "courier", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private Tracking tracking;

	public Courier() {
	}

	public Courier(String senderName, String senderAddress, String senderPincode, String senderContactNo,
			String senderEmail, String senderCity, String receiverName, String receiverAddress, String receiverPincode,
			String receiverContactNo, String receiverEmail, String receiverCity, String item, int distance,
			int quantity, double price, String trackingId, String destination) {
		this.senderName = senderName;
		this.senderAddress = senderAddress;
		this.senderPincode = senderPincode;
		this.senderContactNo = senderContactNo;
		this.senderEmail = senderEmail;
		this.senderCity = senderCity;
		this.receiverName = receiverName;
		this.receiverAddress = receiverAddress;
		this.receiverPincode = receiverPincode;
		this.receiverContactNo = receiverContactNo;
		this.receiverEmail = receiverEmail;
		this.receiverCity = receiverCity;
		this.item = item;
		this.distance = distance;
		this.quantity = quantity;
		this.price = price;
		this.trackingId = trackingId;
		this.destination = destination;
		this.bookingDate = LocalDateTime.now();

	}

	public void assignEmployee(Employee employee) {
		this.assignedEmployee = employee;
	}

	public void setTracking(Tracking tracking) {
		this.tracking = tracking;
		tracking.setCourier(this);
		tracking.setTrackingId(this.trackingId);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSenderAddress() {
		return senderAddress;
	}

	public void setSenderAddress(String senderAddress) {
		this.senderAddress = senderAddress;
	}

	public String getSenderPincode() {
		return senderPincode;
	}

	public void setSenderPincode(String senderPincode) {
		this.senderPincode = senderPincode;
	}

	public String getSenderContactNo() {
		return senderContactNo;
	}

	public void setSenderContactNo(String senderContactNo) {
		this.senderContactNo = senderContactNo;
	}

	public String getSenderEmail() {
		return senderEmail;
	}

	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}

	public String getSenderCity() {
		return senderCity;
	}

	public void setSenderCity(String senderCity) {
		this.senderCity = senderCity;
	}

	public String getReceiverName() {
		return receiverName;
	}

	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}

	public String getReceiverAddress() {
		return receiverAddress;
	}

	public void setReceiverAddress(String receiverAddress) {
		this.receiverAddress = receiverAddress;
	}

	public String getReceiverPincode() {
		return receiverPincode;
	}

	public void setReceiverPincode(String receiverPincode) {
		this.receiverPincode = receiverPincode;
	}

	public String getReceiverContactNo() {
		return receiverContactNo;
	}

	public void setReceiverContactNo(String receiverContactNo) {
		this.receiverContactNo = receiverContactNo;
	}

	public String getReceiverEmail() {
		return receiverEmail;
	}

	public void setReceiverEmail(String receiverEmail) {
		this.receiverEmail = receiverEmail;
	}

	public String getReceiverCity() {
		return receiverCity;
	}

	public void setReceiverCity(String receiverCity) {
		this.receiverCity = receiverCity;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTrackingId() {
		return trackingId;
	}

	public void setTrackingId(String trackingId) {
		this.trackingId = trackingId;
		if (this.tracking != null) {
			this.tracking.setTrackingId(trackingId);
		}
	}

	public LocalDateTime getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDateTime bookingDate) {
		this.bookingDate = bookingDate;
	}

	public Employee getAssignedEmployee() {
		return assignedEmployee;
	}

	public void setAssignedEmployee(Employee assignedEmployee) {
		this.assignedEmployee = assignedEmployee;
	}

	public Tracking getTracking() {
		return tracking;
	}

	@Override
	public String toString() {
		return "Courier [id=" + id + ", senderName=" + senderName + ", senderAddress=" + senderAddress
				+ ", senderPincode=" + senderPincode + ", senderContactNo=" + senderContactNo + ", senderEmail="
				+ senderEmail + ", senderCity=" + senderCity + ", receiverName=" + receiverName + ", receiverAddress="
				+ receiverAddress + ", receiverPincode=" + receiverPincode + ", receiverContactNo=" + receiverContactNo
				+ ", receiverEmail=" + receiverEmail + ", receiverCity=" + receiverCity + ", item=" + item
				+ ", distance=" + distance + ", quantity=" + quantity + ", price=" + price + ", destination="
				+ destination + ", status=" + status + ", trackingId=" + trackingId + ", bookingDate=" + bookingDate
				+ ", assignedEmployee=" + assignedEmployee + ", tracking=" + tracking + "]";
	}

}
