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

    //최초 OAuthToUserService에서 Resource Server로부터 받은 attirubtes를 통해 CustomOAuthToUser 객체를 생성한다.
    public static CustomOAuth2User mapper(Map<String, Object> attributes, String registrationId, String nameAttributeKey) {
        switch (registrationId) {
            case ("kakao"):
                return kakaoMapper(attributes, nameAttributeKey);
            case ("google"):
                return googleMapper(attributes, nameAttributeKey);
            case ("naver"):
                return naverMapper(attributes, nameAttributeKey);
            default:
                return null;
        }
    }

    public static CustomOAuth2User kakaoMapper(Map<String, Object> attributes, String nameAttributeKey) {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        return CustomOAuth2User.builder()
                .registrationId(SocialType.KAKAO)
                .socialId(attributes.get("id").toString())
                .nameAttributeKey(nameAttributeKey)
                .build();
    }

    public static CustomOAuth2User googleMapper(Map<String, Object> attributes, String nameAttributeKey) {
        return CustomOAuth2User.builder()
                .registrationId(SocialType.GOOGLE)
                .socialId(attributes.get(nameAttributeKey).toString())
                .nameAttributeKey(nameAttributeKey)
                .build();
    }

    public static CustomOAuth2User naverMapper(Map<String, Object> attributes, String nameAttributeKey) {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("response");

        return CustomOAuth2User.builder()
                .registrationId(SocialType.NAVER)
                .socialId(properties.get("id").toString())
                .nameAttributeKey(nameAttributeKey)
                .build();
    }
}
