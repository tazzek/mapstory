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

const BASE_PRICES: Record<string, number> = {
    'poster_30x40': 89,
    'poster_40x50': 109,
    'poster_50x70': 149,
    'poster_70x100': 199,
    'canvas_30x40': 159,
    'canvas_40x50': 199,
    'canvas_50x70': 259,
    'canvas_70x100': 349,
    'digital': 49,
};

const FRAME_PRICE = 39;

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
    toggleFocusMode: () => void;

    // Room View
    showRoomView: boolean;
    toggleRoomView: () => void;

    // Mapbox Control
    mapZoomAction: 'in' | 'out' | 'reset' | null;
    setZoomAction: (action: 'in' | 'out' | 'reset' | null) => void;
}

const DEFAULT_CONFIG: PosterConfig = {
    location: 'Gdańsk, Polska',
    lat: 54.3520,
    lng: 18.6466,
    title: 'GDAŃSK',
    subtitle: '54.3520° N, 18.6466° E',
    style: 'vintage',
    mask: 'rectangle',
    material: 'poster',
    frame: 'none',
    size: '50x70',
    orientation: 'portrait',
    showCoordinates: true,
    isDigital: false,
    fontFamily: 'serif',
    textAlign: 'center',
    subtitleMode: 'coordinates',
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
                basePrice: BASE_PRICES['poster_50x70'],
                discountPercent: 0,
                promoCode: null,
                quantity: 1,
                ...computePricing(BASE_PRICES['poster_50x70'], 0, 1),
            },
            activeTab: 'Lokalizacja',
            visitedSteps: [],
            zoomLevel: 100,
            isFocusMode: false,
            showRoomView: false,

            toggleRoomView: () => set((state) => ({ showRoomView: !state.showRoomView })),

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
                        case 'Tytuły':
                            return {
                                config: {
                                    ...state.config,
                                    title: DEFAULT_CONFIG.title,
                                    subtitle: DEFAULT_CONFIG.subtitle,
                                    showCoordinates: true,
                                    customCoordinates: undefined,
                                    fontFamily: DEFAULT_CONFIG.fontFamily,
                                    textAlign: DEFAULT_CONFIG.textAlign,
                                    subtitleMode: DEFAULT_CONFIG.subtitleMode,
                                },
                            };
                        case 'Wydruk':
                            return {
                                config: {
                                    ...state.config,
                                    material: DEFAULT_CONFIG.material,
                                    frame: DEFAULT_CONFIG.frame,
                                    size: DEFAULT_CONFIG.size,
                                    isDigital: false
                                },
                            };
                        default:
                            return {};
                    }
                });
                get().recalcPrice();
            },

            setActiveTab: (tab) =>
                set((state) => {
                    const prevTab = state.activeTab;
                    if (prevTab === tab) return state;

                    const newVisited = state.visitedSteps.includes(prevTab)
                        ? state.visitedSteps
                        : [...state.visitedSteps, prevTab];

                    return {
                        activeTab: tab,
                        visitedSteps: newVisited,
                    };
                }),

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
                    let basePrice = 0;
                    if (state.config.isDigital) {
                        basePrice = BASE_PRICES.digital;
                    } else {
                        const key = `${state.config.material}_${state.config.size}`;
                        basePrice = BASE_PRICES[key] || 149;

                        // Add frame price only for poster
                        if (state.config.material === 'poster' && state.config.frame !== 'none') {
                            basePrice += FRAME_PRICE;
                        }
                    }

                    const computed = computePricing(basePrice, state.pricing.discountPercent, state.pricing.quantity);
                    return { pricing: { ...state.pricing, basePrice, ...computed } };
                }),

            setZoom: (level) => set({ zoomLevel: level }),
            zoomIn: () =>
                set((state) => ({ zoomLevel: Math.min(state.zoomLevel + 10, 200) })),
            zoomOut: () =>
                set((state) => ({ zoomLevel: Math.max(state.zoomLevel - 10, 50) })),
            toggleFocusMode: () =>
                set((state) => ({ isFocusMode: !state.isFocusMode })),

            mapZoomAction: null,
            setZoomAction: (action) => set({ mapZoomAction: action }),
        }),
        {
            name: 'mapstory-poster-v3',
            partialize: (state) => ({
                config: state.config,
                activeTab: state.activeTab,
                visitedSteps: state.visitedSteps,
            }),
        }
    )
);
