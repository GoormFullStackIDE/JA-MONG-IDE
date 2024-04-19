import styled from "styled-components";

export const InviteContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.color.fileBg};
    box-sizing: border-box;
    color: ${(props) => props.theme.color.fileText};
`;