export const transformToFileNodeType = (nodes) => {
    return nodes.map(node => {
        const fileNode = Object.assign({ id: node.id, name: node.name, type: node.type, isDirty: false, isOpened: false, filePath: node.path, parentId: node.id }, (node.type === 'DIRECTORY' &&
            node.children && { children: transformToFileNodeType(node.children) }));
        return fileNode;
    });
};