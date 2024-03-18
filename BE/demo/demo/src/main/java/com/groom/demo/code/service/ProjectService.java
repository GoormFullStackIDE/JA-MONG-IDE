package com.groom.demo.code.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerCmd;
import com.github.dockerjava.api.command.RemoveContainerCmd;
import com.github.dockerjava.core.DockerClientBuilder;
import com.groom.demo.code.entity.Project;
import com.groom.demo.code.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProjectService {

    private final DockerClient dockerClient;
    private final ProjectRepository projectRepository;
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
        this.dockerClient = DockerClientBuilder.getInstance().build();
    }



    public String createContainer(String Name, String language, String owner) {

        // 언어에 따라 실행할 이미지 선택
        String imageName = switch (language) {
            case "java" -> "java_image";
            case "cpp" -> "cpp_image";
            case "python" -> "python_image";
            case "javascript" -> "javascript_image";
            default ->
                // 기본값으로 java 이미지 선택
                    "java_image";
        };

        // 생성할 컨테이너에 대한 정보 설정
        Map<String, String> labels = new HashMap<>();
        labels.put("language", language);
        labels.put("owner", owner);

        // Docker 클라이언트를 사용하여 컨테이너 생성
        CreateContainerCmd createContainerCmd = dockerClient.createContainerCmd(imageName)
                .withLabels(labels); // language와 owner 정보 추가

        String containerId = createContainerCmd.exec().getId();
        Project project = new Project();
        project.setContainerID(containerId);
        project.setLanguage(language);
        project.setUser(owner);
        projectRepository.save(project);

        return containerId;
    }
    public boolean removeContainer(String containerId) {
        RemoveContainerCmd removeContainerCmd = dockerClient.removeContainerCmd(containerId);
        removeContainerCmd.exec();
        projectRepository.deleteByContainerID(containerId);
        return true;
    }
}
