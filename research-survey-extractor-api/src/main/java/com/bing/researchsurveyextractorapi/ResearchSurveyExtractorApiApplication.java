package com.bing.researchsurveyextractorapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ResearchSurveyExtractorApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResearchSurveyExtractorApiApplication.class, args);
	}

}
