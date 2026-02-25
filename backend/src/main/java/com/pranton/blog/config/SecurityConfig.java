package com.pranton.blog.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.pranton.blog.entity.User;
import com.pranton.blog.repositories.UserRepository;
import com.pranton.blog.security.BlogUserDetailsService;
import com.pranton.blog.security.JwtAuthenticationFilter;
import com.pranton.blog.services.AuthenticationService;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class SecurityConfig {
    private JwtAuthEntryPoint jwtAuthEntryPoint;
    @Bean
    public BlogUserDetailsService userDetailsService(UserRepository userRepository) {
         BlogUserDetailsService blogUserDetailsService = new BlogUserDetailsService(userRepository);
         userRepository.findByEmail("test@email.com").orElseGet(() -> {
            User user = User.builder().name("test user").email("test@email.com").password(passwordEncoder().encode("password")).build();
            return userRepository.save(user);
         });
         return blogUserDetailsService;
    } 

    @Bean 
    public JwtAuthenticationFilter jwtAuthenticationFilter(AuthenticationService authenticationService) {
        return new JwtAuthenticationFilter(authenticationService);
    }


    @Bean
    public SecurityFilterChain security(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception {
        return http
        .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthEntryPoint))
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, "/api/v1/posts/drafts").authenticated()
            .requestMatchers(HttpMethod.GET, "/api/v1/posts/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/author/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/categories/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/tags/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/v1/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/v1/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/media/profile/**").permitAll()
            .requestMatchers("/docs/**", "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
            .anyRequest().authenticated())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedOrigins(List.of("http://localhost:5173", "https://textory.netlify.app"));
        cors.setAllowedMethods(List.of("GET", "PUT", "POST", "PATCH", "DELETE"));
        cors.setAllowCredentials(true);
        cors.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
