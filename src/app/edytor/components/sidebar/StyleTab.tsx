import React from 'react';
import { Check, Maximize, Building2, MapPin, Heart, Home } from 'lucide-react';
import { PosterConfig, MapStyle } from '@/types/poster';

interface StyleTabProps {
    config: PosterConfig;
    setConfig: React.Dispatch<React.SetStateAction<PosterConfig>>;
}

const mapStyles: { id: MapStyle; label: string; colors: string[] }[] = [
    { id: 'modern', label: 'Modern Minimal', colors: ['#FFF', '#EEE', '#333'] },
    { id: 'noir', label: 'Midnight Noir', colors: ['#111', '#222', '#D4AF37'] },
    { id: 'vintage', label: 'Classic Vintage', colors: ['#F0E6D2', '#D9C5B2', '#8C7355'] },
    { id: 'scandi', label: 'Nordic Scandi', colors: ['#FFF', '#E8E8E8', '#2C3E50'] },
];

export default function StyleTab({ config, setConfig }: StyleTabProps) {
    return (
        <div className="space-y-10 animate-fade-in">
            <div className="space-y-6">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Stylistyka</label>
                <div className="grid grid-cols-2 gap-3">
                    {mapStyles.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => setConfig(prev => ({ ...prev, style: style.id }))}
                            className={`group relative flex flex-col items-center p-4 rounded-3xl border-2 transition-all duration-300 ${config.style === style.id
                                    ? 'bg-vintage-bg/50 border-vintage-primary shadow-xl'
                                    : 'bg-white border-vintage-border hover:border-vintage-secondary hover:shadow-lg'
                                }`}
                        >
                            <div className="relative mb-3">
                                <div className="flex -space-x-2">
                                    {style.colors.map((c, i) => (
                                        <div
                                            key={c}
                                            className="w-6 h-6 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: c, zIndex: 10 - i }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <span className={`text-[12px] font-bold tracking-tight text-center ${config.style === style.id ? 'text-vintage-text' : 'text-vintage-muted'}`}>
                                {style.label}
                            </span>
                            {config.style === style.id && (
                                <div className="absolute top-2 right-2 text-white bg-vintage-primary rounded-full p-1 shadow-md">
                                    <Check size={10} strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* PERSPECTIVE */}
            <div className="space-y-5 pt-6 border-t border-dashed border-vintage-border/60">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Perspektywa</label>
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center gap-3 p-4 rounded-xl bg-vintage-paper border-2 border-vintage-primary text-vintage-text shadow-sm transition-all">
                        <div className="p-1.5 bg-white rounded shadow-sm text-vintage-primary"><Maximize size={16} /></div>
                        <span className="text-sm font-bold">2D</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 rounded-xl bg-white border-2 border-vintage-border text-vintage-muted hover:text-vintage-text hover:border-vintage-primary transition-all">
                        <div className="p-1.5 bg-vintage-warm rounded shadow-sm"><Building2 size={16} /></div>
                        <span className="text-sm font-bold">3D</span>
                    </button>
                </div>
            </div>

            {/* MARKER */}
            <div className="space-y-6 pt-10 border-t border-dashed border-vintage-border/60">
                <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Znacznik Miejsca</label>
                    <button
                        onClick={() => setConfig(prev => ({ ...prev, marker: { ...prev.marker, enabled: !prev.marker.enabled } }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-4 focus:ring-vintage-primary/20 ${config.marker.enabled ? 'bg-vintage-primary' : 'bg-gray-300'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.marker.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {config.marker.enabled && (
                    <div className="p-6 bg-vintage-paper/40 rounded-3xl border border-vintage-border/60 space-y-6 animate-slide-up">
                        <div className="flex gap-2 justify-around">
                            {(['pin', 'heart', 'home'] as const).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setConfig(prev => ({ ...prev, marker: { ...prev.marker, style: type } }))}
                                    className={`p-2.5 rounded-xl transition-all ${config.marker.style === type ? 'bg-white shadow-md text-vintage-primary ring-2 ring-vintage-primary' : 'bg-white/50 text-vintage-muted hover:bg-white hover:text-vintage-text'}`}
                                >
                                    {type === 'pin' && <MapPin size={22} />}
                                    {type === 'heart' && <Heart size={22} />}
                                    {type === 'home' && <Home size={22} />}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center gap-3">
                            {['#A88B5E', '#D9534F', '#2C3E50', '#5D6D5E'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => setConfig(prev => ({ ...prev, marker: { ...prev.marker, color } }))}
                                    className={`w-7 h-7 rounded-full border-2 transition-all ${config.marker.color === color ? 'border-gray-500 scale-125' : 'border-white hover:scale-110 shadow-sm'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
