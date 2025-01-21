package com.bytepushers.family.service;

import com.bytepushers.family.config.ApiConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ApiService {

    private final ApiConfig apiConfig;

    public ApiService(ApiConfig apiConfig) {
        this.apiConfig = apiConfig;
    }

    public String getStripeApiKey(){
        return apiConfig.getApiKey();
    }
}
