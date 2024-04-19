package com.groom.demo.projectmember.service;

import com.groom.demo.code.entity.Project;
import com.groom.demo.code.repository.ProjectRepository;
import com.groom.demo.projectmember.dto.ContainerPageDTO;
import com.groom.demo.projectmember.dto.MainPageIndexDTO;
import com.groom.demo.projectmember.dto.ProjectJoinOthersDTO;
import com.groom.demo.member.entity.Member;
import com.groom.demo.member.repository.MemberRepository;
import com.groom.demo.projectmember.dto.ProjectKickMemberDTO;
import com.groom.demo.projectmember.entity.ProjectMember;
import com.groom.demo.projectmember.repository.ProjectMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
public class ProjectMemberServiceImpl implements ProjectMemberService{


    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectMemberRepository projectMemberRepository;

    // 프로젝트 컨테이너 내 다른 사용자 초대(Long -> String)
    @Override
    // true, false일 경우로 나눠서 갑을 입력해야해서 void -> boolean으로 변경
    public Boolean othersJoin(ProjectJoinOthersDTO projectJoinOthersDTO) {
        // 컨테이너 ID로 해당 프로젝트의 데이터를 다 뽑아옴.
        // 컨테이너 ID가 PK가 아니라서 여러 데이터가 존재할 수 있기 때문에 List<>로 받았음
        List<Project> longChangeProject = projectRepository.findAllByContainerID(projectJoinOthersDTO.getContainerId());
        // 컨테이너 ID를 받아오지 못했을 경우(데이터가 없는 경우) false를 반환해서 오류 메세지를 출력한다.
        if (longChangeProject.isEmpty()) {
            return false;
            // 컨테이너 ID를 받아올 경우 첫 번째 값만 뽑아온다.
            // 두 개여도.. 세 개여도 그냥 첫 번째 값만 뽑아온다.
        } else {
            Project project = longChangeProject.get(0);
            // Email로 해당 사용자의 정보를 뽑아온다.
            Member joinOthersTwo = memberRepository.selectMemberLogin(projectJoinOthersDTO.getOthersEmail()).orElse(null);
            // 뽑아왔는데, 사용자가 없는 경우에는 false를 반환해서 오류 메시지를 출력한다.
            if (joinOthersTwo == null) {
                return false;
            }

            // DB에서 사용자의 Email을 뽑아온다.
            String didNotExistMail = joinOthersTwo.getMemberIdEmail();

            // 만약 Email이 없는 경우를 대비하여 조건문을 쓴다.
            // Email이 없는 경우 -> 소셜 로그인(Naver 등) -> Email 대신 이름(혹은 닉네임)을 넣어준다.
            // 이름을 넣은 이유는, 모든 Social Type에서 이름이 들어가기 때문이다.
            if (didNotExistMail == null){
                didNotExistMail = joinOthersTwo.getMemberName();
            }

            projectMemberRepository.save(
                    ProjectMember.builder()
                            .memberNo2(joinOthersTwo)
                            .projectNo(project)
                            .projectLeader(projectJoinOthersDTO.getIsLeader())
                            .projectInviteMember(didNotExistMail)
                            .projectName(project.getProject_name())
                            .build()
            );
            return true;
        }
    }

    // 컨테이너 다른 사용자 강퇴
    @Override
    public Boolean kickMember(ProjectKickMemberDTO projectKickMemberDTO, Long memberNo) {

        // 컨테이너 ID로 해당 프로젝트의 데이터를 다 뽑아옴.
        // 컨테이너 ID가 PK가 아니라서 여러 데이터가 존재할 수 있기 때문에 List<>로 받았음
        List<Project> longChangeProject = projectRepository.findAllByContainerID(projectKickMemberDTO.getContainerID());
        // 컨테이너 ID를 받아오지 못했을 경우(데이터가 없는 경우) false를 반환해서 오류 메세지를 출력한다.
        if (longChangeProject.isEmpty()) {
            return false;
            // 컨테이너 ID를 받아올 경우 첫 번째 값만 뽑아온다.
            // 두 개여도.. 세 개여도 그냥 첫 번째 값만 뽑아온다.
        } else {
            Project project = longChangeProject.get(0);
            // Email로 해당 사용자의 정보를 뽑아온다.
            Member kickOthers = memberRepository.selectMemberLogin(projectKickMemberDTO.getOthersMail()).orElse(null);

            // 다른 사람을 강퇴하는 사람의 회원 고유번호를 뽑아온다.(토큰 정보가 포함되어 있다.)
            Member myNo = memberRepository.getReferenceById(memberNo);

            // isLeader가 true인지 불러오는 것. 아무것도 못 받으면? false 처리한다.
            Boolean isLeaderOk = projectMemberRepository.isLeader(myNo, project).orElse(false);

            // 뽑아왔는데, 사용자가 없는 경우에는 false를 반환해서 오류 메시지를 출력한다.
            if (kickOthers == null) {
                return false;
            }

            // 이 프로젝트의 방장이 아닌 경우에도 false 처리 한다.
            if (!isLeaderOk){
                return false;
            }

            // 강퇴 -> 삭제처리기능
            projectMemberRepository.kickMember(kickOthers, project);
            return true;
        }
    }

    // 사용자가 로그인 후, 메인페이지에서 바라보는 프로젝트(컨테이너) 목록 조회
    @Override
    public List<MainPageIndexDTO> mainIndex(Long memberToken) {
        // MemberRespository에서 memberToken을 뽑아온다.
        Member member = memberRepository.getReferenceById(memberToken);

    // 나(로그인한 사람)와 연관된 모든 프로젝트를 뽑아온 뒤, 그 프로젝트 containerID와 isLeader를 뽑았음.
        return projectMemberRepository.mainPageIndex(member);
    }

    @Override
    public List<ContainerPageDTO> container(String containerId) {
        return projectMemberRepository.containerPage(containerId);
    }
}
