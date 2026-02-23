import React, { useRef, useEffect } from 'react';
import { MdPlace, MdFavorite, MdHome, MdCameraAlt, MdArrowUpward, MdArrowDownward, MdArrowBack, MdArrowForward } from 'react-icons/md';
import { LuCamera } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';
import { useMapbox } from '@/hooks/useMapbox';
import { themes } from '@/config/themes';
import { ThemeLayout } from '@/types/theme';
import { PosterConfig } from '@/types/poster';

export default function MapCanvas() {
    const config = usePosterStore((s) => s.config);
    const canvasRef = useRef<HTMLDivElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { isMapLoaded, map, isStyleChanging } = useMapbox(mapContainerRef);

    const isMobilePanelOpen = usePosterStore((s) => s.isMobilePanelOpen);
    const setMobilePanelOpen = usePosterStore((s) => s.setMobilePanelOpen);
    const showRoomView = usePosterStore((s) => s.showRoomView);
    const toggleRoomView = usePosterStore((s) => s.toggleRoomView);

    const mapZoomAction = usePosterStore((s) => s.mapZoomAction);
    const setZoomAction = usePosterStore((s) => s.setZoomAction);

    useEffect(() => {
        console.info('[CanvasDebug] MapCanvas mounted/updated');
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            console.info(`[CanvasDebug] Poster container: ${rect.width}x${rect.height}px`);
        }
    }, [config.style, config.mask]);

    React.useEffect(() => {
        if (!map || !mapZoomAction) return;

        if (mapZoomAction === 'in') {
            map.zoomIn();
        } else if (mapZoomAction === 'out') {
            map.zoomOut();
        } else if (mapZoomAction === 'reset') {
            map.flyTo({
                center: [18.6466, 54.3520],
                zoom: 12,
                essential: true
            });
        }

        setZoomAction(null);
    }, [map, mapZoomAction, setZoomAction]);

    const activeTheme = themes[config.style] || themes.vintage;
    const { layout } = activeTheme;

    const masks: Record<string, string> = {
        rectangle: 'inset(0)',
        circle: 'circle(50% at 50% 50%)',
        heart: 'path("M21.35,11.1L12.18,20.29C12.08,20.39 11.95,20.44 11.82,20.44C11.69,20.44 11.56,20.39 11.46,20.29L2.3,11.1C-0.34,8.45 -0.34,4.19 2.3,1.55C4.94,-1.09 9.21,-1.09 11.85,1.55C14.49,-1.09 18.76,-1.09 21.4,1.55C24.04,4.19 24.04,8.45 21.4,11.1H21.35Z")',
        home: 'polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)',
    };

    const heartClip = 'polygon(50% 15%, 80% 0%, 100% 20%, 100% 50%, 50% 100%, 0% 50%, 0% 20%, 20% 0%)';
    const effectiveMask = config.mask === 'heart' ? heartClip : (masks[config.mask] || 'inset(0)');

    const isCenterAnchor = ['heart', 'camera', 'home'].includes(config.marker.style);

    const getMarkerIcon = (style: string) => {
        switch (style) {
            case 'heart': return MdFavorite;
            case 'home': return MdHome;
            case 'camera': return MdCameraAlt;
            case 'arrow-up': return MdArrowUpward;
            case 'arrow-down': return MdArrowDownward;
            case 'arrow-left': return MdArrowBack;
            case 'arrow-right': return MdArrowForward;
            case 'pin':
            default: return MdPlace;
        }
    };

    const MarkerIcon = getMarkerIcon(config.marker.style);

    return (
        <div
            className="relative flex-grow w-full h-full min-h-0 flex items-center justify-center overflow-hidden p-2 lg:p-8"
            onClick={() => {
                if (isMobilePanelOpen) setMobilePanelOpen(false);
            }}
        >
            {/* GŁÓWNY KONTENER PLAKATU */}
            <div
                ref={canvasRef}
                className="relative shadow-poster-xl border border-gray-200/50 flex flex-col transition-all duration-300 ease-out bg-white"
                style={{
                    backgroundColor: layout.canvasBackground,
                    // Double Constraint logic - restricted to parent container (fixes desktop/sidebar issues):
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    aspectRatio: '3/4',
                    margin: 'auto',
                    objectFit: 'contain' // Ensures the content inside respects the box
                }}
            >
                {/* WARSTWA 1: MAPA */}
                <div
                    className="absolute inset-0 z-0 bg-stone-100"
                    style={{ clipPath: effectiveMask }}
                >
                    <div ref={mapContainerRef} className="w-full h-full min-h-[10px] min-w-[10px]" />

                    {/* Nakładka na mapę - zamyka panel przy kliknięciu (tylko na mobile) */}
                    {isMobilePanelOpen && (
                        <div
                            className="absolute inset-0 z-50 lg:hidden cursor-pointer bg-transparent"
                            onClick={(e) => {
                                e.stopPropagation();
                                setMobilePanelOpen(false);
                            }}
                        />
                    )}

                    {/* LOADER */}
                    {(!isMapLoaded || isStyleChanging) && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-40">
                            <div className="flex flex-col items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vintage-primary"></div>
                                <span className="text-vintage-muted text-[10px] font-bold uppercase tracking-widest">
                                    {!isMapLoaded ? 'Ładowanie mapy...' : 'Aplikowanie stylu...'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* MARKER */}
                    {config.marker.enabled && (
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 z-20 drop-shadow-md ${isCenterAnchor ? "-translate-y-1/2" : "-translate-y-full"}`}>
                            <MarkerIcon size={36} style={{ color: config.marker.color }} fill={config.marker.color} />
                        </div>
                    )}

                    {/* TEKSTY NA MAPIE */}
                    {layout.textPosition === 'overlay-bottom' && (
                        <div
                            className="absolute bottom-0 left-0 right-0 p-10 z-10 pointer-events-none"
                            style={{ paddingBottom: config.mask === 'circle' ? '20%' : '10%' }}
                        >
                            <TextPanel config={config} layout={layout} isOverlay />
                        </div>
                    )}

                    {/* PŁYWAJĄCA ETYKIETA */}
                    {layout.textPosition === 'boxed-bottom' && (
                        <div className="bg-white/90 backdrop-blur-md shadow-lg p-6 rounded-sm absolute bottom-8 left-8 right-8 z-30 border border-black/5 pointer-events-none">
                            <TextPanel config={config} layout={layout} />
                        </div>
                    )}
                </div>

                {/* WARSTWA 2: SYSTEM NAKŁADEK (PASSE-PARTOUT) */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
                    {/* GÓRNY PASEK */}
                    <div
                        className="w-full flex-shrink-0 flex items-center justify-center"
                        style={{
                            height: layout.paddingY !== '0' ? layout.paddingY : '0',
                            backgroundColor: layout.paddingY !== '0' ? layout.canvasBackground : 'transparent'
                        }}
                    >
                        {layout.textPosition === 'outside-top' && (
                            <div className="w-full px-8 pt-4">
                                <TextPanel config={config} layout={layout} />
                            </div>
                        )}
                    </div>

                    {/* ŚRODKOWA SEKCJA */}
                    <div className="flex-grow flex w-full overflow-hidden">
                        <div
                            className="h-full flex-shrink-0"
                            style={{
                                width: layout.paddingX !== '0' ? layout.paddingX : '0',
                                backgroundColor: layout.paddingX !== '0' ? layout.canvasBackground : 'transparent'
                            }}
                        />
                        <div className="flex-grow relative">
                            <div className="absolute inset-0" style={{ border: layout.mapBorder || 'none' }} />
                        </div>
                        <div
                            className="h-full flex-shrink-0"
                            style={{
                                width: layout.paddingX !== '0' ? layout.paddingX : '0',
                                backgroundColor: layout.paddingX !== '0' ? layout.canvasBackground : 'transparent'
                            }}
                        />
                    </div>

                    {/* DOLNY PASEK */}
                    <div
                        className="w-full flex-shrink-0 flex flex-col justify-center"
                        style={{
                            backgroundColor: layout.paddingY !== '0' ? layout.canvasBackground : 'transparent',
                            paddingTop: (layout.textPosition === 'outside-bottom' || layout.textPosition === 'split-bottom') ? '1.5rem' : '0',
                            paddingBottom: layout.paddingY !== '0' ? layout.paddingY : '0',
                            minHeight: layout.paddingY !== '0' ? layout.paddingY : '0'
                        }}
                    >
                        {(layout.textPosition === 'outside-bottom' || layout.textPosition === 'split-bottom') && (
                            <div className="w-full px-8 z-20">
                                <TextPanel config={config} layout={layout} />
                            </div>
                        )}
                    </div>
                </div>

                <div className={`absolute top-4 right-4 z-40 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm ${activeTheme.badgeClass}`}>
                    {activeTheme.label}
                </div>

                {/* Floating Visualization Button (FAB) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleRoomView();
                    }}
                    className={`absolute bottom-4 right-4 z-40 bg-white/90 backdrop-blur-md p-3.5 rounded-full shadow-lg border border-gray-100 text-gray-700 hover:scale-105 transition-all active:scale-95 flex items-center justify-center ${showRoomView ? 'ring-2 ring-vintage-primary border-transparent' : ''
                        }`}
                    aria-label="Zobacz w pokoju"
                >
                    <LuCamera size={22} />
                </button>
            </div>
        </div>
    );
}

// WYIZOLOWANY KOMPONENT TEKSTOWY
function TextPanel({ config, layout, isOverlay = false }: { config: PosterConfig, layout: ThemeLayout, isOverlay?: boolean }) {
    if (layout.textPosition === 'split-bottom') {
        return (
            <div className="w-full flex items-end justify-between transition-colors duration-500 mt-2" style={{ color: layout.textColor }}>
                <h2 className={`text-xl md:text-2xl tracking-wider m-0 ${config.fontFamily === 'serif' ? 'font-serif' :
                    config.fontFamily === 'handwritten' ? 'font-sans italic italic-handwritten' :
                        'font-sans font-bold'
                    }`}>
                    {config.title || 'TWÓJ TYTUŁ'}
                </h2>
                <div className="flex-grow border-b border-dashed mx-4 md:mx-6 mb-2 opacity-30" style={{ borderColor: layout.accentColor }}></div>
                <p className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70 m-0 pb-1 text-right whitespace-nowrap">
                    {config.subtitleMode === 'coordinates' ? config.subtitle : (config.customCoordinates || config.subtitle)}
                </p>
            </div>
        );
    }

    return (
        <div
            className="w-full transition-colors duration-500"
            style={{
                color: layout.textColor,
                textAlign: config.textAlign
            }}
        >
            <div
                className={`max-w-[80%] mb-4 transition-all duration-500 ${config.textAlign === 'center' ? 'mx-auto' : config.textAlign === 'right' ? 'ml-auto' : 'mr-auto'}`}
                style={{ borderTop: `1px solid ${layout.accentColor}${isOverlay ? '40' : '60'}` }}
            />
            <h2
                className={`text-2xl tracking-wider mb-2 transition-all duration-500 ${config.fontFamily === 'serif' ? 'font-serif' :
                    config.fontFamily === 'handwritten' ? 'font-sans italic italic-handwritten' :
                        'font-sans font-bold'
                    }`}
                style={{ color: layout.textColor }}
            >
                {config.title || 'TWÓJ TYTUŁ'}
            </h2>
            <p
                className="text-xs tracking-[0.3em] uppercase opacity-70 transition-all duration-500"
                style={{ color: layout.textColor }}
            >
                {config.subtitleMode === 'coordinates' ? config.subtitle : (config.customCoordinates || config.subtitle)}
            </p>
        </div>
    );
}
