package com.mi.stream.guitar.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * resource config
 *
 * @author mi zxq
 * @date 2019/11/4 10:33
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    /**
     * choose override
     * {@link org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport}
     * or
     * {@link org.springframework.web.servlet.config.annotation.WebMvcConfigurer}
     * change configuration
     * override {@link org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport}
     * can cause auto configuration to fail
     *
     * @param registry {@link ResourceHandlerRegistry}
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        
        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations("classpath:/favicon.ico");
    }
}
