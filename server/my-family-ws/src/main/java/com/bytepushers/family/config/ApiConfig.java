package com.bytepushers.family.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;



@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "byte-pushers"
                ),
                description = "Api documentation of my family app",
                title = "my family app",
                version = "1.0.0"
        ),
        servers = @Server(
                description = "localhost",
                url = "http://localhost:8090"
        ),
        security = {
                @SecurityRequirement(
                        name = "X-API-Version"
                )
        }
)

@SecurityScheme(
        name = "X-API-Version",
        type = SecuritySchemeType.APIKEY,
        in = SecuritySchemeIn.HEADER,
        paramName = "X-API-Version"
)


public class ApiConfig {

}
