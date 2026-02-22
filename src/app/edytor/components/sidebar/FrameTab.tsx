'use client';

import React from 'react';
import { LuFrame, LuFileDown, LuSparkles, LuX, LuCheck, LuImage as ImageIcon } from 'react-icons/lu';
import { MdPlace, MdFavorite, MdHome, MdCameraAlt, MdArrowForward, MdArrowDownward, MdArrowBack, MdArrowUpward } from 'react-icons/md';
import { usePosterStore } from '@/store/usePosterStore';
import { PosterSize, Material, FrameStyle } from '@/types/poster';

export default function FrameTab() {
    const config = usePosterStore((s) => s.config);
    const activeTab = usePosterStore((s) => s.activeTab);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    if (activeTab === 'Dodatki') {
        const markerColors = ['#000000', '#FFFFFF', '#D4AF37', '#E63946', '#1D3557', '#2A9D8F', '#F4A261', '#E76F51', '#9C6644', '#6D6875', '#2E4A31', '#8B8970'];
        const markerStyles = [
            { id: 'pin', icon: MdPlace, label: 'Pinezka' },
            { id: 'heart', icon: MdFavorite, label: 'Serce' },
            { id: 'home', icon: MdHome, label: 'Dom' },
            { id: 'camera', icon: MdCameraAlt, label: 'Aparat' },
            { id: 'arrow-up', icon: MdArrowUpward, label: 'Góra' },
            { id: 'arrow-down', icon: MdArrowDownward, label: 'Dół' },
            { id: 'arrow-left', icon: MdArrowBack, label: 'Lewo' },
            { id: 'arrow-right', icon: MdArrowForward, label: 'Prawo' },
        ] as const;

        return (
            <div className="space-y-10 animate-fade-in pb-10">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Znacznik Miejsca</label>
                        <button
                            onClick={() => updateConfig({ marker: { ...config.marker, enabled: !config.marker.enabled } })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-4 focus:ring-vintage-primary/20 ${config.marker.enabled ? 'bg-vintage-primary' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.marker.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {config.marker.enabled && (
                        <div className="space-y-8 animate-slide-up">
                            {/* Marker Style Grid */}
                            <div className="grid grid-cols-4 gap-3">
                                {markerStyles.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => updateConfig({ marker: { ...config.marker, style: style.id as any } })}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${config.marker.style === style.id
                                            ? 'border-vintage-primary bg-vintage-primary/5 shadow-sm text-vintage-primary'
                                            : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <style.icon size={24} />
                                        <span className="text-[10px] mt-1 uppercase tracking-wider">{style.label}</span>
                                    </button>
                                ))}
                            </div>

                            {/* Color Selection */}
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Kolor Znacznika</label>
                                <div className="grid grid-cols-6 gap-3 mt-6">
                                    {markerColors.map(color => {
                                        const isSelected = config.marker.color === color;
                                        const isWhite = color === '#FFFFFF';

                                        return (
                                            <button
                                                key={color}
                                                onClick={() => updateConfig({ marker: { ...config.marker, color } })}
                                                className={`relative w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-all duration-300 outline-none ${isSelected ? 'ring-2 ring-offset-2' : ''} ${isWhite && !isSelected ? 'border border-gray-200 shadow-sm' : ''}`}
                                                style={{
                                                    backgroundColor: color,
                                                    '--tw-ring-color': isWhite ? (isSelected ? '#000000' : '#e5e7eb') : color
                                                } as React.CSSProperties}
                                            >
                                                {/* Wewnętrzna kropka zaznaczenia */}
                                                {isSelected && (
                                                    <span
                                                        className="w-2.5 h-2.5 rounded-full transition-all duration-300 animate-in zoom-in"
                                                        style={{ backgroundColor: isWhite ? '#000000' : '#FFFFFF' }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Placeholder for future additions */}
                <div className="p-6 bg-vintage-paper/40 rounded-3xl border border-dashed border-vintage-border/60 text-center">
                    <LuSparkles size={20} className="mx-auto mb-3 text-vintage-primary/40" />
                    <span className="text-[10px] font-bold text-vintage-muted uppercase tracking-widest">Więcej opcji wkrótce</span>
                </div>
            </div>
        );
    }

    // --- WYDRUK (PRINT) TAB ---

    const materials: { id: Material; label: string; desc: string; icon: any }[] = [
        {
            id: 'poster',
            label: 'PLAKAT PREMIUM',
            desc: 'Papier matowy 220g, jakość muzealna.',
            icon: LuFrame
        },
        {
            id: 'canvas',
            label: 'PŁÓTNO CANVAS',
            desc: 'Bawełniane płótno naciągnięte na krosno.',
            icon: ImageIcon
        },
    ];

    const sizes: { id: PosterSize; label: string }[] = [
        { id: '30x40', label: '30x40 cm' },
        { id: '40x50', label: '40x50 cm' },
        { id: '50x70', label: '50x70 cm' },
        { id: '70x100', label: '70x100 cm' },
    ];

    const frames: { id: FrameStyle; label: string; price: string; color: string; icon?: any }[] = [
        { id: 'none', label: 'Bez ramy', price: 'Domyślne', color: 'transparent', icon: LuX },
        { id: 'wood', label: 'Drewno', price: '+39 PLN', color: '#D2B48C' },
        { id: 'black', label: 'Czarna', price: '+39 PLN', color: '#1a1a1a' },
        { id: 'white', label: 'Biała', price: '+39 PLN', color: '#f5f5f5' },
    ];

    // Prices Record for display
    const PRICES: Record<string, number> = {
        'poster_30x40': 89,
        'poster_40x50': 109,
        'poster_50x70': 149,
        'poster_70x100': 199,
        'canvas_30x40': 159,
        'canvas_40x50': 199,
        'canvas_50x70': 259,
        'canvas_70x100': 349,
    };

    return (
        <div className="space-y-10 animate-fade-in pb-10">
            {/* 1. MATERIAŁ */}
            <div className="space-y-5">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">1. Materiał</label>
                <div className="grid grid-cols-1 gap-3">
                    {materials.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => updateConfig({ material: m.id })}
                            className={`p-3 border rounded-2xl flex items-center gap-3 transition-all duration-300 text-left relative ${config.material === m.id ? 'selected-card shadow-none' : 'border-vintage-border bg-white hover:border-vintage-primary/30'}`}
                        >
                            <div className={`p-2 rounded-xl shrink-0 ${config.material === m.id ? 'bg-vintage-primary text-white' : 'bg-vintage-warm text-vintage-muted'}`}>
                                <m.icon size={19} />
                            </div>
                            <div>
                                <span className={`block text-xs font-bold leading-tight ${config.material === m.id ? 'text-vintage-primary' : 'text-vintage-text/70'}`}>{m.label}</span>
                                <span className="text-[10px] text-vintage-muted mt-0.5 block leading-tight">{m.desc}</span>
                            </div>
                            {config.material === m.id && (
                                <div className="absolute top-2 right-2 bg-white text-vintage-primary rounded-full p-1 shadow-md scale-110">
                                    <LuCheck size={10} strokeWidth={4} />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. FORMAT */}
            <div className="space-y-5">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">2. Format (Rozmiar)</label>
                <div className="grid grid-cols-2 gap-3">
                    {sizes.map((s) => {
                        const price = PRICES[`${config.material}_${s.id}`];
                        return (
                            <button
                                key={s.id}
                                onClick={() => updateConfig({ size: s.id })}
                                className={`p-4 border rounded-2xl flex flex-col items-center gap-1 transition-all duration-300 relative ${config.size === s.id ? 'selected-card shadow-none' : 'border-vintage-border bg-white hover:border-vintage-primary/30'}`}
                            >
                                <span className={`text-[13px] font-bold ${config.size === s.id ? 'text-vintage-primary' : 'text-vintage-text/80'}`}>{s.label}</span>
                                <span className="text-[10px] text-vintage-muted font-medium">{price} PLN</span>
                                {config.size === s.id && (
                                    <div className="absolute top-2 right-2 bg-white text-vintage-primary rounded-full p-1 shadow-md scale-110">
                                        <LuCheck size={10} strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 3. OPRAWA (Only for poster) */}
            {config.material === 'poster' && (
                <div className="space-y-5 pt-6 border-t border-dashed border-vintage-border/60 animate-fade-in">
                    <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">3. Dobierz Ramę (Opcjonalnie)</label>
                    <div className="grid grid-cols-4 gap-3">
                        {frames.map((f) => (
                            <button
                                key={f.id}
                                onClick={() => updateConfig({ frame: f.id })}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`aspect-square w-full rounded-xl border flex items-center justify-center overflow-hidden transition-all relative ${config.frame === f.id ? 'selected-card shadow-none' : 'border-vintage-border hover:border-vintage-primary/30 bg-white'}`}>
                                    {f.id === 'none' ? (
                                        <f.icon size={20} className="text-vintage-muted/30" />
                                    ) : (
                                        <div className="absolute inset-0 p-1">
                                            {/* Simulated frame corner photo look */}
                                            <div
                                                className="w-full h-full rounded-md shadow-inner"
                                                style={{
                                                    background: `linear-gradient(135deg, ${f.color} 50%, #eee 50%, #ddd 70%, ${f.color} 70%)`,
                                                    border: `2px solid ${f.color === '#f5f5f5' ? '#ddd' : '#333'}`
                                                }}
                                            />
                                        </div>
                                    )}
                                    {config.frame === f.id && (
                                        <div className="absolute top-2 right-2 bg-white text-vintage-primary rounded-full p-1 shadow-md scale-110 z-10">
                                            <LuCheck size={10} strokeWidth={4} />
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <span className={`block text-[9px] font-bold uppercase tracking-tight ${config.frame === f.id ? 'text-vintage-primary' : 'text-vintage-muted'}`}>{f.label}</span>
                                    <span className="block text-[8px] text-vintage-muted/70 mt-0.5">{f.price}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
