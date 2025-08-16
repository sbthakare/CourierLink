package CourierServices.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import CourierServices.entity.Admin;
import CourierServices.exception.UserAlredyExistException;
import CourierServices.repository.AdminRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Collection<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }

    public Admin registerAdmin(Admin admin) {
        if (admin.getAdminPassword() == null || admin.getAdminPassword().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        String encodedPassword = passwordEncoder.encode(admin.getAdminPassword());
        admin.setAdminPassword(encodedPassword);
       return adminRepo.save(admin);
    }

    public Admin getById(Integer id) {
        return adminRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Admin not found"));
    }

    public Admin updateAdmin(Integer id, Admin admin) {
        Admin existingAdmin = adminRepo.findById(id).orElse(null);
        if (existingAdmin != null) {
            existingAdmin.setAdminEmail(admin.getAdminEmail());
            existingAdmin.setAdminName(admin.getAdminName());
            existingAdmin.setAdminMobileNo(admin.getAdminMobileNo());
            existingAdmin.setAdminAddress(admin.getAdminAddress());
        }
        return adminRepo.save(existingAdmin);
    }

    public boolean authenticateAdmin(String email, String password) {
        return adminRepo.findByAdminEmail(email)
                .map(admin -> passwordEncoder.matches(password, admin.getAdminPassword()))
                .orElse(false);
    }

    public Optional<Admin> findByEmail(String email) {
        return adminRepo.findByAdminEmail(email);
    }
}
