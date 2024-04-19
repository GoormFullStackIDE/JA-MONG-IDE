package com.groom.demo.chat.config;

import com.groom.demo.chat.entity.Chat;
import com.groom.demo.chat.service.SequenceGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ChatListener extends AbstractMongoEventListener<Chat> {

    private final SequenceGeneratorService generatorService;

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Chat> event) {
        event.getSource().setNo(generatorService.generateSequence(Chat.SEQUENCE_NAME));
    }
}
