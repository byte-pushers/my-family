package com.bytepushers.family.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@ComponentScan(basePackages = "com.bytepushers.family")
@EnableJpaRepositories("com.bytepushers.family.repo")
public class SpringDataConfig {

}
