'use client';

import dynamic from 'next/dynamic';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';
import { NavigationRail, SecondaryPanelHeader } from './components/sidebar/Tabs';
import LocationTab from './components/sidebar/LocationTab';
import StyleTab from './components/sidebar/StyleTab';
import TextTab from './components/sidebar/TextTab';
import FrameTab from './components/sidebar/FrameTab';
import ZoomUiWidget from './components/widgets/ZoomUiWidget';
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
        case 'Tytuły': return <TextTab />;
        case 'Wydruk':
        case 'Dodatki': return <FrameTab />;
        default: return null;
    }
}

export default function EditorPage() {
    const isFocusMode = usePosterStore((s) => s.isFocusMode);
    const toggleFocusMode = usePosterStore((s) => s.toggleFocusMode);

    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans max-md:flex-col-reverse">

            {/* 1. NAVIGATION RAIL */}
            <div
                className={`transition-all duration-500 ease-in-out border-r border-white bg-[#EBE9E4] overflow-y-auto flex-shrink-0 ${isFocusMode ? 'w-0 opacity-0 overflow-hidden max-md:w-full max-md:h-0 max-md:border-t-0' : 'w-[230px] opacity-100 max-[1367px]:w-[100px] max-md:w-full max-md:h-[80px] max-md:border-r-0 max-md:border-t max-md:z-50 max-md:bg-[#EBE9E4] max-md:pb-safe max-md:overflow-visible'
                    }`}
            >
                <NavigationRail />
            </div>

            {/* 2. SECONDARY PANEL */}
            <div
                className={`relative transition-all duration-500 ease-in-out border-r border-vintage-border/30 bg-gradient-to-b from-white to-vintage-warm/10 flex-shrink-0 ${isFocusMode ? 'w-0 opacity-0 overflow-hidden max-md:translate-y-full max-md:h-0 max-md:w-full' : 'w-[350px] opacity-100 max-[1367px]:w-[320px] max-md:absolute max-md:bottom-[80px] max-md:left-0 max-md:w-full max-md:h-[35vh] max-md:z-40 max-md:rounded-t-3xl max-md:shadow-[0_-5px_25px_rgba(0,0,0,0.1)] max-md:bg-white'
                    }`}
            >
                {/* Drag handle on mobile */}
                <div className="hidden max-md:flex flex-col items-center w-full justify-center pt-2 pb-2 absolute top-0 left-0 z-10 bg-gradient-to-b from-white to-white/0 rounded-t-3xl pointer-events-none">
                    <ChevronDown size={16} className="text-vintage-muted opacity-60 mb-0.5" />
                    <div className="w-12 h-1 bg-vintage-border/70 rounded-full" />
                </div>

                <div
                    className="px-8 pb-8 max-md:pt-8 max-md:px-5 max-md:overflow-y-auto max-md:h-full"
                    style={{ paddingTop: 'calc(var(--spacing) * 15)' }}
                >
                    <SecondaryPanelHeader />
                    <ActiveTabContent />
                </div>

                {/* Sidebar Collapse Toggle - subtelnie na krawędzi */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-30 max-md:hidden">
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
            <div className={`flex-1 relative bg-gradient-to-br from-stone-50 to-stone-100 overflow-hidden transition-all duration-500 max-md:w-full ${isFocusMode ? 'max-md:h-screen' : 'max-md:pb-[35vh]'}`}>
                <MapCanvas />

                {/* Sidebar Collapse Toggle (Focus Mode) - widoczny tylko gdy zwinine */}
                {isFocusMode && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 max-md:top-4 max-md:left-auto max-md:right-4 max-md:hidden">
                        <button
                            onClick={toggleFocusMode}
                            className="p-2 bg-white/90 backdrop-blur-sm border border-vintage-border/40 rounded-full shadow-md text-vintage-muted hover:text-vintage-primary transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Mobile focus mode toggle */}
                {isFocusMode && (
                    <div className="hidden max-md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up">
                        <button
                            onClick={toggleFocusMode}
                            className="px-6 py-3 bg-white/95 backdrop-blur-md border border-vintage-border/40 rounded-full shadow-xl text-vintage-text font-bold text-xs uppercase tracking-widest hover:text-vintage-primary hover:scale-105 transition-all items-center gap-2"
                        >
                            Wróć do edycji
                        </button>
                    </div>
                )}

                {/* Top right: Share + Room view */}
                <div className="absolute top-4 right-4 z-30 max-md:top-4 max-md:right-4">
                    <ShareAction />
                </div>

                {/* Bottom left: Zoom */}
                <div className="absolute bottom-6 left-6 z-30 transition-all duration-500 max-[1367px]:bottom-6 max-md:hidden">
                    <ZoomUiWidget />
                </div>

                {/* Bottom right: Price + Format */}
                <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-3 transition-all duration-500 max-[1367px]:bottom-6 max-md:top-4 max-md:left-4 max-md:right-auto max-md:bottom-auto max-md:items-start max-md:flex-col-reverse">
                    <PriceWidget />
                    <FormatWidget />
                </div>
            </div>
        </div>
    );
}
