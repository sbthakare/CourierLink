package CourierServices.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import CourierServices.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

	Optional<Admin> findByAdminEmail(String email);

}
