import FileTree from "./FileTree/FileTree";
// import CodeEditor from "./CodeEditor/CodeEditor";
import CodeMirrorEditor from "./CodeEditor/CodeMirrorEditor";
import Terminal from "./Terminal/Terminal";
import Compile from "./Compile/Compile";
import { ChattingContainer, CodeContainer, ContentContainer, EditorMain, IDEContainer, IDEContentCode, ResultContainer, Section, TabMenu } from "./IDEpage.style";
import Toolbar from "./Toolbar/Toolbar";
import { useState } from "react";
import Chatting from "./Chatting/Chatting";
import { useFileStore } from "../../store/useFileStore";
import EditorTopBar from "./EditorTopBar/EditorTopBar";
import EditorTab from "./EditorTab/EditorTab";
import { ThemeProvider } from "styled-components";
import { jamong, light, gray, dark } from "./Theme/theme";
import Invite from "./Invite/Invite";

function IDEpage() {
    const LocalTheme = window.localStorage.getItem('theme') || 'dark';
    const [currentTab, setCurrentTab] = useState(1);
    const [theme, setTheme] = useState(LocalTheme);
    const [open, setOpen] = useState(true);

    const { selectedFileId } = useFileStore();

    const selectMenuHandler = (index) => {
        setCurrentTab(index);
    }

    const handleThemeChange = (selectedTheme) => {
        setTheme(selectedTheme);
        window.localStorage.setItem('theme', selectedTheme);
    }

    const handleClickOpen = (selectedOpen) => {
        setOpen(selectedOpen);
    }

    const resultTab = [
        {name: '터미널', content: <Terminal />},
        {name: '디버그', content: <Compile />},
    ];

    return (
        <ThemeProvider theme={theme === 'light' ? light : (theme === 'gray' ? gray : (theme === 'dark' ? dark : jamong))}>
            <IDEContainer>
                {/* header */}
                <EditorTopBar />
                <IDEContentCode>
                    <ContentContainer>
                        <Toolbar theme={theme} onThemeChange={handleThemeChange} onTabChange={handleClickOpen}/>
                        {open ? <FileTree /> : <Invite />}                        
                    </ContentContainer>
                    <Section>
                        <CodeContainer>
                            <EditorTab />
                            {selectedFileId ? (
                                <CodeMirrorEditor fileId={selectedFileId} theme={theme} />
                            ) : (
                                <EditorMain>JA:MONG IDE</EditorMain>
                            )}
                        </CodeContainer>
                        <TabMenu>
                            {resultTab.map((element, index) => (
                                <li className={index === currentTab ? "submenu focused" : "submenu"} 
                                onClick={() => selectMenuHandler(index)}>{element.name}</li>
                            ))}
                        </TabMenu>
                        <ResultContainer>
                            {resultTab[currentTab].content}
                        </ResultContainer>
                    </Section>
                </IDEContentCode>
                <ChattingContainer>
                    <Chatting />
                </ChattingContainer>
            </IDEContainer>
        </ThemeProvider>
    );
}

export default IDEpage;