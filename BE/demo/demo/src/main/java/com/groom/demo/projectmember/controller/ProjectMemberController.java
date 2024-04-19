package com.groom.demo.projectmember.controller;

import com.groom.demo.projectmember.dto.ContainerPageRequestDTO;
import com.groom.demo.projectmember.dto.MainPageIndexDTO;
import com.groom.demo.projectmember.dto.ProjectJoinOthersDTO;
import com.groom.demo.projectmember.dto.ProjectKickMemberDTO;
import com.groom.demo.projectmember.service.ProjectMemberService;
import jakarta.websocket.server.PathParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.HTTP;
import retrofit2.http.POST;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/project-member")
public class ProjectMemberController {


    @Autowired
    private ProjectMemberService projectMemberService;


    // 컨테이너 초대
    @PostMapping("/join")
    public ResponseEntity<?> joinOthers(@RequestBody ProjectJoinOthersDTO projectJoinOthersDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        Boolean joinUs = projectMemberService.othersJoin(projectJoinOthersDTO);
        if (!joinUs) {
            return new ResponseEntity<>("일치하는 데이터가 없습니다.", HttpStatus.BAD_REQUEST);
        } else {

            return new ResponseEntity<>(responsebody, HttpStatus.OK);
        }
    }

    // 컨테이너 강퇴
    @PostMapping("/kick")
    public ResponseEntity<?> getOutMember(@RequestBody ProjectKickMemberDTO projectKickMemberDTO) {
        Map<String, String> responsebody = new HashMap<>();
        responsebody.put("message", "Success");
        Long memberId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        Boolean isKick = projectMemberService.kickMember(projectKickMemberDTO, memberId);
        if (!isKick) {
            return new ResponseEntity<>("일치하는 데이터가 없습니다.", HttpStatus.BAD_REQUEST);
        } else {

            return new ResponseEntity<>(responsebody, HttpStatus.OK);
        }
    }

    // 사용자가 로그인 후, 메인페이지에 띄워지는 컨테이너 목록 조회
    @GetMapping("/main-index")
    public ResponseEntity<?> mainIndex() {
        Long memberTokenMainIndex = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        List<MainPageIndexDTO> containerIDAndIsLeader = projectMemberService.mainIndex(memberTokenMainIndex);

        return new ResponseEntity<>(containerIDAndIsLeader, HttpStatus.OK);
    }

    // 컨테이너 내부에서 사용자 목록 조회

    @PostMapping("/search")
    public ResponseEntity<?> searchContainer(@RequestBody ContainerPageRequestDTO containerPageRequestDTO) {

        return new ResponseEntity<>(projectMemberService.container(containerPageRequestDTO.getContainerId()), HttpStatus.OK);
    }
}
