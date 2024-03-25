export const findNodeById = (nodes, nodeId, currentParentId) => {
    for (const node of nodes) {
        if (node.id === nodeId) {
            return { node, befParentId: currentParentId };
        }
        if (node.children) {
            const foundNode = findNodeById(node.children, nodeId, node.id);
            if (foundNode.node) {
                return foundNode;
            }
        }
    }
    return { node: null, befParentId: null };
};
export const findFilePath = (nodes, targetId, path = '') => {
    for (const node of nodes) {
        const currentPath = path === '' ? '/' + node.name : path + '/' + node.name;
        if (node.id === targetId) {
            return currentPath;
        }
        if (node.children) {
            const foundPath = findFilePath(node.children, targetId, currentPath);
            if (foundPath)
                return foundPath;
        }
    }
    return null;
};
export const findNodeIdByPath = (nodes, path) => {
    for (const node of nodes) {
        if (findFilePath([node], node.id) === path) {
            return node.id;
        }
        if (node.children) {
            const foundId = findNodeIdByPath(node.children, path);
            if (foundId)
                return foundId;
        }
    }
    return null;
};
//임시 -> '' 이름으로 노드 경로 찾기
export const findFilePathByName = (nodes, targetName, path = '') => {
    for (const node of nodes) {
        // 현재 노드의 경로 구성
        const currentPath = path === '' ? '/' + node.name : path + '/' + node.name;
        // 현재 노드의 이름이 타겟 이름과 일치하는지 확인
        if (node.name === targetName) {
            return currentPath;
        }
        // 자식 노드가 있는 경우, 재귀적으로 탐색
        if (node.children) {
            const foundPath = findFilePathByName(node.children, targetName, currentPath);
            if (foundPath)
                return foundPath;
        }
    }
    return null;
};
export const findNodeByIdWithoutP = (nodes, nodeId) => {
    for (const node of nodes) {
        if (node.id === nodeId) {
            return node; // 찾은 노드 반환
        }
        if (node.children) {
            const foundNode = findNodeByIdWithoutP(node.children, nodeId);
            if (foundNode) {
                return foundNode; // 자식 노드에서 찾은 노드 반환
            }
        }
    }
    return null; // 노드를 찾지 못했을 경우 null 반환
};
