package CourierServices.UserC;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig  {

	 @Bean
	    public WebMvcConfigurer corsConfigurer() {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**") // ✅ Apply CORS to API routes
	                        .allowedOriginPatterns("http://localhost:3000") // ✅ Use allowedOriginPatterns instead of allowedOrigins
	                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // ✅ Allow these HTTP methods
	                        .allowedHeaders("*") // ✅ Allow all headers
	                        .allowCredentials(true); // ✅ Allow credentials (cookies, authentication headers)
	           
	            
	                registry.addMapping("/api/**")
                    .allowedOriginPatterns("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
	            }
	        };
	    }
}
