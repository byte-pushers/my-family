package com.bytepushers.family.model;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * The {@code ApiVersionInterceptor} is a Spring interceptor that validates
 * the API version from the HTTP request headers.
 *
 * <p>This interceptor checks if the request contains a valid API version
 * in the {@code X-API-Version} header. If the version is missing or not
 * allowed, an {@link IllegalArgumentException} is thrown.</p>
 *
 * <p>Currently, allowed API versions are defined in the {@code Allowed_Versions}
 * array.</p>
 *
 * <p>Author: Adish Timalsina</p>
 */
@Component
public class ApiVersionInterceptor implements HandlerInterceptor {

    /** Array of allowed API versions. */
    private static final String[] Allowed_Versions = {"1.0.0"};

    /**
     * Validates if the provided API version is allowed.
     *
     * @param version the API version to check.
     * @return {@code true} if the version is allowed, {@code false} otherwise.
     */
    private boolean allwedVersion(String version) {
        for (String allowed_version : Allowed_Versions) {
            if (version.equals(allowed_version)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Intercepts the HTTP request to validate the API version.
     *
     * <p>This method retrieves the {@code X-API-Version} header from the request.
     * If the version is missing or not allowed, an {@link IllegalArgumentException} is thrown.</p>
     *
     * @param request  the HTTP request being intercepted.
     * @param response the HTTP response.
     * @param handler  the chosen handler to execute, for type and/or instance examination.
     * @return {@code true} if the API version is valid, allowing further processing;
     *         {@code false} otherwise.
     * @throws IllegalArgumentException if the API version is not allowed.
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String apiVersion = request.getHeader("X-API-Version");

        if(apiVersion == null || !allwedVersion(apiVersion)) {
           throw new IllegalArgumentException("X-API-Version " + apiVersion + " is not allowed");
        }
        return true;
    }
}
