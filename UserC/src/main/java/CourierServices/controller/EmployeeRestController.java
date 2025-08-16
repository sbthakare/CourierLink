package CourierServices.controller;

import CourierServices.entity.Employee;
import CourierServices.exception.UserAlredyExistException;
import CourierServices.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeRestController {

	private final EmployeeService employeeService;

	public EmployeeRestController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@GetMapping("/getEmployees")
	public ResponseEntity<Collection<Employee>> getAllEmployees() {
		return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {
		try {
			Employee newEmployee = employeeService.registerEmployee(employee);
			return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
		} catch (UserAlredyExistException ex) {
			return new ResponseEntity<>(Map.of("message", "Employee already exists!"), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Employee employee) {
		Optional<Employee> existingEmployee = employeeService.findByEmail(employee.getEmail());

		if (existingEmployee.isPresent()
				&& employeeService.authenticateEmployee(employee.getEmail(), employee.getPassword())) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "Login successful");
			response.put("id", existingEmployee.get().getId().toString());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/update/{id}")
	public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee employee) {
		Employee updatedEmployee = employeeService.updateEmployee(id, employee);
		return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<Employee> getById(@PathVariable Long id) {
		return new ResponseEntity<>(employeeService.getById(id), HttpStatus.OK);
	}
}
