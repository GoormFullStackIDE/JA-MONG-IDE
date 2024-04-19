package com.groom.demo.code.repository;

import com.groom.demo.code.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    @Transactional
    void deleteByContainerID(String containerId);
}
