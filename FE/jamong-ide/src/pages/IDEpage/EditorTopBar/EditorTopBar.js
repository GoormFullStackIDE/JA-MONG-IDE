import { useFileStore } from "../../../store/useFileStore";
import { useFileTreeStore } from "../../../store/useFileTreeStore";
import axiosInstance from "../../../api/axiosInstance";
import { TopBarContainer, IDEBtnDiv } from "./EditorTopBar.style";

function EditorTopBar({ clientRef }) {
    const { files, selectedFileId } = useFileStore();
    const { findNodePath } = useFileTreeStore();

    const handleSave = async () => {
        if(selectedFileId) {
            const selectedFile = files.find((file) => file.id === selectedFileId);

            if(selectedFile) {
                const filePath = findNodePath(selectedFileId);
                const fileContent = selectedFile.content;
                console.log(selectedFileId);
                console.log(typeof selectedFileId);

                if(filePath) {
                    try {
                        await axiosInstance.put('/jamong/container/files', {
                            fileId: selectedFileId,
                            path: filePath,
                            content: fileContent,
                        });
                        console.log('selectedFile.content: ', selectedFile.content);
                        alert('파일이 저장되었습니다.');
                    } catch (error) {
                        console.error('파일 저장 중 오류 발생:', error);
                        alert('파일 저장에 실패했습니다.');
                    }
                }
            }
        }
    }

    const getCurrentProjectId = () => {
        if (typeof window !== 'undefined') {
            const path = window.location.pathname;
            const pathSegments = path.split('/');
            const projectId = pathSegments[2];
            return projectId;
        }
        return '';
      };

    const handleRun = () => {
        if (selectedFileId) {
            const selectedFile = files.find((file) => file.id === selectedFileId);
      
            if (selectedFile) {
                const filePath = findNodePath(selectedFileId); // 전체 파일 경로 찾기
                if (filePath) {
                    const content = {
                        path: '/',
                        command: selectedFile.language + ' .' + filePath,
                    };
                    console.log('content', content);
                    if (clientRef.current) {
                        clientRef.current.publish({
                            destination: `/jamong/container/${getCurrentProjectId()}/compile`,
                            body: JSON.stringify(content),
                        });
                    }
                }
            }
        }
    }

    return (
        <TopBarContainer>
            <IDEBtnDiv>
                <button onClick={handleSave}>저장</button>
                <button onClick={handleRun}>실행</button>
            </IDEBtnDiv>
        </TopBarContainer>
    );
}

export default EditorTopBar;