package com.groom.demo.code.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.ecs.AmazonECS;
import com.amazonaws.services.ecs.AmazonECSClientBuilder;
import com.amazonaws.services.ecs.model.RunTaskRequest;
import com.amazonaws.services.ecs.model.RunTaskResult;
import com.groom.demo.code.entity.Project;
import com.groom.demo.code.repository.ProjectRepository;
import com.groom.demo.member.entity.ProjectMember;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final AmazonECS ecsClient;
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;

        // AWS 자격 증명 설정
        
//        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
//        AWSStaticCredentialsProvider credentialsProvider = new AWSStaticCredentialsProvider(awsCredentials);

        // ECS 클라이언트 생성
//        this.ecsClient = AmazonECSClientBuilder.standard()
//                .withCredentials(credentialsProvider)
//                .withRegion("ap-northeast-2")
//                .build();
    }

    @Override
    public String createContainer(String name, String language, String owner) {
        // 도커 이미지 선택
        String imageName = switch (language) {
            case "java" -> "java_image";
            case "cpp" -> "cpp_image";
            case "python" -> "python_image";
            case "javascript" -> "javascript_image";
            default -> "java_image";
        };

        // ECS에서 작업 실행
        RunTaskRequest runTaskRequest = new RunTaskRequest()
                .withCluster("YOUR_CLUSTER_NAME")
                .withTaskDefinition("YOUR_TASK_DEFINITION")
                .withLaunchType("EC2")
                .withStartedBy("PROJECT_SERVICE"); // 실행 시작자 지정

        RunTaskResult runTaskResult = ecsClient.runTask(runTaskRequest);

        // 실행된 작업의 ID
        String containerId = runTaskResult.getTasks().get(0).getTaskArn();

        if (containerId != null && !containerId.isEmpty()) {
            // 프로젝트 정보 저장
            Project project = new Project();
            project.setContainerID(containerId);
            project.setUser(owner);
            project.setLanguage(language);
            project.setDate(LocalDateTime.now());

//            projectRepository.save(project);
//            projectRepository.findById(project.getProject_no()).ifPresent(savedProject
//                    -> addProjectMember(savedProject.getProject_no(), owner, true));
        }

        return containerId;
    }
//    private void addProjectMember(Long projectId, String projectInviteMember, boolean projectLeader) {
//        ProjectMember projectMember = new ProjectMember();
//        projectMember.setproject(projectId);
//        projectMember.setprojectInviteMember(projectInviteMember);
//        projectMember.setprojectLeader(projectLeader);
//
//        project.getMembers().add(projectMember);
//    }
    @Override
    public boolean removeContainer(String containerId) {
        // ECS에서 작업 중지
        // ecsClient.stopTask(...);

        // 프로젝트 정보 삭제
        projectRepository.deleteByContainerID(containerId);

        return true;
    }

    @Override
    public List<Project> getContainersByMember(String username) {
        return null;
    }


}
