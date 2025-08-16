package CourierServices.repository;

import CourierServices.entity.Tracking;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackingRepository extends JpaRepository<Tracking, Long> {
	Optional<Tracking> findByTrackingId(String trackingId);
}
