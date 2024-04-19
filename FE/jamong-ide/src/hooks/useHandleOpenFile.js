import { useFileStore } from '../store/useFileStore';
import axiosInstance from '../api/axiosInstance';

const useHandleOpenFile = () => {
    const fileStore = useFileStore();

    const handleOpenFile = async (fileId, fileName, fileLanguage) => {
        try {
            const response = await axiosInstance.get(`/jamong/container/files`);
            const fileContent = response.data.content;

            fileStore.openFile(fileId, fileName, fileLanguage, fileContent);
            fileStore.selectFile(fileId);
        } catch (error) {
            console.error('Error fetching file content:', error);
        }
    };

    return handleOpenFile;
};

export default useHandleOpenFile;