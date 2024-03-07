package com.groom.demo.code.controller;

import com.groom.demo.code.dto.CodeSubmissionDto;
import com.groom.demo.code.entity.CodeSubmission;
import com.groom.demo.code.entity.ExecutionResult;
import com.groom.demo.code.service.CodeExecutionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CodeExecuteController {
    private final CodeExecutionService codeExecutionService;

    public CodeExecuteController(CodeExecutionService codeExecutionService) {
        this.codeExecutionService = codeExecutionService;
    }

    @PostMapping("/code")
    public ResponseEntity<ExecutionResult> executeCode(@RequestBody CodeSubmissionDto submissionDto) {
        CodeSubmission submission = convertToEntity(submissionDto);
        ExecutionResult result = codeExecutionService.executeCode(submission);
        return ResponseEntity.ok(result);
    }

    private CodeSubmission convertToEntity(CodeSubmissionDto dto) {
        CodeSubmission submission = new CodeSubmission();
        submission.setCode(dto.getCode());
        submission.setLanguage(dto.getLanguage());
        // 필요하다면, 여기에 다른 필드들도 설정할 수 있습니다.
        return submission;
    }
}
