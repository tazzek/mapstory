'use client';

import dynamic from 'next/dynamic';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';
import { NavigationRail, SecondaryPanelHeader } from './components/sidebar/Tabs';
import LocationTab from './components/sidebar/LocationTab';
import StyleTab from './components/sidebar/StyleTab';
import TextTab from './components/sidebar/TextTab';
import FrameTab from './components/sidebar/FrameTab';
import ZoomControl from './components/widgets/ZoomControl';
import PriceWidget from './components/widgets/PriceWidget';
import ShareAction from './components/widgets/ShareAction';
import FormatWidget from './components/widgets/FormatWidget';

// Dynamic import — nie renderuj MapCanvas po stronie serwera
const MapCanvas = dynamic(
    () => import('./components/canvas/MapCanvas'),
    {
        ssr: false, loading: () => (
            <div className="flex items-center justify-center h-full w-full">
                <div className="animate-pulse text-vintage-muted text-sm">Ładowanie canvas...</div>
            </div>
        )
    }
);

function ActiveTabContent() {
    const activeTab = usePosterStore((s) => s.activeTab);

    switch (activeTab) {
        case 'Lokalizacja': return <LocationTab />;
        case 'Styl': return <StyleTab />;
        case 'Typografia': return <TextTab />;
        case 'Wydruk':
        case 'Dodatki': return <FrameTab />;
        default: return null;
    }
}

export default function EditorPage() {
    const isFocusMode = usePosterStore((s) => s.isFocusMode);
    const toggleFocusMode = usePosterStore((s) => s.toggleFocusMode);

    return (
        <div className="flex h-screen pt-14 bg-white overflow-hidden font-sans">

            {/* 1. NAVIGATION RAIL */}
            <div
                className={`transition-all duration-500 ease-in-out border-r border-white bg-[#EBE9E4] overflow-y-auto ${isFocusMode ? 'w-0 opacity-0 overflow-hidden' : 'w-[230px] opacity-100'
                    }`}
            >
                <NavigationRail />
            </div>

            {/* 2. SECONDARY PANEL */}
            <div
                className={`relative transition-all duration-500 ease-in-out border-r border-vintage-border/30 bg-gradient-to-b from-white to-vintage-warm/10 ${isFocusMode ? 'w-0 opacity-0 overflow-hidden' : 'w-[350px] opacity-100'
                    }`}
            >
                <div className="p-8">
                    <SecondaryPanelHeader />
                    <ActiveTabContent />
                </div>

                {/* Sidebar Collapse Toggle - subtelnie na krawędzi */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-30">
                    <button
                        onClick={toggleFocusMode}
                        className="w-6 h-12 bg-white border border-vintage-border/40 rounded-full shadow-sm text-vintage-muted hover:text-vintage-primary hover:border-vintage-primary/30 transition-all flex items-center justify-center group"
                        style={{ transform: 'translateX(50%)' }}
                        title={isFocusMode ? 'Pokaż panel' : 'Tryb skupienia'}
                    >
                        {isFocusMode ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>
            </div>

            {/* 3. MAIN CANVAS */}
            <div className="flex-1 relative bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden">
                <MapCanvas />

                {/* Sidebar Collapse Toggle (Focus Mode) - widoczny tylko gdy zwinine */}
                {isFocusMode && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30">
                        <button
                            onClick={toggleFocusMode}
                            className="p-2 bg-white/90 backdrop-blur-sm border border-vintage-border/40 rounded-full shadow-md text-vintage-muted hover:text-vintage-primary transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Top right: Share + Room view */}
                <div className="absolute top-4 right-4 z-30">
                    <ShareAction />
                </div>

                {/* Bottom left: Zoom */}
                <div className="absolute bottom-6 left-6 z-30">
                    <ZoomControl />
                </div>

                {/* Bottom right: Price + Format */}
                <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-3">
                    <PriceWidget />
                    <FormatWidget />
                </div>
            </div>
        </div>
    );
}
