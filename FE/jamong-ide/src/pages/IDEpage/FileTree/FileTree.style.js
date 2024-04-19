import { styled } from "styled-components";

export const FileTreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.fileBg};
    box-sizing: border-box;
    color: ${(props) => props.theme.color.fileText};

    .search-input {
        width: 80%;
        height: 25px;
        padding: 0 5px;
        margin: 5px auto 10px;
        border: 1px solid #777;
        background-color: ${(props) => props.theme.color.searchBg};
        font-size: 14px;
        color: #fff;
        outline: none;
    }

    .react-aborist {
        width: 100%;
    }
`;

export const NodeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;

    .file-actions {
        display: none;
    }

    .file-actions button {
        margin-right: 5px;
        border: none;
        background: none;
        cursor: pointer;
    }

    &:hover {
        background: rgba(90, 143, 224, 0.7);
    }

    &:hover .file-actions {
        display: block;
    }

    .node-text {
        margin: 0px 3px;
    }
`;

export const FileDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 10px;

    .node-text {
        padding-right: 0;
        margin-right: 0;
    }

    .node-text input {
        width: 50%;
        margin: 0;
        padding: 0;
        border: 1px solid #777;
        background: #212426;
        color: #fff;
        outline: none;
    }
`;

export const CreateFileDiv = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
    background: #fff;
`;

export const FileCreateBtn = styled.button`
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(90, 143, 224, 0.7);;
    }
`;