package com.groom.demo.auth.oauth;
public enum SocialType {
    KAKAO("kakao"),
    GOOGLE("google"),
    NAVER("naver"),
    NORMAL("normal");

    private final String label;

    SocialType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}