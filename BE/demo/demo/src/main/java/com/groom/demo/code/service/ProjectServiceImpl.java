package com.groom.demo.code.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerCmd;
import com.github.dockerjava.api.command.RemoveContainerCmd;
import com.github.dockerjava.core.DockerClientBuilder;
import com.groom.demo.code.entity.Project;
import com.groom.demo.code.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService{

    private final DockerClient dockerClient;
    private final ProjectRepository projectRepository;
    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
        this.dockerClient = DockerClientBuilder.getInstance().build();
    }

@Override
public String createContainer(String name, String language, String owner) {
    String imageName = switch (language) {
        case "java" -> "java_image";
        case "cpp" -> "cpp_image";
        case "python" -> "python_image";
        case "javascript" -> "javascript_image";
        default -> "java_image";
    };

    Map<String, String> labels = new HashMap<>();
    labels.put("language", language);
    labels.put("owner", owner);
    labels.put("Name", name);

    CreateContainerCmd createContainerCmd = dockerClient.createContainerCmd(imageName)
            .withLabels(labels);

    String containerId = createContainerCmd.exec().getId();

    if (containerId != null && !containerId.isEmpty()) {
        Project project = new Project();
        project.setContainerID(containerId);
        project.setUser(owner);
        project.setLanguage(language);
        project.setDate(LocalDateTime.now());

        projectRepository.save(project);
    }

    return containerId;
}
    @Override
    public boolean removeContainer(String containerId) {
        RemoveContainerCmd removeContainerCmd = dockerClient.removeContainerCmd(containerId);
        removeContainerCmd.exec();
        projectRepository.deleteByContainerID(containerId);
        return true;
    }

    @Override
    public List<Project> getContainersByMember(String username) {
        return projectRepository.findByMembers_User(username);
    }
}
