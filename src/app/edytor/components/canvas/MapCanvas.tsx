'use client';

import { MapPin, Heart, Home } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';

export default function MapCanvas() {
    const config = usePosterStore((s) => s.config);
    const zoomLevel = usePosterStore((s) => s.zoomLevel);

    const styleColors: Record<string, { bg: string; fg: string; accent: string; label: string }> = {
        modern: { bg: '#FFFFFF', fg: '#1a1a1a', accent: '#333', label: 'bg-gray-800 text-white' },
        noir: { bg: '#0f0f0f', fg: '#D4AF37', accent: '#333', label: 'bg-yellow-600 text-black' },
        vintage: { bg: '#F0E6D2', fg: '#5D4E37', accent: '#A88B5E', label: 'bg-amber-800 text-amber-50' },
        scandi: { bg: '#F8F8F6', fg: '#2C3E50', accent: '#B0B0B0', label: 'bg-slate-700 text-white' },
        midnight: { bg: '#0B132B', fg: '#5BC0BE', accent: '#1C2541', label: 'bg-blue-900 text-cyan-400' },
        forest: { bg: '#D8F3DC', fg: '#1B4332', accent: '#40916C', label: 'bg-green-900 text-green-100' },
        ocean: { bg: '#FDF0D5', fg: '#003049', accent: '#669BBC', label: 'bg-sky-900 text-sky-100' },
        sunset: { bg: '#F2E8CF', fg: '#BC4749', accent: '#386641', label: 'bg-red-900 text-red-100' },
    };

    const currentStyle = styleColors[config.style] || styleColors.vintage;

    // Mask definitions
    const masks: Record<string, string> = {
        rectangle: 'inset(0)',
        circle: 'circle(50% at 50% 50%)',
        heart: 'path("M21.35,11.1L12.18,20.29C12.08,20.39 11.95,20.44 11.82,20.44C11.69,20.44 11.56,20.39 11.46,20.29L2.3,11.1C-0.34,8.45 -0.34,4.19 2.3,1.55C4.94,-1.09 9.21,-1.09 11.85,1.55C14.49,-1.09 18.76,-1.09 21.4,1.55C24.04,4.19 24.04,8.45 21.4,11.1H21.35Z")', // Note: This standard path might need scaling or a different SVG mask approach for responsiveness. Better to use polygon for 'home' and circle for 'circle'.
        home: 'polygon(50% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)',
    };

    // For heart, we'll use a simpler polygon approximation or a pseudo-element mask if path is unstable.
    // Actually, svg mask is better but clip-path with polygon is most reliable.
    // Simple heart polygon:
    const heartClip = 'polygon(50% 15%, 80% 0%, 100% 20%, 100% 50%, 50% 100%, 0% 50%, 0% 20%, 20% 0%)';
    const effectiveMask = config.mask === 'heart' ? heartClip : (masks[config.mask] || 'inset(0)');

    const MarkerIcon = config.marker.style === 'heart' ? Heart
        : config.marker.style === 'home' ? Home
            : MapPin;

    return (
        <div className="relative flex items-center justify-center h-full w-full p-8">

            <div
                className="relative aspect-[3/4] shadow-poster-xl border border-vintage-border/30 transition-all duration-500 overflow-hidden"
                style={{
                    transform: `scale(${zoomLevel / 100})`,
                    height: '82vh',
                    backgroundColor: currentStyle.bg,
                    clipPath: effectiveMask
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
                <div
                    className={`absolute bottom-0 left-0 right-0 p-10 z-10`}
                    style={{
                        color: currentStyle.fg,
                        textAlign: config.textAlign,
                        paddingBottom: config.mask === 'circle' ? '20%' : '10%' // Add more padding for circle mask
                    }}
                >
                    <div
                        className={`max-w-[80%] mb-4 ${config.textAlign === 'center' ? 'mx-auto' : config.textAlign === 'right' ? 'ml-auto' : 'mr-auto'}`}
                        style={{ borderTop: `1px solid ${currentStyle.accent}40` }}
                    />
                    <h2
                        className={`text-2xl tracking-wider mb-2 ${config.fontFamily === 'serif' ? 'font-serif' :
                            config.fontFamily === 'handwritten' ? 'font-sans italic italic-handwritten' :
                                'font-sans font-bold'
                            }`}
                        style={{ color: currentStyle.fg }}
                    >
                        {config.title || 'TWÓJ TYTUŁ'}
                    </h2>
                    <p className="text-xs tracking-[0.3em] uppercase opacity-60" style={{ color: currentStyle.fg }}>
                        {config.subtitleMode === 'coordinates' ? config.subtitle : (config.customCoordinates || config.subtitle)}
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
