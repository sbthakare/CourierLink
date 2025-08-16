package CourierServices.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import CourierServices.entity.Courier;
import CourierServices.entity.Employee;
import CourierServices.entity.Tracking;
import CourierServices.repository.CourierRepository;
import CourierServices.repository.EmployeeRepository;
import CourierServices.repository.TrackingRepository;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourierService {
	private final CourierRepository courierRepo;
	private final EmployeeRepository employeeRepo;
	private final TrackingRepository trackingRepo;

	@Autowired
	public CourierService(CourierRepository courierRepo, EmployeeRepository employeeRepo,
			TrackingRepository trackingRepo) {
		this.courierRepo = courierRepo;
		this.employeeRepo = employeeRepo;
		this.trackingRepo = trackingRepo;

	}
	
	public List<Courier> getCompletedOrders() {
        return courierRepo.findByStatus("Delivered"); // Fetch completed orders
    }
	
	public List<Courier> getPendingOrders() {
        return courierRepo.findByStatus("Pending"); // Fetch pending orders
    }

	@Transactional
	public Courier bookCourier(Courier courier) {

		String generatedTrackingId = "TRK-" + UUID.randomUUID().toString().substring(0, 8);
		courier.setTrackingId(generatedTrackingId);

		List<Employee> employees = employeeRepo.findAll();
		if (employees.isEmpty()) {
			throw new RuntimeException("No employees available for assignment");
		}

		Employee assignedEmployee = employees.stream()
				.min(Comparator.comparingInt(e -> e.getAssignedDeliveries().size()))
				.orElseThrow(() -> new RuntimeException("Unable to find an employee"));

		courier.assignEmployee(assignedEmployee);

		Tracking tracking = new Tracking(courier, "Warehouse");
		courier.setTracking(tracking);
		return courierRepo.save(courier);
	}

	public Optional<Courier> trackCourier(String trackingId) {
		return courierRepo.findByTrackingId(trackingId);
	}

	@Transactional
	public void updateCourierLocation(Long courierId, String newLocation) {
		Courier courier = courierRepo.findById(courierId)
				.orElseThrow(() -> new RuntimeException("Courier not found with ID: " + courierId));

		Tracking tracking = Optional.ofNullable(courier.getTracking())
				.orElseThrow(() -> new RuntimeException("Tracking details not found for Courier ID: " + courierId));

		tracking.setCurrentLocation(newLocation);
		trackingRepo.save(tracking);
	}
}
