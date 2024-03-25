import { useRef, useState } from "react";
import { Resizable } from "re-resizable";
import { FileTreeContainer } from "./FileTree.style";
import { Tree } from "react-arborist";
import NodeFile from "./NodeFile";
import { CreateFileDiv, FileCreateBtn } from "./FileTree.style";
import { AiOutlineFolderAdd, AiOutlineFileAdd } from "react-icons/ai";
// import { useFileTreeStore } from "../../../store/useFileTreeStore";
// import { useEffect } from "react";
// import { fetchFileTree } from "../../../api/fileTreeApi";
import { file } from "./File";

function FileTree() {
    // const { files, setFiles } = useFileTreeStore();

    // useEffect(() => {
    //     const getFileTree = async () => {
    //         try {
    //             const data = await fetchFileTree();
    //             setFiles(data);
    //         } catch(error) {
    //             console.error('Failed to load file tree: ', error);
    //         }
    //     };

    //     getFileTree();
    // }, [setFiles]);

    const treeRef = useRef(null);

    const [term, setTerm] = useState("");

    // const onRename = ({ id, name }) => {
    //     const node = treeRef.current.get(id);
    //     if(node) node.data.name = name;
    // };

    // const onDelete = ({ ids }) => {};
    
    // const onCreate = ({ parentId, index, type }) => {};

    // const onMove = ({ dragIds, parentId, index }) => {};

    const createFileFolder = (
        <CreateFileDiv>
            <FileCreateBtn onClick={() => {treeRef.current.createLeaf(treeRef.current.root.id)}} title="New File">
                <AiOutlineFileAdd size="22px" />
            </FileCreateBtn>
            <FileCreateBtn onClick={() => {treeRef.current.createInternal(treeRef.current.root.id)}} title="New Folder">
                <AiOutlineFolderAdd size="22px" />
            </FileCreateBtn>
        </CreateFileDiv>
    );

    return (
        <Resizable
            defaultSize={{
                width: '250px',
                height: '100%',
            }}
            enable={{
                top: false,
                right: true,
                bottom: false,
                left: false,
                topRight: false,
                topLeft: false,
                bottomRight: false,
                bottomLeft: false,
            }}
        >
            <FileTreeContainer>
                <div className="folderFileActions">{createFileFolder}</div>
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="search-input" 
                    value={term} 
                    onChange={(e) => setTerm(e.target.value)} 
                />
                <Tree 
                    className="react-aborist" 
                    ref={treeRef} 
                    initialData={file}
                    // onCreate={onCreate}
                    // onRename={onRename}
                    // onMove={onMove}
                    // onDelete={onDelete}
                    width="100%" 
                    indent={24} 
                    rowHeight={28}
                    searchTerm={term}
                    searchMatch={(node, term) => node.data.name.toLowerCase().includes(term.toLowerCase())}    
                >
                    {(nodeProps) => <NodeFile {...nodeProps} />}
                </Tree>
            </FileTreeContainer>
        </Resizable>
    );
}

export default FileTree;