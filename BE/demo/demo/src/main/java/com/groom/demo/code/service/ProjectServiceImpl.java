package com.groom.demo.code.service;

import com.amazonaws.services.ecs.AmazonECS;
import com.amazonaws.services.ecs.model.RunTaskRequest;
import com.amazonaws.services.ecs.model.RunTaskResult;
import com.amazonaws.services.ecs.model.StopTaskRequest;
import com.groom.demo.code.entity.Project;
import com.groom.demo.code.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;


@Service
@DependsOn("AWSConfig") // AWSConfig 빈이 먼저 초기화되도록 설정
public class ProjectServiceImpl implements ProjectService {

    private final AmazonECS ecsClient;
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository, AmazonECS ecsClient) {
        this.projectRepository = projectRepository;
        this.ecsClient = ecsClient;
    }

    @Override
    public String createContainer(String name, String language, String owner) {
        // 도커 이미지 선택
        String imageName = switch (language) {
            case "java" -> "java_compile_image";//
            case "cpp" -> "cpp_compile_image";
            case "python" -> "python_compile_image";
            case "javascript" -> "javascript_compile_image";
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

            projectRepository.save(project);
//            projectRepository.findById(project.getProject_no()).ifPresent(savedProject -> addProjectMember(savedProject.getProject_no(), owner, true));
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
        StopTaskRequest stopTaskRequest = new StopTaskRequest().withTask(containerId);
        ecsClient.stopTask(stopTaskRequest);

        // 프로젝트 정보 삭제
        projectRepository.deleteByContainerID(containerId);

        return true;
    }

    @Override
    public List<Project> getContainersByMember(String username) {
        return null;
    }


}
