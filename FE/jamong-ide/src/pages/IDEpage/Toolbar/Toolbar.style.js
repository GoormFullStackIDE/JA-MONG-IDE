import { styled } from "styled-components";

export const ToolbarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    padding-top: 35px;
    background: ${(props) => props.theme.color.toolbar};

    .focused {
        background-color: ${(props) => props.theme.color.fileBg};
        color: ${(props) => props.theme.color.tabActive};
    }
`;

export const ToolbarIcon = styled.div`
    display: flex;
    justify-content: center;
    padding: 13px 0;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${(props) => props.theme.color.fileBg};
        color: ${(props) => props.theme.color.tabActive};
    }
`;