package com.groom.demo.chat.repository;

import com.groom.demo.chat.entity.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChatRepository extends MongoRepository<Chat, Long> {
    // 메시지 검색 쿼리문
    List<Chat> findAllByRoomNoAndMsgLike(String roomNo, String msg);
    List<Chat> findAllByRoomNo(String roomNo);
}
