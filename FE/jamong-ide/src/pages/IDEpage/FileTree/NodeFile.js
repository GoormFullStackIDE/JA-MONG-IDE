import { FileDiv, NodeContainer } from "./FileTree.style";
import { GoFile } from "react-icons/go";
import { SlArrowDown, SlArrowRight } from "react-icons/sl";
import { FaFolderOpen, FaFolder } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import LanguageLogo from "./LanguageLogo";
import useHandleOpenFile from "../../../hooks/useHandleOpenFile";
import { findLanguage } from "../../../utils/findFileLangUtils";
import { useFileTreeStore } from "../../../store/useFileTreeStore";
import { useFileStore } from "../../../store/useFileStore";

function NodeFile({ node, style, dragHandle, tree }) {
    const fileStore = useFileStore();

    const handleFileOpenAndUpdate = (fileId, newName, content) => {
        const language = findLanguage(newName.split('.').at(-1) || 'python');
        fileStore.openFile(fileId, newName, language, content);
        console.log(fileId, newName, language, content);
    }

    const isDefaultFile = (fileName) => {
        const extensions = ['py', 'cpp', 'java', 'js'];
        const fileType = fileName.toLowerCase().split('.').pop();
        return !extensions.includes(fileType);
    }

    return (
        <>
            <NodeContainer className="node-container" style={style} ref={dragHandle}>
                <FileDiv 
                    className="node-content" 
                    onClick={(e) => {
                        e.preventDefault();
                        node.isInternal ? node.toggle() : 
                        handleFileOpenAndUpdate(node.id, node.data.name, node.data.content);
                    }}>
                    {node.isLeaf ? (
                        <span style={{margin: '0px 3px 0px 25px'}}>
                            {isDefaultFile(node.data.name) ? (
                                <GoFile size="18px" />
                            ) : (
                                <LanguageLogo fileName={node.data.name} />
                            )}
                        </span>
                    ) : (
                        <>
                            <span style={{margin: '0px 3px 0px 15px'}}>
                                {node.isOpen ? <SlArrowDown size="10px" /> : <SlArrowRight size="10px" />}
                            </span>
                            <span style={{margin: '0px 5px'}}>
                                {node.isOpen ? <FaFolderOpen size="18px" /> : <FaFolder size="16px" />}
                            </span>
                        </>
                    )}

                    <span 
                        className="node-text" 
                        onDoubleClick={(e) => {
                            e.preventDefault();
                            node.edit();
                        }}
                    >
                        {node.isEditing ? (
                            <input 
                                type="text" 
                                defaultValue={node.data.name} 
                                onFocus={(e) => e.currentTarget.select()}
                                onBlur={() => node.reset()}
                                onKeyDown={(e) => {
                                    if(e.key === 'Escape') node.reset();
                                    if(e.key === 'Enter') node.submit(e.currentTarget.value);
                                }}
                                autoFocus
                            />
                        ) : (
                            <span>{node.data.name}</span>
                        )}
                    </span>
                </FileDiv>
                <div className="file-actions">
                    <div className="fileFolderActions">
                        <button onClick={() => node.edit()} title="Rename">
                            <MdEdit />
                        </button>
                        <button onClick={() => tree.delete(node.id)} title="Delete">
                            <RxCross2 />
                        </button>
                    </div>
                </div>
            </NodeContainer>
        </>
    );
}

export default NodeFile;