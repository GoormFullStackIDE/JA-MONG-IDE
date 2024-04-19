package com.groom.demo.member.entity;

import com.groom.demo.auth.oauth.SocialType;
import com.groom.demo.member.dto.MemberModifyDTO;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member {
    // 컬럼들을 받아온다.
    // String의 경우 length로 크기를 정하고, not null은 따로 설정한다.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    // 유니크를 못 주는 이유 = 소셜로그인
    // 네이버는 메일을 못받음.. 데이터 안줌;
    @Column(name = "member_id_email", length = 100, unique = true)
    private String memberIdEmail;

    @Column(name = "member_name", length = 100, nullable = false)
    private String memberName;

    @Column(name = "member_pass", length = 2000, nullable = false)
    private String memberPass;

    @Builder.Default
    @Column(name = "member_passHistory", length = 2000)
    private String memberPassHistory = BCrypt.hashpw("0", BCrypt.gensalt());

    @Column(name = "member_phone", length = 100, nullable = false)
    private String memberPhone;

    @Column(name = "member_address", length = 400)
    private String memberAddress;

    @Column(name = "member_address_detail", length = 400)
    private String memberAddressDetail;

    @Column(name = "member_zip", length = 400)
    private String memberZip;

    @Column(name = "member_file", length = 3000)
    private String memberFile;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_socialType")
    private SocialType memberSocialType;

    @Column(name = "member_socialId", length = 2000)
    private String memberSocialId;

    @Column(name = "member_Token", length = 2000)
    private String memberToken;

    @Column(name = "member_date")
    private LocalDateTime memberDate;

    @Column(name = "member_lastlogin")
    private LocalDateTime memberLastLogin;

    // Boolean이라 초기값을 false로 줬음.
    @Builder.Default
    @Column(name = "member_isdelete")
    private Boolean memberIsDelete = false;

    // 일반 & 소셜로그인시 Refresh Token DB 저장
    public void changeToken(String memberToken) {
        this.memberToken = memberToken;
        this.memberLastLogin = LocalDateTime.now();
    }

    // 회원 탈퇴
    public void memberDelete(Boolean memberIsDelete) {
        this.memberIsDelete = memberIsDelete;
    }

    // 비밀번호 변경
    public void memberUpdatePW(String changePW) {
        this.memberPass = BCrypt.hashpw(changePW, BCrypt.gensalt()); ;
    }

    // 마지막로그인을 띄울 update
    public void lastLoginRecord(LocalDateTime lastlogin) {
        this.memberLastLogin = lastlogin;
    }

    // 프로필 편집
    public void memberModify(MemberModifyDTO memberModifyDTO, String imgLink, String passHistory) {
        this.memberName = memberModifyDTO.getMemberName();
        if (! BCrypt.checkpw(memberModifyDTO.getMemberPass(),passHistory)) {
            this.memberPass = BCrypt.hashpw(memberModifyDTO.getMemberPass(), BCrypt.gensalt());
            this.memberPassHistory = passHistory;
        }
        this.memberPhone = memberModifyDTO.getMemberPhone();

        if (memberModifyDTO.getMemberAddress() != null) {
            this.memberAddress = memberModifyDTO.getMemberAddress();
        }if (memberModifyDTO.getMemberAddressDetail()!= null) {
            this.memberAddressDetail = memberModifyDTO.getMemberAddressDetail();
        }if (memberModifyDTO.getMemberAddressZip() != null) {
            this.memberZip = memberModifyDTO.getMemberAddressZip();
        }

        this.memberDate = LocalDateTime.now();

        if (imgLink != null) {
            this.memberFile = imgLink;
        }
    }

}

