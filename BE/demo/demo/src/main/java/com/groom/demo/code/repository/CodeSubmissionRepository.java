package com.groom.demo.code.repository;

import com.groom.demo.code.entity.CodeSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CodeSubmissionRepository extends JpaRepository<CodeSubmission, Long> {
    // 필요한 경우, 여기에 커스텀 메소드를 추가할 수 있습니다.
}