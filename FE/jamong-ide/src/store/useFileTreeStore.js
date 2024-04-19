import { create } from 'zustand';
import { addNodeToTree, removeNodeById } from '../utils/fileTreeUtils';
import { processWebSocketFileEvent } from '../utils/fileTreeSocketUtils';
import { findFilePath, findFilePathByName, } from '../utils/findNodeUtils';

export const useFileTreeStore = create(set => ({
    file: null,
    fileTree: [],
    setFileTree: fileTree => set({ fileTree }),
    updateNodeName: (nodeId, newName) => set(state => ({
        fileTree: state.fileTree.map(node => {
            return node.id === nodeId ? Object.assign(Object.assign({}, node), { name: newName }) : node;
        }),
    })),
    addNode: (newNode, parentId) => set(state => {
        return {
            fileTree: parentId
                ? addNodeToTree(state.fileTree, newNode, parentId)
                : [...state.fileTree, newNode],
        };
    }),
    deleteNode: nodeId => set(state => ({
        fileTree: removeNodeById(state.fileTree, nodeId),
    })),
    findNodePath: (nodeid) => {
        const state = useFileTreeStore.getState();
        return findFilePath(state.fileTree, nodeid);
    },
    findNodePathByName: (nodename) => {
        const state = useFileTreeStore.getState();
        return findFilePathByName(state.fileTree, nodename);
    },
    handleWebSocketFileEvent: (fileData) => {
        set(state => ({
            fileTree: processWebSocketFileEvent(state.fileTree, fileData),
        }));
    },
    isNewNode: false,
    setIsNewNode: isNewNode => set({ isNewNode }),
}));
