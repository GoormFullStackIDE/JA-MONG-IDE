package com.groom.demo.chat.service;

import com.groom.demo.chat.dto.ChatRequest;
import com.groom.demo.chat.dto.ChatResponse;
import com.groom.demo.chat.dto.ChatSearchDTO;
import com.groom.demo.chat.entity.Chat;
import com.groom.demo.chat.repository.ChatReactRepository;
import com.groom.demo.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
    private final ChatReactRepository chatReactRepository;
    private final ChatRepository chatRepository;

    // 채팅 받기
    @Override
    public Flux<ChatResponse> select(String roomNo) {
        return chatReactRepository.findAllByRoomNo(roomNo)
                .map(this::chatToChatResponse).subscribeOn(Schedulers.boundedElastic());
    }

    // 채팅 보내기
    @Override
    public void insert(ChatRequest chatRequest, Long userId) {
        chatRepository.save(
                Chat.builder()
                        .senderNo(userId)
                        .roomNo(chatRequest.getRoomNo())
                        .msg(chatRequest.getMsg())
                        .isDeleted(false)
                        .createdAt(LocalDateTime.now())
                        .build()
        );
    }

    // 채팅 삭제
    @Override
    public void delete(Long msgNo, Long userNo) {

        Optional<Chat> chat = chatRepository.findById(msgNo);

        if (chat.isPresent() && chat.get().getSenderNo().equals(userNo)) {
            Chat tmp = chat.get();
            tmp.setDeleted(true);
            chatRepository.save(tmp);
            log.info("chat null");
        }
        log.info("chat ===== {}", chat.get());
    }


    // 채팅 형태 변환 -> 테이블 형태에서 Response Type으로 변환
    @Override
    public ChatResponse chatToChatResponse(Chat chat) {
        if (chat.isDeleted())
            chat.setMsg("삭제되었습니다.");
        return ChatResponse.builder()
                .no(chat.getNo())
                .msg(chat.getMsg())
                .createdAt(chat.getCreatedAt())
                .senderNo(chat.getSenderNo())
                .build();
    }

    // 채팅 내 검색
    @Override
    public List<Chat> searchMsg(ChatSearchDTO chatSearchDTO) {
        return chatRepository.findAllByRoomNoAndMsgLike(chatSearchDTO.getRoomNo(), chatSearchDTO.getMsg());

    }

    // 방의 과거 채팅 보기
    @Override
    public List<Chat> selectHistory(String roomNo) {
        return chatRepository.findAllByRoomNo(roomNo);
    }

}
