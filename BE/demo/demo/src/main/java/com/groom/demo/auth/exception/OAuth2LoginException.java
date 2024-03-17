package com.groom.demo.auth.exception;

import com.groom.demo.auth.oauth.CustomOAuth2User;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;


public class OAuth2LoginException extends OAuth2AuthenticationException {

    private CustomOAuth2User customOAuth2User;

    public OAuth2LoginException(HttpStatus httpStatus, CustomOAuth2User customOAuth2User) {
        super(String.valueOf(httpStatus));
        this.customOAuth2User = customOAuth2User;
    }

    public CustomOAuth2User getCustomOAuth2User() {
        return customOAuth2User;
    }
}

