package CourierServices.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_Id")
	private Integer userId;

	@Column(name = "user_Name", length = 40)
	private String userName;

	@Column(nullable = false, unique = true, name = "user_Email", length = 40)
	private String userEmail;

	@Column(name = "user_password")
	private String userPassword;

	@Column(nullable = false, unique = true, name = "user_MobileNo", length = 40)
	private String userMobileNo;

	@Column(name = "user_Address", length = 40)
	private String userAddress;

	public User() {
	}

	public User(Integer userId, String userName, String userEmail, String userPassword, String userMobileNo,
			String userAddress) {
		this.userId = userId;
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.userMobileNo = userMobileNo;
		this.userAddress = userAddress;

	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserMobileNo() {
		return userMobileNo;
	}

	public void setUserMobileNo(String userMobileNo) {
		this.userMobileNo = userMobileNo;
	}

	public String getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(String userAddress) {
		this.userAddress = userAddress;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", userEmail=" + userEmail + ", userPassword="
				+ userPassword + ", userMobileNo=" + userMobileNo + ", userAddress=" + userAddress + "]";
	}
}
