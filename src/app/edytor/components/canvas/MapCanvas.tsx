import React, { useRef } from 'react';
import { MapPin, Heart, Home } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';
import { useMapbox } from '@/hooks/useMapbox';
import { themes } from '@/config/themes';
import { ThemeLayout } from '@/types/theme';

export default function MapCanvas() {
    const config = usePosterStore((s) => s.config);
    const zoomLevel = usePosterStore((s) => s.zoomLevel);

    const mapContainerRef = useRef<HTMLDivElement>(null);

    const { isMapLoaded, map, isStyleChanging } = useMapbox(mapContainerRef);

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

    const MarkerIcon = config.marker.style === 'heart' ? Heart
        : config.marker.style === 'home' ? Home
            : MapPin;

    return (
        <div className="relative flex items-center justify-center h-full w-full p-8 overflow-hidden">
            {/* GŁÓWNY KONTENER PLAKATU
               Ma stałe tło, żeby ewentualne maski miały kolor papieru pod spodem.
            */}
            <div
                className="relative aspect-[3/4] shadow-poster-xl border border-vintage-border/30 overflow-hidden h-[82vh] w-auto flex flex-col transition-colors duration-500"
                style={{ backgroundColor: layout.canvasBackground }}
            >
                {/* =========================================
                   WARSTWA 1: MAPA (ZAWSZE 100% ROZMIARU)
                   =========================================
                   Dzięki absolute inset-0 mapa nigdy nie zmienia 
                   swoich fizycznych rozmiarów przy zmianie stylu,
                   co całkowicie eliminuje skakanie WebGL!
                */}
                <div
                    className="absolute inset-0 z-0 transition-all duration-500"
                    style={{ clipPath: effectiveMask }}
                >
                    {/* Tutaj renderuje się silnik Mapbox */}
                    <div ref={mapContainerRef} className="w-full h-full" />

                    {/* LOADER */}
                    {(!isMapLoaded || isStyleChanging) && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-40 transition-opacity duration-300">
                            <div className="flex flex-col items-center gap-3 bg-white/80 p-4 rounded-xl shadow-sm">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-vintage-primary"></div>
                                <span className="text-vintage-muted text-[10px] font-bold uppercase tracking-widest">
                                    {!isMapLoaded ? 'Ładowanie mapy...' : 'Aplikowanie stylu...'}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* MARKER - Idealnie na środku */}
                    {config.marker.enabled && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-bounce">
                            <MarkerIcon size={32} style={{ color: config.marker.color }} fill={config.marker.color} />
                        </div>
                    )}

                    {/* TEKSTY BEZPOŚREDNIO NA MAPIE (Styl Vintage/Ocean) */}
                    {layout.textPosition === 'overlay-bottom' && (
                        <div
                            className="absolute bottom-0 left-0 right-0 p-10 z-10 transition-all duration-500 pointer-events-none"
                            style={{ paddingBottom: config.mask === 'circle' ? '20%' : '10%' }}
                        >
                            <TextPanel config={config} layout={layout} isOverlay />
                        </div>
                    )}

                    {/* PŁYWAJĄCA ETYKIETA (Muzealna nakładka) */}
                    {layout.textPosition === 'boxed-bottom' && (
                        <div className="bg-white/90 backdrop-blur-md shadow-lg p-6 rounded-sm absolute bottom-8 left-8 right-8 z-30 border border-black/5 pointer-events-none transition-all duration-500">
                            <TextPanel config={config} layout={layout} />
                        </div>
                    )}
                </div>

                {/* =========================================
                   WARSTWA 2: SYSTEM NAKŁADEK (PASSE-PARTOUT)
                   =========================================
                   To te "paski", które najeżdżają na krawędzie mapy (Twoja koncepcja).
                   Mają pointer-events-none, dzięki czemu możesz łapać i przesuwać mapę pod nimi!
                */}
                <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">

                    {/* GÓRNY PASEK ZAKRYWAJĄCY */}
                    <div
                        className="w-full transition-all duration-500 flex-shrink-0 flex items-center justify-center"
                        style={{
                            height: layout.padding !== '0' ? layout.padding : '0',
                            backgroundColor: layout.padding !== '0' ? layout.canvasBackground : 'transparent'
                        }}
                    >
                        {layout.textPosition === 'outside-top' && (
                            <div className="w-full px-8 pt-4">
                                <TextPanel config={config} layout={layout} />
                            </div>
                        )}
                    </div>

                    {/* ŚRODKOWA SEKCJA Z DZIURĄ */}
                    <div className="flex-grow flex w-full overflow-hidden">
                        {/* Lewy pasek zakrywający */}
                        <div
                            className="h-full transition-all duration-500 flex-shrink-0"
                            style={{
                                width: layout.padding !== '0' ? layout.padding : '0',
                                backgroundColor: layout.padding !== '0' ? layout.canvasBackground : 'transparent'
                            }}
                        />

                        {/* Przezroczysta dziura przez którą widać mapę */}
                        <div className="flex-grow relative">
                            {/* Cienka ramka stykająca się z krawędziami passe-partout */}
                            <div className="absolute inset-0 transition-all duration-500" style={{ border: layout.mapBorder || 'none' }} />
                        </div>

                        {/* Prawy pasek zakrywający */}
                        <div
                            className="h-full transition-all duration-500 flex-shrink-0"
                            style={{
                                width: layout.padding !== '0' ? layout.padding : '0',
                                backgroundColor: layout.padding !== '0' ? layout.canvasBackground : 'transparent'
                            }}
                        />
                    </div>

                    {/* DOLNY PASEK ZAKRYWAJĄCY Z TEKSTAMI */}
                    <div
                        className="w-full transition-all duration-500 flex-shrink-0 flex flex-col justify-center"
                        style={{
                            backgroundColor: layout.padding !== '0' ? layout.canvasBackground : 'transparent',
                            paddingTop: (layout.textPosition === 'outside-bottom' || layout.textPosition === 'split-bottom') ? '1.5rem' : '0',
                            paddingBottom: layout.padding !== '0' ? layout.padding : '0',
                            minHeight: layout.padding !== '0' ? layout.padding : '0'
                        }}
                    >
                        {(layout.textPosition === 'outside-bottom' || layout.textPosition === 'split-bottom') && (
                            <div className="w-full px-8 z-20">
                                <TextPanel config={config} layout={layout} />
                            </div>
                        )}
                    </div>
                </div>

                <div className={`absolute top-4 right-4 z-40 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-sm transition-colors duration-500 ${activeTheme.badgeClass}`}>
                    {activeTheme.label}
                </div>
            </div>
        </div>
    );
}

// WYIZOLOWANY KOMPONENT TEKSTOWY
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
