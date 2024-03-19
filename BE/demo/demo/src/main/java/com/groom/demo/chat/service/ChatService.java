package com.groom.demo.chat.service;

import com.groom.demo.chat.dto.ChatRequest;
import com.groom.demo.chat.dto.ChatResponse;
import com.groom.demo.chat.dto.ChatSearchDTO;
import com.groom.demo.chat.entity.Chat;
import reactor.core.publisher.Flux;

import java.util.List;

public interface ChatService {
    // 방의 채팅 보기
    Flux<ChatResponse> select(String roomNo);

    // 방의 채팅 받기
    void insert(ChatRequest chatRequest, Long userId);

    // 방의 채팅 삭제
    void delete(Long msgNo,Long userNo);

    // 채팅 변환
    ChatResponse chatToChatResponse (Chat chat);

    // 채팅 메시지 검색
    List<Chat> searchMsg (ChatSearchDTO chatSearchDTO);

    // 방의 과거 채팅 보기
    List<Chat> selectHistory(String roomNo);
}
