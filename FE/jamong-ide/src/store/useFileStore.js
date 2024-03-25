import { create } from 'zustand';

export const useFileStore = create(set => ({
    // file: '',
    files: [],
    selectedFileId: null,
    openFile: (fileId, name, language, content = '') => {
        set(state => {
            const existingFile = state.files.find(f => f.id === fileId);
            if (existingFile) {
                return {...state, selectedFileId: fileId};
            }
            const newFile = {
                id: fileId,
                name,
                content,
                language,
                isOpened: true,
            };
            return {
                files: [...state.files, newFile],
                selectedFileId: fileId,
            };
        });
    },
    closeFile: fileId => {
        set(state => ({
            files: state.files.filter(file => file.id !== fileId),
            selectedFileId: state.selectedFileId === fileId ? null : state.selectedFileId,
        }));
    },
    selectFile: fileId => {
        set({ selectedFileId: fileId });
    },
    updateFileContent: (fileId, newContent) => {
        set(state => ({
            files: state.files.map(file => file.id === fileId ? { ...file, content: newContent } : file),
        }));
    },
    updateFileName: (fileId, newName) => {
        set(state => ({
            files: state.files.map(file => file.id === fileId ? { ...file, name: newName } : file),
        }));
    },
}));
