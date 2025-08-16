package CourierServices.UserC;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"CourierServices","couriertracking"})
@EnableJpaRepositories(basePackages={"CourierServices","couriertracking"})
@EntityScan(basePackages = {"CourierServices","couriertracking"})
public class UserCApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserCApplication.class, args);
		System.out.println("Application started...");
	}

}
