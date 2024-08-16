package com.capstone.bejingled;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.capstone.bejingled.filters.AuthFilter;

@SpringBootApplication
public class BejingledApplication {

	public static void main(String[] args) {
		SpringApplication.run(BejingledApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<AuthFilter> filterRegistrationBean() {
		FilterRegistrationBean<AuthFilter> registrationBean = new FilterRegistrationBean<>();
		AuthFilter authFilter = new AuthFilter();
		registrationBean.setFilter(authFilter);
		registrationBean.addUrlPatterns("/api/users/{id}/*", "/api/users/me", "/api/users/{id}");
		return registrationBean;
	}
	
}
