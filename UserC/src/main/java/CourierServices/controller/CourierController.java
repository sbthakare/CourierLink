package CourierServices.controller;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import CourierServices.entity.Courier;
import CourierServices.service.CourierService;




@RestController
@RequestMapping("/api/courier")
@CrossOrigin(origins = "http://localhost:3000")
public class CourierController {
	private final CourierService courierService;

	@Autowired
	public CourierController(CourierService courierService) {
		this.courierService = courierService;
	}

	@PostMapping("/book")
	public ResponseEntity<?> bookCourier(@RequestBody Courier courier) {
		try {
			System.out.println("Received request: " + courier);

			if (courier.getReceiverContactNo() == null || courier.getReceiverContactNo().isEmpty()) {
				return ResponseEntity.badRequest().body(null);
			}

			if (courier.getBookingDate() == null) {
				courier.setBookingDate(LocalDateTime.now());
			}
			courier.setDestination(courier.getReceiverCity());

			Courier bookedCourier = courierService.bookCourier(courier);
			return ResponseEntity.ok(bookedCourier);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
		}
	}

	@GetMapping("/completedOrders")
	public ResponseEntity<List<Courier>> getCompletedOrders() {
	    List<Courier> completedOrders = courierService.getCompletedOrders();
	    return ResponseEntity.ok(completedOrders);
	}
	
	@GetMapping("/pendingOrders")
	public ResponseEntity<List<Courier>> getPendingOrders() {
	    List<Courier> pendingOrders = courierService.getPendingOrders();
	    return ResponseEntity.ok(pendingOrders);
	}
	
	@GetMapping("/track/{trackingId}")
	public ResponseEntity<Courier> trackCourier(@PathVariable String trackingId) {
		return courierService.trackCourier(trackingId).map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PutMapping("/update-location/{courierId}")
	public ResponseEntity<String> updateCourierLocation(@PathVariable Long courierId,
			@RequestParam String newLocation) {
		courierService.updateCourierLocation(courierId, newLocation);
		return ResponseEntity.ok("Location Updated Successfully!");
	}
}
