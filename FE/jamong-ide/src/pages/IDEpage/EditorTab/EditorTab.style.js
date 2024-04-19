import styled from "styled-components";
import { AiOutlineClose } from 'react-icons/ai';

export const EditorTabContainer = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    color: ${(props) => props.theme.color.color};
`;

export const FileTab = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    background: ${(props) => props.theme.color.editorTab};
    text-align: center;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        opacity: 50%;
    }
`;

export const FileInfo = styled.div`
  padding-left: 15px;
  margin-right: 10px;
  font-size: 14px;
`;

export const CloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  width: 13px;
`;

export const FileClose = styled.div`
  display: flex;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;