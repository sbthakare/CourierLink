package CourierServices.service;

import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import CourierServices.entity.User;
import CourierServices.exception.UserAlredyExistException;
import CourierServices.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Collection<User> getAllUsers() {
        return userRepo.findAll();
    }

    public User RegisterUser(User user) {
        if (userRepo.findByUserEmail(user.getUserEmail()).isPresent()) {
            throw new UserAlredyExistException("User already exists! with this Email");
        }
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        return userRepo.save(user);
    }

    public User getbyid(Integer id) {
        return userRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public User UpdateUser(Integer id, User user) {
        User existingUser = userRepo.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setUserEmail(user.getUserEmail());
            existingUser.setUserName(user.getUserName());
            existingUser.setUserMobileNo(user.getUserMobileNo());
            existingUser.setUserAddress(user.getUserAddress());
        }
        return userRepo.save(existingUser);
    }

    public boolean authenticateUser(String email, String password) {
        return userRepo.findByUserEmail(email)
                .map(user -> passwordEncoder.matches(password, user.getUserPassword()))
                .orElse(false);
    }

    public Optional<User> FindByEmail(String email) {
        return userRepo.findByUserEmail(email);
    }
}

