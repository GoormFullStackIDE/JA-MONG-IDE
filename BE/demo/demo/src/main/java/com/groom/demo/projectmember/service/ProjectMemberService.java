package com.groom.demo.projectmember.service;

import com.groom.demo.code.entity.Project;
import com.groom.demo.projectmember.dto.ContainerPageDTO;
import com.groom.demo.projectmember.dto.MainPageIndexDTO;
import com.groom.demo.projectmember.dto.ProjectJoinOthersDTO;
import com.groom.demo.projectmember.dto.ProjectKickMemberDTO;

import java.util.List;

public interface ProjectMemberService {

    // 프로젝트 다른 사용자 초대
    Boolean othersJoin(ProjectJoinOthersDTO projectJoinOthersDTO);

    // 프로젝트 사용자 강퇴
    Boolean kickMember(ProjectKickMemberDTO projectKickMemberDTO, Long memberNo);

    // 사용자가 로그인 후 메인페이지에 보이는 컨테이너 목록 조회
    // 받을 수 있는 것은 Token 뿐이기 때문에 그것으로 MemberNo를 받고, 그것과 연관되어 있는 Project를 모두 뽑아온다.
    List<MainPageIndexDTO> mainIndex(Long memberToken);
    List<ContainerPageDTO> container(String containerId);
}
