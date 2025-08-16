package CourierServices.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_Id")
    private Integer adminId;

    @Column(name = "admin_Name", length = 40)
    private String adminName;

    @Column(nullable = false, unique = true, name = "admin_Email", length = 40)
    private String adminEmail;

    @Column(name = "admin_Password")
    private String adminPassword;

    @Column(nullable = false, unique = true, name = "admin_MobileNo", length = 40)
    private String adminMobileNo;

    @Column(name = "admin_Address", length = 40)
    private String adminAddress;

    public Admin() {}

    public Admin(Integer adminId, String adminName, String adminEmail, String adminPassword, String adminMobileNo, String adminAddress) {
        this.adminId = adminId;
        this.adminName = adminName;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
        this.adminMobileNo = adminMobileNo;
        this.adminAddress = adminAddress;
    }

    public Integer getAdminId() { return adminId; }
    public void setAdminId(Integer adminId) { this.adminId = adminId; }

    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }

    public String getAdminEmail() { return adminEmail; }
    public void setAdminEmail(String adminEmail) { this.adminEmail = adminEmail; }

    public String getAdminPassword() { return adminPassword; }
    public void setAdminPassword(String adminPassword) { this.adminPassword = adminPassword; }

    public String getAdminMobileNo() { return adminMobileNo; }
    public void setAdminMobileNo(String adminMobileNo) { this.adminMobileNo = adminMobileNo; }

    public String getAdminAddress() { return adminAddress; }
    public void setAdminAddress(String adminAddress) { this.adminAddress = adminAddress; }

    @Override
    public String toString() {
        return "Admin [adminId=" + adminId + ", adminName=" + adminName + ", adminEmail=" + adminEmail
                + ", adminPassword=" + adminPassword + ", adminMobileNo=" + adminMobileNo + ", adminAddress="
                + adminAddress + "]";
    }
}

