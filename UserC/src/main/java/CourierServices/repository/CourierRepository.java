package CourierServices.repository;

import CourierServices.entity.Courier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CourierRepository extends JpaRepository<Courier, Long> {
	Optional<Courier> findByTrackingId(String trackingId);
	
	List<Courier> findByStatus(String status);
}
