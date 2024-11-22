package com.bytepushers.family.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableJpaRepositories
@Configuration
public class SecurityConfig {

    // private final UserService userService;

    /*public SecurityConfig(UserService userService) {
        this.userService = userService;
    }*/

    /*@Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }*/


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .httpBasic(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults())
                .authorizeRequests()
                .expressionHandler(customWebSecurityExpressionHandler())
                .requestMatchers("/login", "/api/create-account", "/api/users/**")
                .permitAll()
                .requestMatchers("/api/family-trees/**", "/api/events")
                .hasRole("ADMIN")
                .anyRequest().authenticated().and().build();
                /*.authorizeHttpRequests(registry -> {
                    registry.requestMatchers(
                                    "/login",
                                    "/api/create-account",
                                    "/api/users/**",
                                    "/api/family-tree/**",
                                    "/api-docs",
                                    "/api-docs/**",
                                    "/swagger-resources",
                                    "/swagger-resources/**",
                                    "/swagger-ui/**",
                                    "/webjars/**",
                                    "swagger-ui.html"
                                    )
                            .permitAll();
                    registry.anyRequest().authenticated();  // Make sure this is the last matcher
                })*/
                /*.httpBasic(withDefaults())
                .build();*/
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance(); // new BCryptPasswordEncoder();
    }

    /*@Bean
    UserDetailsService userDetailsService() {
        var user = User.withUsername("john").password("12345").authorities("read").build();
        return new InMemoryUserDetailsManager(user);
    }*/

    @Bean
    public RoleHierarchy roleHierarchy() {
        RoleHierarchyImpl roleHierarchy = new RoleHierarchyImpl();
        String hierarchy = "ROLE_ADMIN > ROLE_STAFF \n ROLE_STAFF > ROLE_USER";
        roleHierarchy.setHierarchy(hierarchy);
        return roleHierarchy;
    }

    @Bean
    public DefaultWebSecurityExpressionHandler customWebSecurityExpressionHandler() {
        DefaultWebSecurityExpressionHandler expressionHandler = new DefaultWebSecurityExpressionHandler();
        expressionHandler.setRoleHierarchy(roleHierarchy());
        return expressionHandler;
    }
}