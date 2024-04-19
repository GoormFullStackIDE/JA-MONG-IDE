import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { CodeEditorContainer } from "./CodeEditor.style";
import { useFileStore } from "../../../store/useFileStore";
import { githubLight } from "@uiw/codemirror-theme-github";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { basicLight } from "@uiw/codemirror-theme-basic";
// import useDebounce from "./useDebounce";

const EXTENSIONS = {
    python: python(),
    cpp: cpp(),
    'c++': cpp(),
    java: java(),
    javascript: javascript(),
    typescript: javascript({ typescript: true }),
    jsx: javascript({ jsx: true }),
    tsx: javascript({ jsx: true, typescript: true }),
};

function CodeMirrorEditor(selectedFileId, theme) {
    const [language, setLanguage] = useState("java");
    const [value, setValue] = useState('');

    const filestore = useFileStore();
    const files = filestore.files;
    const file = files.find((f) => f.id === selectedFileId.fileId);

    const themeExtension = () => {
        switch(selectedFileId.theme) {
            case 'light':
                return githubLight;
            case 'gray':
                return darcula;
            case 'dark':
                return vscodeDark;
            case 'jamong':
                return basicLight;
            default:
                return vscodeDark;
        }
    }
    
    useEffect(() => {
        if(selectedFileId) {
            if(file) {
                setValue(file.content);
                setLanguage(file.language);
            }
        }
    }, [file, selectedFileId])

    return (
        <>
            <CodeEditorContainer>
                <CodeMirror
                    value={value}
                    onChange={(value) => {
                        setValue(value);
                    }}
                    theme={themeExtension()}
                    extensions={[EXTENSIONS[language]]}
                    basicSetup={{
                        autocompletion: true,
                        lineNumbers: true,
                        highlightActiveLine: true,
                        highlightSpecialChars: true,
                        history: true,
                        drawSelection: true,
                        dropCursor: true,
                        foldGutter: true,
                        allowMultipleSelections: true,
                        indentOnInput: true,
                        syntaxHighlighting: true,
                        rectangularSelection: true,
                        closeBrackets: true,
                        bracketMatching: true,
                        crosshairCursor: true,
                        highlightSelectionMatches: true,
                        closeBracketsKeymap: true,
                        searchKeymap: true,
                        foldKeymap: true,
                        completionKeymap: true,
                        lintKeymap: true
                    }}
                    minWidth={"500px"}
                    autoFocus={true}
                />
            </CodeEditorContainer>
        </>
    );
}

export default CodeMirrorEditor;