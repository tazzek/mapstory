'use client';

import dynamic from 'next/dynamic';
import { LuChevronLeft, LuChevronRight, LuChevronDown, LuChevronUp } from 'react-icons/lu';
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
    const isMobilePanelOpen = usePosterStore((s) => s.isMobilePanelOpen);
    const toggleMobilePanel = usePosterStore((s) => s.toggleMobilePanel);

    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans mobile:flex-col">

            {/* 1. NAVIGATION RAIL */}
            {/* Desktop: Order 1 (Left), Mobile: Order 3 (Bottom) */}
            {!isFocusMode && (
                <div
                    className="w-[230px] tablet:w-[100px] mobile:w-full mobile:h-[84px] bg-[#EBE9E4] border-r border-white mobile:border-r-0 mobile:border-t flex-shrink-0 z-[60] 
                    order-1 mobile:order-3"
                >
                    <NavigationRail />
                </div>
            )}

            {/* 2. SECONDARY PANEL (Drawer) */}
            {/* Desktop: Order 2 (Middle), Mobile: Order 2 (Middle) */}
            {!isFocusMode && (
                <div
                    className={`relative transition-all duration-500 ease-in-out border-r border-vintage-border/30 bg-white flex-shrink-0 z-50 
                        order-2 mobile:order-2
                        ${isMobilePanelOpen ? 'w-[350px] tablet:w-[320px] mobile:w-full mobile:h-[38vh]' : 'w-[350px] tablet:w-[320px] mobile:w-full mobile:h-[54px]'}
                        mobile:border-r-0 mobile:border-t mobile:shadow-[0_-10px_30px_rgba(0,0,0,0.05)]
                    `}
                >
                    {/* Mobile Handle */}
                    <button 
                        onClick={() => toggleMobilePanel()}
                        className="hidden mobile:flex flex-col items-center w-full justify-center py-2 absolute top-0 left-0 z-10 bg-white cursor-pointer"
                    >
                        <div className="w-10 h-1 bg-vintage-border/30 rounded-full mb-1" />
                        {isMobilePanelOpen ? <LuChevronDown size={14} className="text-vintage-muted/50" /> : <LuChevronUp size={14} className="text-vintage-muted/50" />}
                    </button>

                    {/* Scrollable Content */}
                    <div className="h-full overflow-y-auto mobile:scrollbar-hide">
                        <div
                            className={`px-8 pb-8 transition-opacity duration-300 ${!isMobilePanelOpen ? 'mobile:opacity-0 mobile:pointer-events-none' : 'opacity-100'}`}
                            style={{ paddingTop: 'calc(var(--spacing) * 15)' }}
                        >
                            <SecondaryPanelHeader />
                            <ActiveTabContent />
                        </div>
                    </div>

                    {/* Desktop Sidebar Collapse Toggle */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-3 z-30 mobile:hidden">
                        <button
                            onClick={toggleFocusMode}
                            className="w-6 h-12 bg-white border border-vintage-border/40 rounded-full shadow-sm text-vintage-muted hover:text-vintage-primary hover:border-vintage-primary/30 transition-all flex items-center justify-center group"
                            style={{ transform: 'translateX(50%)' }}
                        >
                            {isFocusMode ? <LuChevronRight size={14} /> : <LuChevronLeft size={14} />}
                        </button>
                    </div>
                </div>
            )}

            {/* 3. MAIN CANVAS AREA */}
            {/* Desktop: Order 3 (Right), Mobile: Order 1 (Top) */}
            <div className={`flex-1 relative bg-[#F4F2EE] overflow-hidden transition-all duration-500 
                order-3 mobile:order-1 
                ${isFocusMode ? 'mobile:h-screen' : ''}`}
            >
                
                {/* ADAPTIVE POSTER CONTAINER */}
                {/* Używamy flex items-center justify-center i h-full, aby plakat był wycentrowany */}
                <div 
                    className={`w-full h-full transition-all duration-500 ease-in-out flex items-center justify-center p-6 md:p-12
                        ${isMobilePanelOpen && !isFocusMode ? 'mobile:pb-4' : ''}
                    `}
                >
                    <MapCanvas />
                </div>

                {/* Desktop focus mode toggle */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 z-30 mobile:hidden">
                    <button
                        onClick={toggleFocusMode}
                        className={`p-2 bg-white/90 backdrop-blur-sm border border-vintage-border/40 rounded-full shadow-md text-vintage-muted hover:text-vintage-primary transition-all ${isFocusMode ? '' : 'hidden'}`}
                    >
                        <LuChevronRight size={18} />
                    </button>
                </div>

                {/* Mobile focus mode return button */}
                {isFocusMode && (
                    <div className="hidden mobile:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-fade-in-up">
                        <button
                            onClick={toggleFocusMode}
                            className="px-8 py-4 bg-vintage-text text-white rounded-full shadow-2xl font-bold text-xs uppercase tracking-[0.2em] items-center gap-2 active:scale-95 transition-all"
                        >
                            Wróć do edycji
                        </button>
                    </div>
                )}

                {/* Top right Actions */}
                <div className="absolute top-4 right-4 z-30">
                    <ShareAction />
                </div>

                {/* Floating Widgets - Top left on mobile */}
                <div className="absolute bottom-6 right-6 z-30 flex flex-col items-end gap-3 transition-all duration-500 mobile:top-4 mobile:left-4 mobile:right-auto mobile:bottom-auto mobile:items-start mobile:flex-col-reverse">
                    <PriceWidget />
                    <FormatWidget />
                </div>

                {/* Zoom Controls - Desktop Only */}
                <div className="absolute bottom-6 left-6 z-30 mobile:hidden">
                    <ZoomUiWidget />
                </div>
            </div>
        </div>
    );
}
