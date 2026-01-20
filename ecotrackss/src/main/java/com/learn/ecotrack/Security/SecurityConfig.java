package com.learn.ecotrack.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.learn.ecotrack.Security.jwt.AuthEntryPointJwt;
import com.learn.ecotrack.Security.jwt.AuthTokenFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Autowired
    private AuthTokenFilter authTokenFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("http://localhost:5173");
                config.addAllowedHeader("*");
                config.addAllowedMethod("*");
                return config;
            }))
            .exceptionHandling(ex ->
                ex.authenticationEntryPoint(authEntryPointJwt)
            )
            .authorizeHttpRequests(auth -> auth

                // ✅ Preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ PUBLIC APIs
                .requestMatchers("/auth/login", "/users/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/workshops/**").permitAll()
                .requestMatchers("/enroll/confirm").permitAll()

                // 👤 USER (Logged-in)
                .requestMatchers("/enroll/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/request/**").hasAnyRole("USER", "ADMIN")

                // 🔐 ADMIN ONLY
                .requestMatchers(HttpMethod.POST, "/workshops").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/workshops/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/workshops/**").hasRole("ADMIN")

                .anyRequest().authenticated()
            );

        http.addFilterBefore(
            authTokenFilter,
            UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
