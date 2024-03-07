package com.groom.demo.code.service;

import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.async.ResultCallback;
import com.github.dockerjava.api.command.CreateContainerResponse;
import com.github.dockerjava.api.model.Frame;
import com.github.dockerjava.core.DockerClientBuilder;

import com.groom.demo.code.entity.CodeSubmission;
import com.groom.demo.code.entity.ExecutionResult;
import org.springframework.stereotype.Service;

@Service
public class CodeExecutionService {
    private final DockerClient dockerClient = DockerClientBuilder.getInstance().build();

    public ExecutionResult executeCode(CodeSubmission submission) {
        try {
            // Docker 컨테이너 생성 및 설정
            String imageId = "python:3.8"; // 예시로 python 이미지 사용, 실제로는 submission.getLanguage()에 따라 결정됨
            String code = submission.getCode();

            CreateContainerResponse container = dockerClient.createContainerCmd(imageId)
                    .withCmd("python", "-c", code)
                    .withTty(true)
                    .exec();

            // Docker 컨테이너 실행
            dockerClient.startContainerCmd(container.getId()).exec();

            // 실행 결과 수집
            StringBuilder logsBuilder = new StringBuilder();
            dockerClient.logContainerCmd(container.getId())
                    .withStdOut(true)
                    .withStdErr(true)
                    .withFollowStream(true)
                    .withTailAll()
                    .exec(new ResultCallback.Adapter<Frame>() {
                        @Override
                        public void onNext(Frame frame) {
                            logsBuilder.append(new String(frame.getPayload()));
                        }
                    }).awaitCompletion(); // 로그 수집을 기다립니다.

            String logs = logsBuilder.toString();

            // Docker 컨테이너 정리
            dockerClient.stopContainerCmd(container.getId()).exec();
            dockerClient.removeContainerCmd(container.getId()).exec();

            return new ExecutionResult(true, logs, "");
        } catch (Exception e) {
            return new ExecutionResult(false, "", e.getMessage());
        }
    }
}