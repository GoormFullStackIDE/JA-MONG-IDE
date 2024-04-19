import { useFileTreeStore } from '../store/useFileTreeStore';
import useTokenStore from '../store/useTokenStore';
import io from 'socket.io-client';

export const getCurrentProjectId = () => {
    if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const pathSegments = path.split('/');
        const projectId = pathSegments[3];
        return projectId;
    }
    return '';
};

export const testWebsocket = {
    projectId: getCurrentProjectId(),
    token: useTokenStore.getState().accessToken,
};

const initializeWebSocket = () => {
    const socket = io(`https://jamongide.kdr.kr`, {
        auth: {
            token: testWebsocket.token,
            projectId: getCurrentProjectId(),
        },
    });

    console.log('새로운 소켓', socket);
    return socket;
};

const subscribeFile = (socket, projectId) => {
    socket.on(`jamong/container/${projectId}/files`, file => {
        console.log('file connected');
        console.log(`Received: ${file}`);
        const fileData = JSON.parse(file);
        useFileTreeStore.getState().handleWebSocketFileEvent(fileData);
    });
};

export { initializeWebSocket, subscribeFile };
