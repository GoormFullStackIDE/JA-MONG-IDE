import { useEffect, useRef } from "react";
import { useFileStore } from "../../../store/useFileStore";

export const CodeEditor = (fileId) => {
    const { files, updateFileContent } = useFileStore();
    const file = files.find((f) => f.id === fileId);

    const editorRef = useRef(null);
    const viewRef = useRef(null);

    useEffect(() => {
        if(!file || editorRef.current) return ;

        
    })
}