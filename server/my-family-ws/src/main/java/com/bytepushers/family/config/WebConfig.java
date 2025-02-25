package com.bytepushers.family.config;

import com.bytepushers.family.model.ApiVersionInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for setting up web-related configurations for the application.
 * This class implements the {@link WebMvcConfigurer} interface to customize the Spring MVC configuration.
 * <p>
 * Specifically, this class registers an {@link ApiVersionInterceptor} to handle requests to endpoints
 * matching the pattern "/api/**". The interceptor is responsible for managing API versioning logic.
 * </p>
 *
 * @author Adish Timalsina
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private ApiVersionInterceptor apiVersionInterceptor;

    /**
     * Constructor for initializing {@link WebConfig} with an {@link ApiVersionInterceptor}.
     *
     * @param apiVersionInterceptor the {@link ApiVersionInterceptor} instance to handle API versioning
     */
    public WebConfig(ApiVersionInterceptor apiVersionInterceptor) {
        this.apiVersionInterceptor = apiVersionInterceptor;
    }

    /**
     * Adds custom interceptors to the Spring MVC configuration. In this case, it adds the {@link ApiVersionInterceptor}
     * to intercept requests to all paths starting with "/api/**".
     *
     * @param registry the {@link InterceptorRegistry} to which the interceptor is added
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(apiVersionInterceptor).addPathPatterns("/api/**");
    }
}
