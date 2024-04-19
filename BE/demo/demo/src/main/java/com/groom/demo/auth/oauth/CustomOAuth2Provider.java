package com.groom.demo.auth.oauth;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistration.Builder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;

import static com.groom.demo.auth.Constants.SERVER_URL;

//import static com.groom.demo.auth.Constants.DEFAULT_REDIRECT_URL;


public enum CustomOAuth2Provider {

    KAKAO {
        @Override
        public Builder getBuilder(String registrationId) {
            Builder builder = getBuilder(registrationId,
                    ClientAuthenticationMethod.CLIENT_SECRET_POST, SERVER_URL.concat("/jamong/member/login/callback/{registrationId}"));
            builder.authorizationUri("https://kauth.kakao.com/oauth/authorize");
            builder.tokenUri("https://kauth.kakao.com/oauth/token");
            builder.userInfoUri("https://kapi.kakao.com/v2/user/me");
            builder.userNameAttributeName("id");
            builder.clientName("kakao");
            builder.scope("profile_nickname", "account_email");
            return builder;
        }

    },

    GOOGLE {
        @Override
        public Builder getBuilder(String registrationId) {
            ClientRegistration.Builder builder = getBuilder(registrationId,
                    ClientAuthenticationMethod.CLIENT_SECRET_BASIC, SERVER_URL.concat("/jamong/member/login/callback/{registrationId}"));
            builder.scope("profile", "email");
            builder.authorizationUri("https://accounts.google.com/o/oauth2/v2/auth");
            builder.tokenUri("https://www.googleapis.com/oauth2/v4/token");
            builder.jwkSetUri("https://www.googleapis.com/oauth2/v3/certs");
            builder.issuerUri("https://accounts.google.com");
            builder.userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo");
            builder.userNameAttributeName(IdTokenClaimNames.SUB);
            builder.clientName("Google");
            return builder;
        }
    },
    NAVER {
        @Override
        public Builder getBuilder(String registrationId) {
            ClientRegistration.Builder builder = getBuilder(registrationId,
                    ClientAuthenticationMethod.CLIENT_SECRET_BASIC, SERVER_URL.concat("/jamong/member/login/callback/{registrationId}"));
            builder.scope("name", "email");
            builder.authorizationUri("https://nid.naver.com/oauth2.0/authorize");
            builder.tokenUri("https://nid.naver.com/oauth2.0/token");
            builder.userInfoUri("https://openapi.naver.com/v1/nid/me");
            builder.userNameAttributeName("response");
            builder.clientName("Naver");
            return builder;
        }
    },
    GITHUB {
        @Override
        public Builder getBuilder(String registrationId) {
            ClientRegistration.Builder builder = getBuilder(registrationId,
                    ClientAuthenticationMethod.CLIENT_SECRET_BASIC, SERVER_URL.concat("/jamong/member/login/callback/{registrationId}"));
            builder.scope("read:user");
            builder.authorizationUri("https://github.com/login/oauth/authorize");
            builder.tokenUri("https://github.com/login/oauth/access_token");
            builder.userInfoUri("https://api.github.com/user");
            builder.userNameAttributeName("id");
            builder.clientName("GitHub");

            return builder;
        }
    };

    protected final Builder getBuilder(String registrationId, ClientAuthenticationMethod method,
                                       String redirectUri) {
        Builder builder = ClientRegistration.withRegistrationId(registrationId);
        builder.clientAuthenticationMethod(method);
        builder.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE);
        builder.redirectUri(redirectUri);
        return builder;
    }

    public abstract Builder getBuilder(String registrationId);

}
