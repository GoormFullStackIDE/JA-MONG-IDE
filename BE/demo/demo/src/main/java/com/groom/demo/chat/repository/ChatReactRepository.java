package com.groom.demo.chat.repository;

import com.groom.demo.chat.entity.Chat;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;


@Repository
public interface ChatReactRepository extends ReactiveMongoRepository<Chat, Long> {

    @Tailable
    @Query("{roomNo:?0}")
    Flux<Chat> findAllByRoomNo(String roomNo);

}
