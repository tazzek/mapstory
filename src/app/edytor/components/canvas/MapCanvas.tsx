import React, { useRef } from 'react';
import { MapPin, Heart, Home } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';
import { useMapbox } from '@/hooks/useMapbox';
import { themes } from '@/config/themes';
import { ThemeLayout, ThemeConfig } from '@/types/theme';
import { cn } from '@/lib/utils';

export default function MapCanvas() {
    const config = usePosterStore((s) => s.config);
    const zoomLevel = usePosterStore((s) => s.zoomLevel);

    // Mapbox Logic
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const { isMapLoaded, map } = useMapbox(mapContainerRef);

    // Zoom / Control Logic
    const mapZoomAction = usePosterStore((s) => s.mapZoomAction);
    const setZoomAction = usePosterStore((s) => s.setZoomAction);

    React.useEffect(() => {
        if (!map || !mapZoomAction) return;

        if (mapZoomAction === 'in') {
            map.zoomIn();
        } else if (mapZoomAction === 'out') {
            map.zoomOut();
        } else if (mapZoomAction === 'reset') {
            map.flyTo({
                center: [18.6466, 54.3520],
                zoom: 12, // Default zoom for Gdańsk
                essential: true
            });
        }

        setZoomAction(null);
    }, [map, mapZoomAction, setZoomAction]);

    // Data-Driven Theme Retrieval
    const activeTheme = themes[config.style] || themes.vintage;
    const { layout } = activeTheme;

    // Mask definitions
    const masks: Record<string, string> = {
        rectangle: 'inset(0)',
        circle: 'circle(50% at 50% 50%)',
        heart: 'path("M21.35,11.1L12.18,20.29C12.08,20.39 11.95,20.44 11.82,20.44C11.69,20.44 11.56,20.39 11.46,20.29L2.3,11.1C-0.34,8.45 -0.34,4.19 2.3,1.55C4.94,-1.09 9.21,-1.09 11.85,1.55C14.49,-1.09 18.76,-1.09 21.4,1.55C24.04,4.19 24.04,8.45 21.4,11.1H21.35Z")',
        home: 'polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)',
    };

    // For heart, we'll use a simpler polygon approximation or a pseudo-element mask if path is unstable.
    const heartClip = 'polygon(50% 15%, 80% 0%, 100% 20%, 100% 50%, 50% 100%, 0% 50%, 0% 20%, 20% 0%)';
    const effectiveMask = config.mask === 'heart' ? heartClip : (masks[config.mask] || 'inset(0)');

    const MarkerIcon = config.marker.style === 'heart' ? Heart
        : config.marker.style === 'home' ? Home
            : MapPin;

    return (
        <div className="relative flex items-center justify-center h-full w-full p-8 overflow-hidden">
            {/* 
               GLÓWNY KONTENER FIZYCZNEGO PLAKATU (PAPIER).
               Utrzymuje sztywne proporcje 3:4.
            */}
            <div
                className="relative aspect-[3/4] shadow-poster-xl border border-vintage-border/30 transition-all duration-500 overflow-hidden h-[82vh] flex flex-col"
                style={{
                    backgroundColor: layout.canvasBackground,
                    padding: layout.padding, // <--- MAGIC OF PASSE-PARTOUT
                }}
            >
                {/* 1. TEKST ZEWNĄTRZ-GÓRA (np. opcjonalny styl headera) */}
                {layout.textPosition === 'outside-top' && (
                    <div className="mb-6 flex-shrink-0 flex items-center justify-center transition-all duration-500 w-full">
                        <div className="w-full">
                            <TextPanel config={config} layout={layout} />
                        </div>
                    </div>
                )}

                {/* 2. WRAPPER NA MAPE (Z NATURALNYM KADROWANIEM) */}
                <div
                    className="relative flex-grow w-full h-full overflow-hidden transition-all duration-500 rounded-sm"
                    style={{
                        border: layout.mapBorder || 'none',
                        clipPath: effectiveMask
                    }}
                >
                    {/* Właściwa ramka Mapboxa */}
                    <div ref={mapContainerRef} className="w-full h-full" />
                    {!isMapLoaded && (
                        <div className="absolute inset-0 bg-vintage-paper flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-vintage-primary"></div>
                                <span className="text-vintage-muted text-xs uppercase tracking-widest animate-pulse">Ładowanie mapy...</span>
                            </div>
                        </div>
                    )}

                    {/* Marker */}
                    {config.marker.enabled && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-bounce">
                            <MarkerIcon size={32} style={{ color: config.marker.color }} fill={config.marker.color} />
                        </div>
                    )}

                    {/* WARIANT: TEKST NAKŁADANY BEZPOŚREDNIO NA MAPĘ (Standard) */}
                    {layout.textPosition === 'overlay-bottom' && (
                        <div
                            className="absolute bottom-0 left-0 right-0 p-10 z-10 transition-all duration-300 pointer-events-none"
                            style={{ paddingBottom: config.mask === 'circle' ? '20%' : '10%' }}
                        >
                            <TextPanel config={config} layout={layout} isOverlay />
                        </div>
                    )}

                    {/* WARIANT: LUKSUSOWA, PŁYWAJĄCA ETYKIETA (Museum Box) */}
                    {layout.textPosition === 'boxed-bottom' && (
                        <div className="bg-white/90 backdrop-blur-md shadow-lg p-6 rounded-sm absolute bottom-8 left-8 right-8 z-30 border border-black/5 pointer-events-none transition-all duration-500">
                            <TextPanel config={config} layout={layout} />
                        </div>
                    )}
                </div>

                {/* 3. TEKST ZEWNĄTRZ-DÓŁ (Passe-partout text panel pod spodem mapy) */}
                {(layout.textPosition === 'outside-bottom' || layout.textPosition === 'split-bottom') && (
                    <div className="mt-6 flex-shrink-0 flex items-center justify-center transition-all duration-500 w-full">
                        <div className="w-full">
                            <TextPanel config={config} layout={layout} />
                        </div>
                    </div>
                )}

                {/* Odznaka w prawym górnym rogu */}
                <div className={`absolute top-4 right-4 z-40 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm transition-colors duration-500 ${activeTheme.badgeClass}`}>
                    {activeTheme.label}
                </div>
            </div>
        </div>
    );
}

// WYIZOLOWANY KOMPONENT TEKSTOWY DLA STYLI
function TextPanel({ config, layout, isOverlay = false }: { config: any, layout: ThemeLayout, isOverlay?: boolean }) {
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

