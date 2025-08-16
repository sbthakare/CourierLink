package CourierServices.service;

import CourierServices.entity.Employee;
import CourierServices.exception.UserAlredyExistException;
import CourierServices.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Collection<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee registerEmployee(Employee employee) {
        if (employeeRepository.findByEmail(employee.getEmail()).isPresent()) {
            throw new UserAlredyExistException("Employee already exists with this Email");
        }
        employee.setPassword(passwordEncoder.encode(employee.getPassword()));
        return employeeRepository.save(employee);
    }

    public Employee getById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Employee not found"));
    }

    public Employee updateEmployee(Long id, Employee employee) {
        return employeeRepository.findById(id).map(existingEmployee -> {
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setName(employee.getName());
            existingEmployee.setMobileNo(employee.getMobileNo());
            existingEmployee.setAddress(employee.getAddress());
            return employeeRepository.save(existingEmployee);
        }).orElseThrow(() -> new EntityNotFoundException("Employee not found with ID: " + id));
    }

    public boolean authenticateEmployee(String email, String password) {
        return employeeRepository.findByEmail(email)
                .map(employee -> passwordEncoder.matches(password, employee.getPassword()))
                .orElse(false);
    }

    public Optional<Employee> findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
