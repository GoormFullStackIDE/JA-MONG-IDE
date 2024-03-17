package com.groom.demo.auth.jwt;

import com.groom.demo.auth.util.JwtTokenUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;


@Service
public class JsonWebTokenProvider {

    // token에 담겨있는 정보를 이용해 Authentication 객체를 리턴 (CustomAuthenticatedUser에서 설정한 키값과 동일해야 함.)
    public Authentication getAuthentication(String token) {

        String role = JwtTokenUtils.getClaimAttribute(token, "role");
        Collection<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));
        String userSequence = JwtTokenUtils.getClaimAttribute(token, "sequence");

        CustomAuthenticatedUser customAuthenticatedUser = new CustomAuthenticatedUser(authorities, Long.valueOf(userSequence), true);
        return customAuthenticatedUser;
    }
}
