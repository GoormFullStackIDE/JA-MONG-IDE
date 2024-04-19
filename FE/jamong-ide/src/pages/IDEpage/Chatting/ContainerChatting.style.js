import styled from "styled-components";

export const ContainerChatDiv = styled.div`
    position: absolute;
    bottom: 70px;
    right: 20px;
    width: 20vw;
    height: 60vh;
    border-radius: 10px;
    background: #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
`;

export const ChatSubmitForm = styled.form`
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

export const ChatInput = styled.input`
    width: 75%;
    height: 35px;
    padding: 0 7px;
    border: 1px solid #999;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    box-sizing: border-box;
`;

export const ChatSubmit = styled.button`
    width: 50px;
    height: 35px;
    padding: 5px 0;
    border: none;
    border-radius: 5px;
    background: #dfdfdf;
    color: #333;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease;

    &:hover {
        background: #333;
        color: #fff;
    }
`;