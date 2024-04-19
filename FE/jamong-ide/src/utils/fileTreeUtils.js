//트리에 노드 추가하는 함수
export const addNodeToTree = (nodes, newNode, parentId) => nodes.map(node => {
    if (node.id === parentId) {
        return Object.assign(Object.assign({}, node), { children: [...(node.children || []), newNode] });
    }
    else {
        return Object.assign(Object.assign({}, node), { children: node.children
                ? addNodeToTree(node.children, newNode, parentId)
                : node.children });
    }
});
//트리 노드 삭제하는 함수
export const removeNodeById = (nodes, nodeId) => {
    return nodes.reduce((acc, node) => {
        if (node.id !== nodeId) {
            const newNode = Object.assign({}, node);
            if (node.children) {
                newNode.children = removeNodeById(node.children, nodeId);
            }
            acc.push(newNode);
        }
        return acc;
    }, []);
};
//노드 이름 확인하는 함수
export const isCorrectName = (inputName) => {
    if (inputName === '') {
        alert('한 글자 이상 입력하세요.');
        return false;
    }
    else if (inputName === '.' || inputName === '..') {
        alert(`${inputName}이라는 이름은 파일 또는 폴더 이름으로 올바르지 않습니다. 다른 이름을 입력하세요.`);
        return false;
    }
    return true;
};
