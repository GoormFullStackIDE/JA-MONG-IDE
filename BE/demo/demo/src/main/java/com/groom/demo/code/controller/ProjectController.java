package com.groom.demo.code.controller;
import org.springframework.http.HttpStatus;
import com.groom.demo.code.service.ProjectService;
import org.springframework.http.ResponseEntity;
import com.groom.demo.code.dto.ProjectCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jamong")
public class ProjectController {
    private final ProjectService projectService;
    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/create")
    public ResponseEntity<String> createContainer(@RequestBody ProjectCreateRequest request) {
        String imageName = request.getImageName();
        String language = request.getLanguage();
        String owner = request.getOwner();
        String containerId = projectService.createContainer(imageName, language, owner);
        if (containerId != null && !containerId.isEmpty()) {
            return ResponseEntity.ok("Container created successfully. ID: " + containerId);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create container.");
        }
    }

    @DeleteMapping("/remove/{containerId}")
    public ResponseEntity<String> removeContainer(@PathVariable String containerId) {
        boolean deletionSuccessful = projectService.removeContainer(containerId);
        if (deletionSuccessful) {
            return ResponseEntity.ok("Container removed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to remove container.");
        }
    }
}
