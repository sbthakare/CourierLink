package CourierServices.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import CourierServices.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUserEmail(String email);

}
