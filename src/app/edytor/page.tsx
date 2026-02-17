'use client';

import { useState } from 'react';
import {
    MapPin,
    Settings2,
    Type,
    Frame,
    Sparkles,
    RotateCcw,
    PanelLeftClose,
    PanelLeftOpen,
} from 'lucide-react';
import { PosterConfig } from '@/types/poster';
import { EditorTab } from '@/types/poster';
import SidebarItem from './components/sidebar/Tabs';
import LocationTab from './components/sidebar/LocationTab';
import StyleTab from './components/sidebar/StyleTab';
import TextTab from './components/sidebar/TextTab';
import FrameTab from './components/sidebar/FrameTab';
import MapCanvas from './components/canvas/MapCanvas';
import ZoomControl from './components/widgets/ZoomControl';
import PriceWidget from './components/widgets/PriceWidget';
import ShareAction from './components/widgets/ShareAction';

export default function EditorPage() {
    const [activeTab, setActiveTab] = useState<EditorTab>('Lokalizacja');
    const [showRoomView, setShowRoomView] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(100);
    const [visitedSteps, setVisitedSteps] = useState<string[]>(['Lokalizacja']);
    const [isFocusMode, setIsFocusMode] = useState(false);

    const [config, setConfig] = useState<PosterConfig>({
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
            color: '#A88B5E'
        }
    });

    const handleTabChange = (tab: EditorTab) => {
        setActiveTab(tab);
        if (!visitedSteps.includes(tab)) {
            setVisitedSteps([...visitedSteps, tab]);
        }
    };

    const handleResetSection = () => {
        switch (activeTab) {
            case 'Lokalizacja':
                setConfig(prev => ({ ...prev, location: 'Kennedy Space Center' }));
                break;
            case 'Styl':
                setConfig(prev => ({
                    ...prev,
                    style: 'vintage',
                    marker: { enabled: false, style: 'heart', color: '#A88B5E' }
                }));
                break;
            case 'Typografia':
                setConfig(prev => ({
                    ...prev,
                    title: 'KENNEDY SPACE CENTER',
                    subtitle: 'LC-39B • 28.63° N, 80.62° W',
                    showCoordinates: true,
                    customCoordinates: undefined
                }));
                break;
            case 'Wydruk':
                setConfig(prev => ({ ...prev, size: '50x70', isDigital: false }));
                break;
            default:
                break;
        }
    };

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 200));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 50));

    const currentPrice = config.isDigital ? '49 PLN' : '149 PLN';

    const steps: { id: EditorTab; label: string; icon: React.ReactNode; step: number }[] = [
        { id: 'Lokalizacja', label: 'Lokalizacja', icon: <MapPin />, step: 1 },
        { id: 'Styl', label: 'Styl', icon: <Settings2 />, step: 2 },
        { id: 'Typografia', label: 'Typografia', icon: <Type />, step: 3 },
        { id: 'Wydruk', label: 'Wydruk', icon: <Frame />, step: 4 },
        { id: 'Dodatki', label: 'Dodatki', icon: <Sparkles />, step: 5 },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Lokalizacja':
                return <LocationTab config={config} setConfig={setConfig} />;
            case 'Styl':
                return <StyleTab config={config} setConfig={setConfig} />;
            case 'Typografia':
                return <TextTab config={config} setConfig={setConfig} />;
            case 'Wydruk':
            case 'Dodatki':
                return <FrameTab config={config} setConfig={setConfig} activeTab={activeTab} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen pt-14 bg-white overflow-hidden font-sans">

            {/* 1. NAVIGATION RAIL */}
            <div
                className={`bg-[#E6DFD5] bg-noise flex flex-col z-20 border-r border-black/5 relative transition-all duration-500 ease-in-out overflow-hidden ${isFocusMode ? 'w-0 opacity-0' : 'w-[240px] opacity-100'}`}
            >
                <div className="flex-1 w-full pt-12 pb-6 min-w-[240px]">
                    {steps.map((item) => (
                        <SidebarItem
                            key={item.id}
                            step={item.step}
                            icon={item.icon}
                            label={item.label}
                            active={activeTab === item.id}
                            completed={visitedSteps.includes(item.id) && activeTab !== item.id}
                            onClick={() => handleTabChange(item.id)}
                        />
                    ))}
                </div>
            </div>

            {/* 2. SECONDARY PANEL */}
            <div
                className={`bg-white flex flex-col z-10 relative shadow-[10px_0_30px_rgba(0,0,0,0.02)] transition-all duration-500 ease-in-out ${isFocusMode ? 'w-0 -ml-[1px] overflow-hidden' : 'w-[340px]'}`}
            >
                <div className="h-20 flex items-center justify-between px-8 bg-white border-b border-gray-50 min-w-[340px]">
                    <h2 className="font-serif text-[20px] text-vintage-text font-bold tracking-tight">
                        {activeTab}
                    </h2>
                    <button
                        onClick={handleResetSection}
                        title="Resetuj ustawienia sekcji"
                        className="w-8 h-8 flex items-center justify-center rounded-full text-vintage-muted hover:bg-vintage-bg hover:text-vintage-primary transition-all"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar pb-24 pt-6 min-w-[340px]">
                    {renderTabContent()}
                </div>
            </div>

            {/* 3. CANVAS AREA */}
            <div className="flex-1 relative bg-[#F2F2F2] flex flex-col overflow-hidden">

                {/* FOCUS MODE TOGGLE */}
                <button
                    onClick={() => setIsFocusMode(!isFocusMode)}
                    className="absolute top-1/2 left-0 z-40 w-6 h-12 bg-white border border-l-0 border-vintage-border rounded-r-xl shadow-md flex items-center justify-center text-vintage-muted hover:text-vintage-primary hover:w-8 transition-all duration-300"
                    title={isFocusMode ? "Pokaż narzędzia" : "Tryb skupienia"}
                >
                    {isFocusMode ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
                </button>

                {/* FLOATING WIDGETS */}
                <PriceWidget currentPrice={currentPrice} />
                <ZoomControl zoomLevel={zoomLevel} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
                <ShareAction showRoomView={showRoomView} onToggleRoomView={() => setShowRoomView(!showRoomView)} />

                {/* CANVAS */}
                <MapCanvas
                    config={config}
                    zoomLevel={zoomLevel}
                    showRoomView={showRoomView}
                    onEditTitle={() => setActiveTab('Typografia')}
                />
            </div>
        </div>
    );
}
