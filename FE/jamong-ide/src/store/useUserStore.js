import { create } from 'zustand';

const randId = Math.floor(Math.random() * 100);
const useUserStore = create(set => ({
    id: String(randId),
    name: '로그인안됨',
    imageUrl: 'https://liveblocks.io/avatars/avatar-4.png',
    cursorColor: '#00A86B',
    setUser: (id, name, imageUrl) => set({ id: id, name: name, imageUrl: imageUrl }),
    setNewName: (newName) => set({ name: newName }),
    email: '',
    setUserEmail: (email) => set({ email: email }),
}));

export default useUserStore;