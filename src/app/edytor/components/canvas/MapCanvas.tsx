'use client';

import { MapPin, Heart, Home } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';

export default function MapCanvas() {
    const config = usePosterStore((s) => s.config);
    const zoomLevel = usePosterStore((s) => s.zoomLevel);
    const showRoomView = usePosterStore((s) => s.showRoomView);

    const styleColors: Record<string, { bg: string; fg: string; accent: string; label: string }> = {
        modern: { bg: '#FFFFFF', fg: '#1a1a1a', accent: '#333', label: 'bg-gray-800 text-white' },
        noir: { bg: '#0f0f0f', fg: '#D4AF37', accent: '#333', label: 'bg-yellow-600 text-black' },
        vintage: { bg: '#F0E6D2', fg: '#5D4E37', accent: '#A88B5E', label: 'bg-amber-800 text-amber-50' },
        scandi: { bg: '#F8F8F6', fg: '#2C3E50', accent: '#B0B0B0', label: 'bg-slate-700 text-white' },
    };

    const currentStyle = styleColors[config.style] || styleColors.vintage;

    const MarkerIcon = config.marker.style === 'heart' ? Heart
        : config.marker.style === 'home' ? Home
            : MapPin;

    return (
        <div className="relative flex items-center justify-center h-full w-full p-8">

            {/* Room overlay */}
            {showRoomView && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-stone-100 to-stone-200 opacity-90">
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-stone-300 to-transparent"></div>
                </div>
            )}

            <div
                className="relative aspect-[3/4] shadow-poster-xl border border-vintage-border/30 transition-transform duration-300 overflow-hidden"
                style={{
                    transform: `scale(${zoomLevel / 100})`,
                    height: '82vh',
                    backgroundColor: currentStyle.bg
                }}
            >
                {/* Map layer placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="text-center" style={{ color: currentStyle.fg }}>
                        <div className="w-64 h-64 border border-current opacity-20 mx-auto mb-4 rounded-sm">
                            <div className="w-full h-full" style={{
                                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, ${currentStyle.fg}10 20px, ${currentStyle.fg}10 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, ${currentStyle.fg}10 20px, ${currentStyle.fg}10 21px)`
                            }}></div>
                        </div>
                    </div>
                </div>

                {/* Marker */}
                {config.marker.enabled && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-bounce">
                        <MarkerIcon size={32} style={{ color: config.marker.color }} fill={config.marker.color} />
                    </div>
                )}

                {/* Bottom text panel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-center" style={{ color: currentStyle.fg }}>
                    <div className="max-w-[80%] mx-auto mb-3" style={{ borderTop: `1px solid ${currentStyle.accent}40` }}></div>
                    <h2 className="font-serif text-2xl tracking-wider mb-1" style={{ color: currentStyle.fg }}>
                        {config.title || 'TWÓJ TYTUŁ'}
                    </h2>
                    <p className="text-xs tracking-[0.3em] uppercase opacity-60" style={{ color: currentStyle.fg }}>
                        {config.showCoordinates ? (config.customCoordinates || config.subtitle) : config.subtitle}
                    </p>
                </div>

                {/* Style badge */}
                <div className={`absolute top-4 right-4 z-20 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${currentStyle.label}`}>
                    {config.style}
                </div>
            </div>
        </div>
    );
}
