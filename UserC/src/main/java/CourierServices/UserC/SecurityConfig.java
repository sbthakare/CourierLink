package CourierServices.UserC;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
//upto here comment
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    
////	@Bean
////	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////	    http
////	        .cors() 
////	        .and()
////	        .csrf().disable() 
////	        .authorizeHttpRequests(auth -> auth
////	            .requestMatchers("/user/addUser", "/user/login", "/user/getUsers", "/employee/register", 
////	                             "/employee/login", "/admin/addAdmin", "/admin/login", 
////	                             "/user/get/{id}", "/api/courier/book", "/api/**")
////	            .permitAll()  
////	            .anyRequest().authenticated() 
////	        );
////
////	    return http.build();
//	@Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .cors().and()  // ✅ Enable CORS support in Spring Security
//            .csrf().disable()  // ✅ Disable CSRF protection (needed for POST requests)
//            .authorizeHttpRequests(auth -> auth
//                .requestMatchers(
//                    "/user/addUser", "/user/login", "/user/getUsers",
//                    "/employee/register", "/employee/login", 
//                    "/admin/addAdmin", "/admin/login",
//                    "/user/get/{id}", "/api/courier/book", "/api/**"
//                ).permitAll()  // ✅ Allow these endpoints without authentication
//                .anyRequest().authenticated()  // ✅ Protect all other endpoints
//            );
//
//        return http.build();
//	}
//
//}


//from here comment
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // Allow all endpoints without authentication
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}

