package com.bing.researchsurveyextractorapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import static com.bing.researchsurveyextractorapi.util.CommonConstants.WILDCARD;

@Configuration
public class SwaggerConfig {

    private static final String BASE_PACKAGE_NAME = "com.bing.researchsurveyextractorapi";
    private static final String API_V1 = "/api/v1";
    @Bean
    public Docket apiV1() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfoV1())
                .groupName("API_V1")
                .select()
                .apis(RequestHandlerSelectors.basePackage(BASE_PACKAGE_NAME))
                .paths(PathSelectors.regex(API_V1 + WILDCARD))
                .build();
    }

    private ApiInfo apiInfoV1() {
        return new ApiInfoBuilder()
                .title("Scientific Research Survey Extractor Automation Tool REST API v1")
                .description("REST APIs for interacting with research survey extractor automation tool")
                .build();
    }
}
