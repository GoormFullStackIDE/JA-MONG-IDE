package com.groom.demo.code.controller;
import com.groom.demo.code.dto.ProjectCreateResponse;
import com.groom.demo.code.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import com.groom.demo.code.service.ProjectService;
import org.springframework.http.ResponseEntity;
import com.groom.demo.code.dto.ProjectCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jamong")
public class ProjectController {
    @Autowired
    private final ProjectService projectService;
    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }
    @Autowired
    private ProjectRepository projectRepository;
    @PostMapping("/create")
    public ResponseEntity<ProjectCreateResponse> createContainer(@RequestBody ProjectCreateRequest request) {
        String Name = request.getName();
        String language = request.getLanguage();
        String owner = request.getOwner();
        String containerId = projectService.createContainer( Name,language,owner);
        if (containerId != null && !containerId.isEmpty()) {
            ProjectCreateResponse response = new ProjectCreateResponse(containerId, "Container created successfully.");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ProjectCreateResponse(null, "Failed to create container."));
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
