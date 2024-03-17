package com.groom.demo.auth;

import com.groom.demo.config.AuthConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Constants {

    // 회원가입 전이라 Token값이 없어서 일부러 보안을 풀어둔 링크들 모음
    public static final String[] SECURITY_HTTP_EXCLUDE_URIS = {"/jamong/member/access-token", "/jamong/member/signup",
            "/jamong/member/signup/phone", "/jamong/member/login/callback/**", "/jamong/member/search", "/jamong/member/idcheck",
            "/jamong/member/login", "/jamong/member/idfind", "/jamong/member/pwfind",
            "/jamong/member/login/**", "/jamong/resources/**", "/jamong/swagger*/**", "favicon.ico",
            "/jamong/webjars/**", "/jamong/swagger-ui/**",
            "/jamong/v3/api-docs/**", "/jamong/swagger-ui/**", "/jamong/swagger-resources/**"};

    //Authorization == JWT 사용을 위함  
    // 해더에서 허용할 부분 설정 
    // CORS =  서버가 다른 origin의 브라우저에게 자신의 자원이 로드될 수 있도록 헤더에 표시해주는 방법
    public static final String[] CORS_HEADER_URIS = {"Authorization", "Refresh", "content-type"};


    public static final String FIRST_OAUTH2_URL = "/member/login";
    public static final String SECOND_OAUTH2_AFTER_SPRING_LOGIN_URL = "/member/login/callback/*";
    public static String SERVER_URL;
    public static String FRONT_REDIRECT_URL;


    @Autowired
    public void setDefaultRedirectUrl(AuthConfig authConfig) {
        FRONT_REDIRECT_URL = authConfig.getRedirectUrl();  //frontend에서 받을 곳
    }

    @Autowired
    public void setServerUrl(AuthConfig authConfig) {
        SERVER_URL = authConfig.getServerUrl();
    }

}