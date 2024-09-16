package com.seeder.apigateway.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RouteValidator {
    public static final List<String> openApiEndpoints = List.of(
            "/users/**",
            "/eureka"
    );

    public boolean isSecured(ServerHttpRequest request) {
        return openApiEndpoints.stream()
                .noneMatch(url -> request.getURI().getPath().contains(url));
    }

}