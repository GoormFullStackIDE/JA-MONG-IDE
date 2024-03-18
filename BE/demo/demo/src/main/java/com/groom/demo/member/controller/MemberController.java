package com.groom.demo.member.controller;

import com.groom.demo.auth.jwt.JsonWebToken;
import com.groom.demo.auth.util.JwtTokenUtils;
import com.groom.demo.config.AuthConfig;
import com.groom.demo.member.dto.*;
import com.groom.demo.member.service.MemberService;
import com.groom.demo.member.service.S3UploadService;
import com.groom.demo.member.util.EmailUtil;
import io.micrometer.common.util.StringUtils;
import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.antlr.v4.runtime.misc.FlexibleHashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/member")
public class MemberController {
    // 휴대폰 인증번호 발신
    public static DefaultMessageService messageService;
    // 임시 비밀번호 메일 전송
    @Autowired
    private JavaMailSender javaMailSender;
    // 그 외 Member관련된 것들
    @Autowired
    private MemberService memberService;

    @Autowired
    private S3UploadService s3UploadService;
    @Autowired
    private AuthConfig authConfig;

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // 여기서부터 휴대폰 인증 Controller
    @Autowired
    public void setDefaultMessageService(AuthConfig authConfig) {
        // 반드시 계정 내 등록된 유효한 API 키, API Secret Key를 입력해주셔야 합니다!
        messageService = NurigoApp.INSTANCE.initialize(authConfig.getCoolsmsapikey(), authConfig.getCoolsmssecretkey(), "https://api.coolsms.co.kr");
    }

    /**
     * 6자리 인증키 생성, int 반환
     *
     * @return
     */
    public static int generateAuthNo1() {
        return ThreadLocalRandom.current().nextInt(100000, 1000000);
    }

    /**
     * 단일 메시지 발송 예제
     */
    @PostMapping("/signup/phone")
    public ResponseEntity<?> sendOne(@RequestBody @Valid PhoneCertificationDTO phoneCertificationDTO) {
        Message message = new Message();
        int randomPhone = generateAuthNo1();
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom(authConfig.getPhone());
        message.setTo(phoneCertificationDTO.getMemberPhone());
        message.setText("[자:몽IDE] 본인확인 인증번호는 [" + randomPhone + "]를 입력해주세요.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return new ResponseEntity<>(randomPhone, HttpStatus.OK);
    }


    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid MemberSignUpRequestDTO memberSignUpRequestDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        if (StringUtils.isBlank(memberSignUpRequestDTO.getMemberIdMail())) {
            return new ResponseEntity<>("이메일을 확인해주세요.", HttpStatus.BAD_REQUEST);
        }
        memberService.memberSignUp(memberSignUpRequestDTO);
        return new ResponseEntity<>(responsebody, HttpStatus.OK);
    }

    // 회원가입시 ID 중복검사
    @GetMapping("/idcheck")
    public ResponseEntity<?> idcheck(@RequestParam String memberId) {
        Boolean idcheck = memberService.memberIdCheck(memberId);
        return new ResponseEntity<>(idcheck, HttpStatus.OK);
    }

    // Memberinfo
    @GetMapping("/info")
    public ResponseEntity<?> info() {
        Long memberId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        List<MemberPageInfoDto> memberPageInfoDtoList = memberService.memberdata(memberId);
        return new ResponseEntity<>(memberPageInfoDtoList, HttpStatus.OK);
    }

    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid MemberloginDTO memberloginDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        Long normalLogin = memberService.memberLogin(memberloginDTO.getMemberIdEmail(), memberloginDTO.getMemberPass());

        if (normalLogin == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            JsonWebToken jsonWebToken = JwtTokenUtils.allocateToken(normalLogin, "ROLE_USER");
            MultiValueMap<String, String> headers = new HttpHeaders();
            headers.add("Authorization", jsonWebToken.getAccessToken());
            return new ResponseEntity<>(responsebody, headers, HttpStatus.OK);
        }
    }

    // 회원탈퇴
    @DeleteMapping("/delete")
    public ResponseEntity<?> delete() {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        Long deleteMemberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean memberisDelete = memberService.memberIsDelete(deleteMemberNo);
        return new ResponseEntity<>(responsebody, HttpStatus.OK);
    }

    // 회원 아이디 검색(조회)시 이름과 함께 응답
    @GetMapping("/search")
    public ResponseEntity<?> searchMember(@RequestParam String idmail) {
        SearchMemberDTO searchMemberDTO = memberService.searchmember(idmail);
        return new ResponseEntity<>(searchMemberDTO, HttpStatus.OK);
    }

    // ID 찾기
    @PostMapping("/idfind")
    public ResponseEntity<?> idfindMember(@RequestBody @Valid MemberIDFindDTO memberIDFindDTO) {
        List<String> idFind = memberService.findEmail(memberIDFindDTO);
        return new ResponseEntity<>(idFind, HttpStatus.OK);
    }

    // PW 찾기
    @PostMapping("/pwfind")
    public ResponseEntity<?> pwfindMember(@RequestBody @Valid MemberPWFindDTO memberPWFindDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        String temporaryPW = memberService.temporaryPW(
                memberPWFindDTO.getMemberIdMail(),
                memberPWFindDTO.getMemberName(),
                memberPWFindDTO.getMemberPhone());

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        // 임시비밀번호 발급 메일 전송
        final String fromEmail = authConfig.getEmailId(); // requires valid gmail id
        final String password = authConfig.getEmailPw(); // correct password for gmail id
        final String toEmail = memberPWFindDTO.getMemberIdMail(); // can be any email id

        System.out.println("TLSEmail Start");
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com"); // SMTP Host
        props.put("mail.smtp.port", "587"); // TLS Port
        props.put("mail.smtp.auth", "true"); // enable authentication
        props.put("mail.smtp.starttls.enable", "true"); // enable STARTTLS
        props.put("mail.smtp.ssl.protocols", "TLSv1.2");

        // create Authenticator object to pass in Session.getInstance argument
        Authenticator auth = new Authenticator() {
            // override the getPasswordAuthentication method
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        };
        Session session = Session.getInstance(props, auth);

        EmailUtil.sendEmail(session, toEmail,
                "[자:몽 IDE] 임시 비밀번호 안내 입니다.",
                "[자:몽 IDE] 임시 비밀번호 발급 안내입니다.\n\n" +
                        "회원님의 [자:몽 IDE] 임시 비밀번호가 발급되었습니다.\n" +
                        "아래의 임시 비밀번호로 로그인 하신 후 비밀번호를 재설정하시기 바랍니다.\n" +
                        "비밀번호 재설정은 프로필 편집 > 비밀번호 변경에서 가능합니다.\n" +
                        "\n" +
                        "임시 비밀번호는 복사 + 붙여넣기 대신 직접 입력하여 주시기 바랍니다.\n\n\n" +
                        temporaryPW);


        return new ResponseEntity<>(responsebody, HttpStatus.OK);
    }
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

    // 프로필편집 - 이미지 등록
    @PutMapping("/modify")
    public ResponseEntity<?> modifyProfile(@ModelAttribute MemberModifyDTO memberModifyDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        Long modifyMemberNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        String name = memberModifyDTO.getMemberName();
        String phone = memberModifyDTO.getMemberPhone();
        String pass = memberModifyDTO.getMemberPass();

        if (StringUtils.isBlank(name) || StringUtils.isBlank(phone) || StringUtils.isBlank(pass)) {

            return new ResponseEntity<>("이름, 휴대폰번호, 비밀번호는 빈 값으로 두면 안됩니다.", HttpStatus.BAD_REQUEST);
        }

        if (memberService.isProfileOK(memberModifyDTO.getMemberPass(), modifyMemberNo)) {
            String uploadIMG = null;
            if (!memberModifyDTO.getMemberFile().isEmpty()) {
                uploadIMG = s3UploadService.upload(memberModifyDTO.getMemberFile(), "jamongProfile");
            }
            memberService.memberProfileModify(memberModifyDTO, modifyMemberNo, uploadIMG);
            return new ResponseEntity<>(responsebody, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("직전에 사용했던 비밀번호로는 수정할 수 없습니다.", HttpStatus.BAD_REQUEST);

        }


    }
}
