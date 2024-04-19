import { create } from 'zustand';

const useCurrentOpenFileList = create(set => ({
    isShow: true,
    OpenFilesIdList: [],
    setOpenFilesIdList: fileId => set(state => ({
        OpenFilesIdList: state.OpenFilesIdList.concat(fileId),
    })),
}));
export default useCurrentOpenFileList;