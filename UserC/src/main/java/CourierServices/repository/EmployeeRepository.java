package CourierServices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import CourierServices.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Optional<Employee> findByEmail(String email);

	Optional<Employee> findByMobileNo(String mobileNo);

	Employee findTopByOrderByIdAsc();
}
