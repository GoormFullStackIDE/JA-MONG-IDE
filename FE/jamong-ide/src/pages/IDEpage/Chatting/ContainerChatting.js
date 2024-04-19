import { useState } from "react";
import { ChatInput, ChatSubmit, ChatSubmitForm, ContainerChatDiv } from "./ContainerChatting.style";
import { IoIosSend } from "react-icons/io";
import useInterval from "../../../hooks/useInterval";
import axios from "axios";
import { getCurrentProjectId } from "../../../api/websocket";

function ContainerChatting() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const apiBaseUrl = "http://localhost:8088";

    useInterval(async () => {
        const { data } = await axios.get(`${apiBaseUrl}/jamong/chat/room-number/${getCurrentProjectId()}`);

        const isChanged = data.msg.length !== messages.length;
        if(isChanged) {
            setMessages(data.msg);
        }
    }, 1000)

    const handleSendMessage = async (e) => {
        e.preventDefault();
        // const token = localStorage.getItem('token');
        const sendMessage = {
            msg: message,
        }
        await axios.post(`${apiBaseUrl}/jamong/chat/room-number`, sendMessage);
        setMessage('');
    }

    const handleEnter = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage();
        }
    }

    return (
        <ContainerChatDiv>
            <div>
                {messages.map(({token, msg}, idx) => (
                    <div key={idx}>
                        <h3>{token}</h3>
                        <p>{msg}</p>
                    </div>
                ))}
            </div>
            <ChatSubmitForm onSubmit={handleSendMessage}>
                <ChatInput type="text" placeholder="메세지 입력하기" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleEnter} />
                <ChatSubmit disabled={message} type="submit">
                    <IoIosSend size="100%" />
                </ChatSubmit>
            </ChatSubmitForm>
        </ContainerChatDiv>
    );
}

export default ContainerChatting;