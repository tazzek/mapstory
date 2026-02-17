import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PosterConfig, EditorTab, PosterSize } from '@/types/poster';

// --- Pricing ---

export interface Pricing {
    basePrice: number;       // cena bazowa w PLN
    discountPercent: number; // np. 20 = -20%
    promoCode: string | null;
    quantity: number;
    finalPrice: number;      // obliczona automatycznie
    formattedPrice: string;  // np. "143 PLN"
}

const BASE_PRICES: Record<PosterSize | 'digital', number> = {
    '30x40': 149,
    '50x70': 179,
    '70x100': 229,
    digital: 49,
};

function computePricing(base: number, discountPercent: number, quantity: number): { finalPrice: number; formattedPrice: string } {
    const discounted = Math.round(base * (1 - discountPercent / 100));
    const total = discounted * quantity;
    return { finalPrice: total, formattedPrice: `${total} PLN` };
}

// --- Store ---

interface PosterState {
    // Config
    config: PosterConfig;

    // Pricing
    pricing: Pricing;

    // UI state
    activeTab: EditorTab;
    visitedSteps: EditorTab[];
    zoomLevel: number;
    showRoomView: boolean;
    isFocusMode: boolean;

    // Actions — config
    updateConfig: (partial: Partial<PosterConfig>) => void;
    resetSection: (tab: EditorTab) => void;

    // Actions — pricing
    applyPromoCode: (code: string, discountPercent: number) => void;
    clearPromoCode: () => void;
    setQuantity: (qty: number) => void;
    recalcPrice: () => void;

    // Actions — UI
    setActiveTab: (tab: EditorTab) => void;
    setZoom: (level: number) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    toggleRoomView: () => void;
    toggleFocusMode: () => void;
}

const DEFAULT_CONFIG: PosterConfig = {
    location: 'Kennedy Space Center',
    lat: 52.2297,
    lng: 21.0122,
    title: 'KENNEDY SPACE CENTER',
    subtitle: 'LC-39B • 28.63° N, 80.62° W',
    style: 'vintage',
    size: '50x70',
    orientation: 'portrait',
    showCoordinates: true,
    isDigital: false,
    marker: {
        enabled: false,
        style: 'heart',
        color: '#A88B5E',
    },
};

export const usePosterStore = create<PosterState>()(
    persist(
        (set, get) => ({
            config: DEFAULT_CONFIG,
            pricing: {
                basePrice: BASE_PRICES['50x70'],
                discountPercent: 0,
                promoCode: null,
                quantity: 1,
                ...computePricing(BASE_PRICES['50x70'], 0, 1),
            },
            activeTab: 'Lokalizacja',
            visitedSteps: ['Lokalizacja'],
            zoomLevel: 100,
            showRoomView: false,
            isFocusMode: false,

            updateConfig: (partial) => {
                set((state) => ({
                    config: { ...state.config, ...partial },
                }));
                // Przelicz cenę po zmianie konfiguracji
                get().recalcPrice();
            },

            resetSection: (tab) => {
                set((state) => {
                    switch (tab) {
                        case 'Lokalizacja':
                            return { config: { ...state.config, location: DEFAULT_CONFIG.location } };
                        case 'Styl':
                            return {
                                config: {
                                    ...state.config,
                                    style: DEFAULT_CONFIG.style,
                                    marker: { ...DEFAULT_CONFIG.marker },
                                },
                            };
                        case 'Typografia':
                            return {
                                config: {
                                    ...state.config,
                                    title: DEFAULT_CONFIG.title,
                                    subtitle: DEFAULT_CONFIG.subtitle,
                                    showCoordinates: true,
                                    customCoordinates: undefined,
                                },
                            };
                        case 'Wydruk':
                            return {
                                config: { ...state.config, size: DEFAULT_CONFIG.size, isDigital: false },
                            };
                        default:
                            return {};
                    }
                });
                get().recalcPrice();
            },

            setActiveTab: (tab) =>
                set((state) => ({
                    activeTab: tab,
                    visitedSteps: state.visitedSteps.includes(tab)
                        ? state.visitedSteps
                        : [...state.visitedSteps, tab],
                })),

            // --- Pricing actions ---
            applyPromoCode: (code, discountPercent) =>
                set((state) => {
                    const computed = computePricing(state.pricing.basePrice, discountPercent, state.pricing.quantity);
                    return { pricing: { ...state.pricing, promoCode: code, discountPercent, ...computed } };
                }),

            clearPromoCode: () =>
                set((state) => {
                    const computed = computePricing(state.pricing.basePrice, 0, state.pricing.quantity);
                    return { pricing: { ...state.pricing, promoCode: null, discountPercent: 0, ...computed } };
                }),

            setQuantity: (qty) =>
                set((state) => {
                    const computed = computePricing(state.pricing.basePrice, state.pricing.discountPercent, qty);
                    return { pricing: { ...state.pricing, quantity: qty, ...computed } };
                }),

            recalcPrice: () =>
                set((state) => {
                    const key = state.config.isDigital ? 'digital' : state.config.size;
                    const basePrice = BASE_PRICES[key] ?? BASE_PRICES['50x70'];
                    const computed = computePricing(basePrice, state.pricing.discountPercent, state.pricing.quantity);
                    return { pricing: { ...state.pricing, basePrice, ...computed } };
                }),

            setZoom: (level) => set({ zoomLevel: level }),
            zoomIn: () =>
                set((state) => ({ zoomLevel: Math.min(state.zoomLevel + 10, 200) })),
            zoomOut: () =>
                set((state) => ({ zoomLevel: Math.max(state.zoomLevel - 10, 50) })),
            toggleRoomView: () =>
                set((state) => ({ showRoomView: !state.showRoomView })),
            toggleFocusMode: () =>
                set((state) => ({ isFocusMode: !state.isFocusMode })),
        }),
        {
            name: 'mapstory-poster',
            partialize: (state) => ({
                config: state.config,
                activeTab: state.activeTab,
                visitedSteps: state.visitedSteps,
            }),
        }
    )
);
