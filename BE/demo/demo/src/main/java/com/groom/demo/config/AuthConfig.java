package com.groom.demo.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
@EnableConfigurationProperties
@ConfigurationProperties(prefix = "auth")
@Getter
@Setter
// application.yml을 읽기 위한 클래스
// Credentials = application.yml의 id와 secret을 의미한다.
public class AuthConfig {
    private String emailId;
    private String emailPw;
    private String phone;
    private String serverUrl;
    private String redirectUrl;
    private Map<String, Credentials> credentials;
    private String coolsmsapikey;
    private String coolsmssecretkey;
}