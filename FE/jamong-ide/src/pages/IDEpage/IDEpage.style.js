import styled from "styled-components";

export const IDEContainer = styled.div`
    flex-direction: column;
    max-width: 100%;
    overflow: hidden;
`;

export const IDEContentCode = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
    background: #D9D9D9;
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Section = styled.div`
    width: 100%;
`;

export const CodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    height: calc(100vh - 418px);
    background: ${(props) => props.theme.color.bg};
    overflow: hidden;
`;

export const EditorMain = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: 44px;
    color: ${(props) => props.theme.color.editorTitle};
`;

export const ResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    background: #000;
`;

export const TabMenu = styled.ul`
    display: flex;
    flex-direction: row;
    margin: 0;
    align-items: center;
    list-style: none;
    background-color: ${(props) => props.theme.color.resultTab};
    color: #000;
    font-weight: bold;
    
    .submenu {
        display: flex;
        height: 15px;
        line-height: 15px;
        padding: 8px 20px;
        background: #A19E9E;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
    }

    .focused {
        background-color: #fff;
        color: #000;
    }
`;

export const ChattingContainer = styled.div`
    width: 100vw;
`;