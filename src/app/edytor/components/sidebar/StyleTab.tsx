'use client';

import { LuSquare, LuCircle, LuHeart, LuHouse, LuCheck } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';
import { MapStyle, MapMask } from '@/types/poster';

import { themes } from '@/config/themes';

const shapes: { id: MapMask; label: string; icon: any }[] = [
    { id: 'rectangle', label: 'Pełna', icon: LuSquare },
    { id: 'circle', label: 'Koło', icon: LuCircle },
    { id: 'heart', label: 'Serce', icon: LuHeart },
    { id: 'home', label: 'Domek', icon: LuHouse },
];

export default function StyleTab() {
    const config = usePosterStore((s) => s.config);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* STYLES SECTION */}
            <div className="space-y-6">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Wybierz Styl</label>
                <div className="grid grid-cols-2 gap-4">
                    {Object.values(themes).map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => updateConfig({ style: theme.id as MapStyle })}
                            className={`group flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${config.style === theme.id
                                ? 'selected-card border-vintage-primary'
                                : 'border-vintage-border hover:border-vintage-primary/30 hover:shadow-md'
                                }`}
                        >
                            {/* Top Image: Swatch Placeholder */}
                            <div className="h-20 w-full relative overflow-hidden bg-vintage-warm/20">
                                <div
                                    className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
                                    style={{ backgroundColor: theme.swatchColors[0], backgroundImage: `repeating-linear-gradient(45deg, ${theme.swatchColors[1]} 0, ${theme.swatchColors[1]} 1px, transparent 0, transparent 50%)`, backgroundSize: '10px 10px' }}
                                />
                                {config.style === theme.id && (
                                    <div className="absolute top-2 right-2 bg-white text-vintage-primary rounded-full p-1 shadow-md scale-110">
                                        <LuCheck size={10} strokeWidth={4} />
                                    </div>
                                )}
                            </div>

                            {/* Bottom: Colors + Name */}
                            <div className={`px-3 py-2 flex items-center gap-2.5 transition-colors ${config.style === theme.id ? 'bg-transparent' : 'bg-white'}`}>
                                <div className="flex -space-x-1.5 shrink-0">
                                    {theme.swatchColors.map((c) => (
                                        <div
                                            key={c}
                                            className="w-3 h-3 rounded-full border border-white shadow-sm"
                                            style={{ backgroundColor: c }}
                                        ></div>
                                    ))}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider truncate ${config.style === theme.id ? 'text-vintage-primary' : 'text-vintage-muted'}`}>
                                    {theme.label}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* SHAPE SECTION */}
            <div className="space-y-6 pt-6 border-t border-dashed border-vintage-border/60">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Kształt Mapy</label>
                <div className="grid grid-cols-4 gap-3">
                    {shapes.map((shape) => (
                        <button
                            key={shape.id}
                            onClick={() => updateConfig({ mask: shape.id })}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${config.mask === shape.id
                                ? 'selected-card border-vintage-primary text-vintage-primary'
                                : 'bg-white border-vintage-border/50 text-vintage-muted hover:border-vintage-primary/30 hover:bg-vintage-warm/20'}`}
                        >
                            <shape.icon size={20} />
                            <span className="text-[9px] font-bold uppercase tracking-wider">{shape.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
