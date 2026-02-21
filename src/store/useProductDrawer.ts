import { create } from 'zustand';

interface ProductDrawerState {
    isOpen: boolean;
    activeBg: string;
    openDrawer: () => void;
    closeDrawer: () => void;
    setActiveBg: (bg: string) => void;
}

export const useProductDrawerStore = create<ProductDrawerState>((set) => ({
    isOpen: false,
    activeBg: 'bg-vintage-paper', // Default neutral theme
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false, activeBg: 'bg-vintage-paper' }), // Reset to neutral when closed
    setActiveBg: (bg) => set({ activeBg: bg }),
}));
