package com.bytepushers.family.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;


/**
 * Configuration class for setting up API documentation using OpenAPI annotations.
 * <p>
 * This class defines the general metadata for the API, including the title, version,
 * description, and contact details. It also sets up the security scheme for the API,
 * where an API key (X-API-Version) is required in the request header for access.
 * </p>
 *
 * @author Adish Timalsina
 */
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
