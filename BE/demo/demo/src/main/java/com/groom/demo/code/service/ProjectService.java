package com.groom.demo.code.service;

import com.groom.demo.code.entity.Project;

import java.util.List;

public interface ProjectService {
    String createContainer(String name, String language, String owner);
    boolean removeContainer(String containerId);

    List<Project> getContainersByMember(String username);
}