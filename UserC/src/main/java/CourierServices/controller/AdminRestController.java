package CourierServices.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import CourierServices.entity.Admin;
import CourierServices.exception.UserAlredyExistException;
import CourierServices.service.AdminService;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminRestController {

	private final AdminService adminService;

	public AdminRestController(AdminService adminService) {
		this.adminService = adminService;
	}

	@GetMapping("/getAdmins")
	public ResponseEntity<Collection<Admin>> getAllAdmins() {
		return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.OK);
	}

	@PostMapping("/addAdmin")
	public ResponseEntity<?> addAdmin(@RequestBody Admin admin) {
		try {
			Admin newAdmin = adminService.registerAdmin(admin);
			return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
		} catch (UserAlredyExistException ex) {
			return new ResponseEntity<>(Map.of("message", "Admin already exists!"), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Admin admin) {
		Optional<Admin> existingAdmin = adminService.findByEmail(admin.getAdminEmail());

		if (existingAdmin.isPresent()
				&& adminService.authenticateAdmin(admin.getAdminEmail(), admin.getAdminPassword())) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "Login successful");
			response.put("id", existingAdmin.get().getAdminId().toString());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/update/{id}")
	public ResponseEntity<Admin> update(@PathVariable Integer id, @RequestBody Admin admin) {
		Admin updatedAdmin = adminService.updateAdmin(id, admin);
		return new ResponseEntity<>(updatedAdmin, HttpStatus.OK);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<Admin> getById(@PathVariable Integer id) {
		return new ResponseEntity<>(adminService.getById(id), HttpStatus.OK);
	}
}
