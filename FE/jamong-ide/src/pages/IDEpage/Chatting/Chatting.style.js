import styled from "styled-components";

export const ChattingContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 35px;
`;

export const ChattingBtn = styled.button`
    width: 30px;
    height: 30px;
    margin-right: 30px;
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        color: #ff6d59;
    }
`;

export const ContainerChatDiv = styled.div`
    
`;