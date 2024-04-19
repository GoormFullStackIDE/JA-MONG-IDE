import { useFileTreeStore } from '../store/useFileTreeStore';
import axiosInstance from './axiosInstance';
import { transformToFileNodeType } from '../utils/transNodeUtils';

export const checkFileTree = async (projectId) => {
    try {
        const { setFileTree } = useFileTreeStore.getState();

        const response = await axiosInstance.get(
            `/jamong/container/${projectId}/files`
        );
        const transformedData = transformToFileNodeType(response.data.results);
        setFileTree(transformedData); // Zustand 스토어에 저장

        return response;
    } catch (error) {
        console.error(error);
    }
};
