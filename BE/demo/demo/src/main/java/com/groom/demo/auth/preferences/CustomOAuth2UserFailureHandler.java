package com.groom.demo.auth.preferences;


import com.groom.demo.auth.exception.OAuth2LoginException;
import com.groom.demo.auth.jwt.JsonWebToken;
import com.groom.demo.auth.oauth.CustomOAuth2User;
import com.groom.demo.auth.util.CookieUtils;
import com.groom.demo.auth.util.JsonUtils;
import com.groom.demo.auth.util.JwtTokenUtils;
import com.groom.demo.member.entity.Member;
import com.groom.demo.member.repository.MemberRepository;
import io.micrometer.common.util.StringUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;
import java.time.LocalDateTime;

import static com.groom.demo.auth.preferences.CustomOAuth2CookieAuthorizationRepository.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME;
import static com.groom.demo.auth.preferences.CustomOAuth2CookieAuthorizationRepository.REDIRECT_URI_PARAM_COOKIE_NAME;
import static com.groom.demo.auth.util.JwtTokenUtils.ACCESS_PERIOD;
import static com.groom.demo.auth.util.JwtTokenUtils.REFRESH_PERIOD;

@RequiredArgsConstructor
@Transactional
public class CustomOAuth2UserFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        // CustomOAuth2UserService에서 발생한 SIGN_UP_REQUIRED 에러가 아닌 경우
        if (!(exception instanceof OAuth2LoginException)) {
            JsonUtils.writeJsonExceptionResponse(response, HttpStatus.BAD_REQUEST, exception.getMessage());
            return;
        }

        // 회원 가입을 진행하기 위해 CustomOAuth2User를 추출한다.
        CustomOAuth2User customOAuth2User = ((OAuth2LoginException) exception).getCustomOAuth2User();
        Member member;
        if (StringUtils.isBlank(customOAuth2User.getSocialMail())) {
            member = memberRepository.save(
                    Member.builder()
                            .memberSocialType(
                                    customOAuth2User.getRegistrationId())
                            .memberSocialId(
                                    customOAuth2User.getSocialId())
                            .memberAdress("")
                            .memberName(customOAuth2User.getSocialName())
                            .memberPass("")
                            .memberPhone("")
                            .memberDate(LocalDateTime.now())
                            .memberLastLogin(LocalDateTime.now())
                            .build()
            );
        } else {
            member = memberRepository.save(
                    Member.builder()
                            .memberSocialType(
                                    customOAuth2User.getRegistrationId())
                            .memberSocialId(
                                    customOAuth2User.getSocialId())
                            .memberAdress("")
                            .memberName(customOAuth2User.getSocialName())
                            .memberPass("")
                            .memberPhone("")
                            .memberIdEmail(customOAuth2User.getSocialMail())
                            .memberDate(LocalDateTime.now())
                            .memberLastLogin(LocalDateTime.now())
                            .build()
            );
        }
        Long userSeq = member.getMemberNo();

        //jwt 토큰을 발급한다.
        JsonWebToken jsonWebToken = JwtTokenUtils.allocateToken(userSeq, "ROLE_USER");

        member.changeToken(jsonWebToken.getRefreshToken());

        //cookie에서 redirectUrl을 추출하고, redirect 주소를 생성한다.
        String baseUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).getValue();

        //쿠키를 삭제한다.
        CookieUtils.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        CookieUtils.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);

        //프론트에 전달할 쿠키
        Cookie acessCookie = new Cookie("Access", jsonWebToken.getAccessToken());
        acessCookie.setMaxAge((int) ACCESS_PERIOD);
        acessCookie.setPath("/");
        response.addCookie(acessCookie);
        ResponseCookie cookie = ResponseCookie.from("Refresh", jsonWebToken.getRefreshToken())
                .sameSite("None")
                .secure(true)
                .path("/")
                .maxAge(REFRESH_PERIOD)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
        response.addHeader("Authorization", jsonWebToken.getAccessToken());

        request.getSession().setMaxInactiveInterval(180); //second
        request.getSession().setAttribute("Authorization", jsonWebToken.getAccessToken());
        request.getSession().setAttribute("Sequence", userSeq);
        //리다이렉트 시킨다.
        getRedirectStrategy().sendRedirect(request, response, baseUrl);

    }


}
