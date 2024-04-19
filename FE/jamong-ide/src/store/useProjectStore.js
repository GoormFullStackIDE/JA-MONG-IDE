import { create } from 'zustand';

const useProjectStore = create(set => ({
    executeState: {
        // 실행 요청 결과
        success: false,
        message: '',
        results: 'PENDING',
    },
    setExecuteState: (execute) => set({ executeState: execute }),
    status: 'PENDING',
    setStatus: (currentstatus) => set({ status: currentstatus }),
    currentProject: {
        // 생성된 프로젝트 정보
        id: '',
        name: '',
        description: '',
        programmingLanguage: '',
        createdAt: '',
        updatedAt: '',
    },
    invitedProjectId: '',
    projects: [], // 프로젝트 목록
    setProject: (project) => set({ currentProject: project }),
    setInvitedProjectId: (id) => set({ invitedProjectId: id }),
    addProject: (project) => set(state => ({
        projects: [...state.projects, project],
    })),
    cRef: null,
    setClient: (cref) => set({ cRef: cref }),
}));

export default useProjectStore;
