import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";
import { FitAddon } from "xterm-addon-fit";
import { TerminalContainer } from "./Terminal.style";

function Terminal() {
    const [currentPath, setCurrentPath] = useState("/");
    const [commands, setCommands] = useState("");

    const terminalRef = useRef(null);
    const fitAddon = new FitAddon();
    
    useEffect(() => {
        const xterm = new XTerm();
        const socket = io("http://13.209.68.42:8085");

        socket.on("connect", () => {
            console.log('Socket connected');
            if (terminalRef.current) {
                xterm.open(terminalRef.current);
                xterm.write("/: ");
                xterm.loadAddon(fitAddon);
                fitAddon.fit();
            }
            socket.on("terminalOutput", (output) => {
                const data = JSON.parse(output);
                
                if (data.error) {
                    xterm.write(`Error: ${data.error}\r\n`);
                } else {
                    const { path = currentPath, result = '' } = data;
                    // if (command) {
                    //     console.log(`command : ${path}: ${command}`);
                    //     xterm.write(`${path}: ${command}`);
                    // }
                    if (result) {
                        // const formattedResult = result.replace(/\t/g, ' ');
                        // console.log(`result : ${formattedResult}\r`);
                        // xterm.writeln(`${formattedResult}`);
                        console.log(`result : ${result}`);
                        console.log(`path : ${path}`);
                        const lines = result.split("\n");
                        lines.forEach((line) => xterm.write(line + '\r\n'));
                        // xterm.writeln(`${lines}`);
                    }
                    xterm.write(`${path}: `);
                }
                setCurrentPath(data.path || currentPath);
            });
                
                let currentCommand = "";
                
                xterm.onData((data) => {
                    const rmRegex = new RegExp('(rm\\s[a-zA-Z]{4,50}).(py|cpp|java|js)');
                    // 키보드 입력 시 서버로 메시지 전송
                    if(currentCommand === 'clear' || currentCommand === 'cls') {
                        xterm.reset();
                        setCommands('');
                    } else if(rmRegex.test(currentCommand)) {
                        setCommands('');
                    }

                    switch(data) {
                        case '\r':
                            if(currentCommand.trim().startsWith('cd ')) {
                                const newPath = currentCommand.slice(3).trim();
                                const absolutePath = newPath.startsWith('/') ? newPath : `${currentPath}/${newPath}`;
                                socket.emit("cd", JSON.stringify({ path: absolutePath }));
                                setCurrentPath(absolutePath);
                            } else {
                                socket.emit("command", JSON.stringify({ path: currentPath, command: currentCommand }));
                            }
                            setCommands((prevCommands) => prevCommands + currentCommand);
                            console.log(currentPath);
                            // setCurrentPath(currentPath);
                            xterm.writeln('');
                            currentCommand = "";
                            break;
                        case '\x7F':
                            if (currentCommand.length) {
                                xterm.write('\b \b'); // 백스페이스 키가 눌렸을 때만 실행
                                currentCommand = currentCommand.slice(0, -1);
                            }
                            break;
                        default: 
                            currentCommand += data;
                            xterm.write(data);
                    }
                });
        });
      
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <TerminalContainer>
            <div
                ref={terminalRef}
                className="terminal-container"
                addons={[fitAddon]}
            ></div>
        </TerminalContainer>
    )
}

export default Terminal;