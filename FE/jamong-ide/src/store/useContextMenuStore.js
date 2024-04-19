import { create } from 'zustand';

export const useContextMenuStore = create(set => ({
    hoveredId: '',
    setHoveredId: hoveredId => set({ hoveredId }),
}));