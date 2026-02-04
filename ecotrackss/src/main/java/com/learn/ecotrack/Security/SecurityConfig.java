package com.learn.ecotrack.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
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
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;

    @Autowired
    private AuthTokenFilter authTokenFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // ❌ CSRF disabled (JWT based auth)
            .csrf(csrf -> csrf.disable())

            // 🌍 CORS config
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.addAllowedOrigin("http://localhost:5173");
                config.addAllowedHeader("*");
                config.addAllowedMethod("*");
                return config;
            }))

            // 🔐 Authorization rules
            .authorizeHttpRequests(auth -> auth

                // 🔓 Public APIs
                .requestMatchers(
                    "/auth/login",
                    "/auth/register",
                    "/users/**"
                ).permitAll()

                // 👤 USER + ADMIN
                .requestMatchers(
                    "/workshops/**",
                    "/enroll/**"
                ).hasAnyRole("USER", "ADMIN")

                // 👑 ADMIN only
                .requestMatchers(
                    "/payments/**",
                    "/recycle/**",
                    "/admin/**"
                ).hasRole("ADMIN")

                // 🔒 Everything else needs authentication
                .anyRequest().authenticated()
            )

            // ❗ Unauthorized handler
            .exceptionHandling(ex ->
                ex.authenticationEntryPoint(authEntryPointJwt)
            );

        // 🔁 JWT filter
        http.addFilterBefore(
            authTokenFilter,
            UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    // 🔑 Password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 🔐 Authentication manager
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
