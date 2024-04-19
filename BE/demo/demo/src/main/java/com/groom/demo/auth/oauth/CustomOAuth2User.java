package com.groom.demo.auth.oauth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;


@Builder
@Getter
@Setter
public class CustomOAuth2User {

    private SocialType registrationId;
    private String socialId;
    private String nameAttributeKey;
    private String profileImg;
    private Long userSequence;
    private String socialName;
    private String socialMail;

    //최초 OAuthToUserService에서 Resource Server로부터 받은 attirubtes를 통해 CustomOAuthToUser 객체를 생성한다.
    public static CustomOAuth2User mapper(Map<String, Object> attributes, String registrationId, String nameAttributeKey) {
        switch (registrationId) {
            case ("kakao"):
                return kakaoMapper(attributes, nameAttributeKey);
            case ("google"):
                return googleMapper(attributes, nameAttributeKey);
            case ("naver"):
                return naverMapper(attributes, nameAttributeKey);
            case ("github"):
                return githubMapper(attributes, nameAttributeKey);
            default:
                return null;
        }
    }

    public static CustomOAuth2User kakaoMapper(Map<String, Object> attributes, String nameAttributeKey) {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        return CustomOAuth2User.builder()
                .registrationId(SocialType.KAKAO)
                .socialId(attributes.get("id").toString())
                .nameAttributeKey(nameAttributeKey)
                .socialName((String) profile.get("nickname"))
                .socialMail((String) kakaoAccount.get("email"))
                .build();
    }

    public static CustomOAuth2User googleMapper(Map<String, Object> attributes, String nameAttributeKey) {
        return CustomOAuth2User.builder()
                .registrationId(SocialType.GOOGLE)
                .socialId(attributes.get(nameAttributeKey).toString())
                .nameAttributeKey(nameAttributeKey)
                .socialMail((String) attributes.get("email"))
                .socialName((String) attributes.get("name"))
                .build();
    }

    public static CustomOAuth2User naverMapper(Map<String, Object> attributes, String nameAttributeKey) {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("response");

        return CustomOAuth2User.builder()
                .registrationId(SocialType.NAVER)
                .socialId(properties.get("id").toString())
                .nameAttributeKey(nameAttributeKey)
                .socialMail((String) properties.get("email"))
                .socialName((String) properties.get("nickname"))
                .build();
    }

    public static CustomOAuth2User githubMapper(Map<String, Object> attributes, String nameAttributeKey) {
        return CustomOAuth2User.builder()
                .registrationId(SocialType.Github)
                .socialId(attributes.get("id").toString())
                .nameAttributeKey(nameAttributeKey)
                .socialMail(attributes.get("email").toString())
                .socialName(attributes.get("name").toString())
                .build();
    }
}
