import styled from "styled-components";

export const TopBarContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100vw;
    height: 35px;
    background: ${(props) => props.theme.color.toolbar};
`;

export const IDEBtnDiv = styled.div`
    margin-right: 100px;

    button {
        width: 50px;
        height: 28px;
        margin-right: 10px;
        border: none;
        border-radius: 4px;
        background: #fff;
        color: #000;
        font-size: 14px;
        outline: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    button:hover {
        background: #ff6d59;
        color: #fff;
    }
`;