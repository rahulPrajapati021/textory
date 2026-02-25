package com.pranton.blog.config;

import java.io.IOException;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
public class UserProfileResource implements WebMvcConfigurer{
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/media/profile/**")
        .addResourceLocations("file:uploads/profile/")
        .setCachePeriod(3600)
        .resourceChain(true)
        .addResolver(new PathResourceResolver() {
            
            @Override
            protected Resource getResource(String resourcePath, Resource location) throws IOException {
                Resource requested = location.createRelative(resourcePath);
                if(requested.exists() && requested.isReadable()) {
                    return requested;
                }

                return location.createRelative("default-user.png");
            }
    });
    }
}
