import axiosInstance from "./axiosInstance";

export const fetchFileTree = async () => {
    try {
        const response = await axiosInstance.get('/jamong/container/files');
        return response.data;
    } catch(error) {
        console.error('Error fetching file tree: ', error);
        throw error;
    }
};