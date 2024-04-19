import { useFileStore } from "../../../store/useFileStore";
import { EditorTabContainer, FileTab, FileClose, CloseIcon, FileInfo } from "./EditorTab.style";

function EditorTab() {
    const { files, selectFile, closeFile } = useFileStore();

    return (
        <EditorTabContainer>
            {files.map((file) => (
                <FileTab key={file.id} onClick={() => selectFile(file.id)}>
                    <FileInfo>{file.name}</FileInfo>
                    <FileClose 
                        onClick={(e) => {
                            e.stopPropagation();
                            closeFile(file.id);
                        }}
                    >
                    <CloseIcon />
                    </FileClose>
                </FileTab>
            ))}
        </EditorTabContainer>
    );
}

export default EditorTab;