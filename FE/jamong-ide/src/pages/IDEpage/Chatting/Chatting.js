import { useState } from "react";
import { ChattingBtn, ChattingContainer, ContainerChatDiv } from "./Chatting.style";
import { IoChatbubbleOutline } from "react-icons/io5";
import ContainerChatting from "./ContainerChatting";

function Chatting() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickChat = () => {
        setIsOpen(!isOpen);
    }

    return (
        <ChattingContainer>
            <ChattingBtn onClick={handleClickChat}>
                <IoChatbubbleOutline size="28px" />
            </ChattingBtn>
            <ContainerChatDiv>
                {isOpen ? <ContainerChatting /> : <></>}
            </ContainerChatDiv>
        </ChattingContainer>
    );
}

export default Chatting;