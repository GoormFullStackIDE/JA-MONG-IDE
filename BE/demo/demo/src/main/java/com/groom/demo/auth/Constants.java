package com.groom.demo.auth;

import com.groom.demo.config.AuthConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Constants {

//    public static final String[] SECURITY_WEB_EXCLUDE_URIS = {"/resources/**", "/csrf", "/error", "/swagger*/**", "favicon.ico", "/webjars/**", "/swagger-ui/**"};

    public static final String[] SECURITY_HTTP_EXCLUDE_URIS = {"/jamong/member/access-token", "/jamong/member/login/**",  "/jamong/resources/**", "/jamong/swagger*/**", "favicon.ico", "/jamong/webjars/**", "/jamong/swagger-ui/**", "/jamong/v3/api-docs/**", "/jamong/swagger-ui/**", "/jamong/swagger-resources/**"};

    //Authorization == JWT 사용을 위함  // 해더에서 허용할 부분 설정 // CORS =  서버가 다른 origin의 브라우저에게 자신의 자원이 로드될 수 있도록 헤더에 표시해주는 방법
    public static final String[] CORS_HEADER_URIS = {"Authorization", "Refresh", "content-type"};


    public static final String SECURITY_LOGIN_PROCESSING_URI = "/member/login/callback/*";
    //소셜 로그인을 하기위해서, 프론트에서 /member/login/kakao, /member/login/naver,/member/login/google로 하면 됨
    public static final String BASE_URI = "/member/login";
    public static String DEFAULT_REDIRECT_URL;

    public static String SERVER_URL;

    @Autowired
    public void setDefaultRedirectUrl(AuthConfig authConfig){
        DEFAULT_REDIRECT_URL = authConfig.getServerUrl()+"/{registrationId}";   //frontend에서 받을 곳
    }

    @Autowired
    public void setServerUrl(AuthConfig authConfig){
        SERVER_URL = authConfig.getServerUrl();
    }

}