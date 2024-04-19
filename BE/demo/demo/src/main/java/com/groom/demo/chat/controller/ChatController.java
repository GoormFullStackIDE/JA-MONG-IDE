package com.groom.demo.chat.controller;

import com.groom.demo.chat.dto.ChatRequest;
import com.groom.demo.chat.dto.ChatResponse;
import com.groom.demo.chat.dto.ChatSearchDTO;
import com.groom.demo.chat.entity.Chat;
import com.groom.demo.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    // 실시간 채팅 받기
    @GetMapping(value = "/room-number/{roomNum}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ChatResponse> receiveMessage(@PathVariable String roomNum) {

        return chatService.select(roomNum);
    }

    // 채팅 보내기
    @PostMapping("/room-number")
    public ResponseEntity<?> sendMessage(@RequestBody ChatRequest chatRequest) {
        Long userNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        chatService.insert(chatRequest, userNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 채팅 삭제 -> 안쓴다고 함
    @DeleteMapping("/message/{msgNo}")
    public ResponseEntity<?> deleteMessage(Long msgNo) {
        Long userNo = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
        chatService.delete(msgNo, userNo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 메세지 검색
    @PostMapping("/search")
    public ResponseEntity<?> searchMessage(@RequestBody ChatSearchDTO chatSearchDTO) {
        List<Chat> searchtMsg = chatService.searchMsg(chatSearchDTO);
        return new ResponseEntity<>(searchtMsg, HttpStatus.OK);
    }

    // 실시간 채팅 받기
    @GetMapping(value = "/history/{roomNum}")
    public ResponseEntity<?> receiveHitoryMessage(@PathVariable String roomNum) {
        List<Chat> responses = chatService.selectHistory(roomNum);
        if (!responses.isEmpty()) {
            responses.remove(responses.size() - 1);
        }
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
