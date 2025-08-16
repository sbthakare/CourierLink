package CourierServices.controller;

import CourierServices.entity.User;
import CourierServices.exception.UserAlredyExistException;
import CourierServices.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserRestController {

	private final UserService userService;

	public UserRestController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/getUsers")
	public ResponseEntity<Collection<User>> getAllUsers() {
		return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
	}

	@PostMapping("/addUser")
	public ResponseEntity<?> addUser(@RequestBody User user) {
		try {
			User newUser = userService.RegisterUser(user);
			return new ResponseEntity<>(newUser, HttpStatus.CREATED);
		} catch (UserAlredyExistException ex) {
			return new ResponseEntity<>(Map.of("message", "User already exists!"), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
		Optional<User> existingUser = userService.FindByEmail(user.getUserEmail());

		if (existingUser.isPresent() && userService.authenticateUser(user.getUserEmail(), user.getUserPassword())) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "Login successful");
			response.put("id", existingUser.get().getUserId().toString());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(Map.of("message", "Invalid email or password"), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("/update/{id}")
	public ResponseEntity<User> update(@PathVariable Integer id, @RequestBody User user) {
		User updatedUser = userService.UpdateUser(id, user);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

	@GetMapping("/get/{id}")
	public ResponseEntity<User> getById(@PathVariable Integer id) {
		return new ResponseEntity<>(userService.getbyid(id), HttpStatus.OK);
	}
}
