package CourierServices.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String mobileNo;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "assignedEmployee", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Courier> assignedDeliveries;
    
    public Employee() {

	}

	public Employee(Long id, String name, String email, String password, String mobileNo, String address,
			List<Courier> assignedDeliveries) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.mobileNo = mobileNo;
		this.address = address;
		this.assignedDeliveries = assignedDeliveries;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<Courier> getAssignedDeliveries() {
		return assignedDeliveries;
	}

	public void setAssignedDeliveries(List<Courier> assignedDeliveries) {
		this.assignedDeliveries = assignedDeliveries;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + ", mobileNo="
				+ mobileNo + ", address=" + address + ", assignedDeliveries=" + assignedDeliveries + "]";
	}
    
}
