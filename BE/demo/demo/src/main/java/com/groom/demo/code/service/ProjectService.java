package com.groom.demo.code.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.command.CreateContainerCmd;
import com.github.dockerjava.api.command.RemoveContainerCmd;
import com.github.dockerjava.core.DockerClientBuilder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProjectService {

    private final DockerClient dockerClient;

    public ProjectService() {
        this.dockerClient = DockerClientBuilder.getInstance().build();
    }
    public String createContainer(String imageName, String language, String owner) {
        Map<String, String> labels = new HashMap<>();
        labels.put("language", language);
        labels.put("owner", owner);

        CreateContainerCmd createContainerCmd = dockerClient.createContainerCmd(imageName)
                .withLabels(labels); // language와 owner 정보 추가
        return createContainerCmd.exec().getId();
    }
    public boolean removeContainer(String containerId) {
        RemoveContainerCmd removeContainerCmd = dockerClient.removeContainerCmd(containerId);
        removeContainerCmd.exec();
        return true;
    }
}
