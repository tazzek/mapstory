import React from 'react';
import { Heart, Home, MapPin, Pencil } from 'lucide-react';
import { PosterConfig, MapStyle } from '@/types/poster';

interface MapCanvasProps {
    config: PosterConfig;
    zoomLevel: number;
    showRoomView: boolean;
    onEditTitle: () => void;
}

function getMapFilter(style: MapStyle) {
    switch (style) {
        case 'vintage': return 'sepia(40%) contrast(90%) brightness(105%) hue-rotate(-10deg)';
        case 'noir': return 'grayscale(100%) contrast(150%) brightness(80%)';
        case 'scandi': return 'grayscale(100%) brightness(110%) contrast(90%)';
        default: return 'none';
    }
}

function getMapImage(style: MapStyle) {
    if (style === 'noir') return 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    if (style === 'vintage') return 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    return 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
}

function renderMarkerIcon(config: PosterConfig) {
    const size = config.size === '30x40' ? 32 : 48;
    const color = config.marker.color;

    switch (config.marker.style) {
        case 'heart': return <Heart size={size} fill={color} color={color} className="drop-shadow-md" />;
        case 'home': return <Home size={size} fill={color} color={color} className="drop-shadow-md" />;
        case 'pin': return <MapPin size={size} fill={color} color={color} className="drop-shadow-md" />;
        default: return null;
    }
}

export default function MapCanvas({ config, zoomLevel, showRoomView, onEditTitle }: MapCanvasProps) {
    return (
        <div className="flex-1 overflow-hidden relative flex items-center justify-center p-12 cursor-grab active:cursor-grabbing bg-vintage-bg/30">

            {/* Room View Context */}
            {showRoomView && (
                <div className="absolute inset-0 z-0 animate-fade-in duration-700">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        className="w-full h-full object-cover opacity-90 scale-105"
                        alt="Podgląd wnętrza"
                    />
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px]"></div>
                </div>
            )}

            {/* The Poster Component */}
            <div
                className={`bg-white relative transition-all duration-1000 ease-out transform z-10 
          ${showRoomView ? 'scale-[0.4] shadow-[0_120px_200px_-40px_rgba(0,0,0,0.7)] translate-y-[-80px]' : 'shadow-poster'}
          ${config.orientation === 'landscape' ? 'aspect-[1.414/1] w-full max-w-[950px]' : 'aspect-[1/1.414] h-full max-h-[90vh]'}`}
                style={{
                    padding: config.size === '30x40' ? '4%' : '6%',
                    transform: showRoomView ? undefined : `scale(${zoomLevel / 100})`,
                }}
            >
                <div className="w-full h-full flex flex-col border border-gray-100 relative overflow-hidden group shadow-inner">

                    {/* Map Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                        style={{
                            backgroundColor: config.style === 'noir' ? '#111' : '#F5F5F0',
                            backgroundImage: `url('${getMapImage(config.style)}')`,
                            filter: getMapFilter(config.style),
                        }}
                    ></div>

                    {/* Marker Layer */}
                    {config.marker.enabled && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pb-14">
                            <div className="animate-bounce-slow">
                                {renderMarkerIcon(config)}
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay pointer-events-none"></div>

                    {/* Typography Panel */}
                    <div
                        className="absolute bottom-0 left-0 right-0 p-12 pb-16 text-center bg-gradient-to-t from-white via-white/95 to-transparent pt-40 cursor-pointer group/text"
                        onClick={onEditTitle}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/text:opacity-100 transition-all bg-vintage-primary text-white p-4 rounded-full shadow-2xl scale-50 group-hover/text:scale-100">
                            <Pencil size={20} />
                        </div>

                        <h2 className={`font-serif text-6xl md:text-7xl tracking-[0.2em] uppercase mb-5 leading-none ${config.style === 'noir' ? 'text-black' : 'text-vintage-text'}`}>
                            {config.title}
                        </h2>

                        <div className="flex items-center justify-center gap-6">
                            <div className="w-12 h-[2.5px] bg-vintage-primary/40"></div>
                            {config.showCoordinates && (
                                <p className="font-sans text-[12px] tracking-[0.35em] font-bold uppercase text-vintage-muted whitespace-nowrap">
                                    {config.customCoordinates || config.subtitle}
                                </p>
                            )}
                            <div className="w-12 h-[2.5px] bg-vintage-primary/40"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 right-8 text-[9px] text-vintage-muted/30 font-mono rotate-90 origin-bottom-right tracking-[0.4em] uppercase">
                        MapStory Collection
                    </div>
                </div>
            </div>
        </div>
    );
}
