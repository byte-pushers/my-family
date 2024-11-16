package com.bytepushers.family.model;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class ApiVersionInterceptor implements HandlerInterceptor {

    private static final String[] Allowed_Versions = {"1.0.0"};

    //if header version matches return true else return false
    private boolean allwedVersion(String version) {
        for (String allowed_version : Allowed_Versions) {
            if (version.equals(allowed_version)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String apiVersion = request.getHeader("X-API-Version");

        if(apiVersion == null || !allwedVersion(apiVersion)) {
           throw new IllegalArgumentException("X-API-Version " + apiVersion + " is not allowed");
        }
        return true;
    }
}
