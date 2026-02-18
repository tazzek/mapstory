'use client';

import { Pencil, AlignCenter } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';

export default function TextTab() {
    const config = usePosterStore((s) => s.config);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    return (
        <div className="space-y-10 animate-fade-in">
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Tytuł Główny</label>
                <div className="relative group">
                    <input
                        type="text"
                        value={config.title}
                        onChange={(e) => updateConfig({ title: e.target.value })}
                        className="w-full px-5 py-4 bg-vintage-warm/50 border border-vintage-border rounded-xl text-vintage-text font-serif text-lg focus:ring-4 focus:ring-vintage-primary/10 shadow-inner"
                    />
                    <Pencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-vintage-muted/40" />
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Podtytuł</label>
                <div className="flex items-center justify-between mb-2">
                    <button
                        onClick={() => updateConfig({ showCoordinates: !config.showCoordinates })}
                        className={`text-[9px] uppercase font-bold px-3 py-1.5 rounded-full transition-all border ${config.showCoordinates ? 'bg-vintage-primary text-white border-vintage-primary shadow-sm' : 'bg-gray-100 border-gray-200 text-gray-400'}`}
                    >
                        {config.showCoordinates ? 'Współrzędne: Tak' : 'Współrzędne: Nie'}
                    </button>
                </div>
                <input
                    type="text"
                    value={config.customCoordinates || config.subtitle}
                    onChange={(e) => updateConfig({ customCoordinates: e.target.value })}
                    className="w-full px-5 py-4 bg-vintage-warm/50 border border-vintage-border rounded-xl text-vintage-text font-sans focus:ring-4 focus:ring-vintage-primary/10 shadow-inner"
                />
            </div>

            <div className="flex items-center justify-between p-5 bg-vintage-bg rounded-2xl border border-vintage-border/50 mt-8 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl text-vintage-primary shadow-sm"><AlignCenter size={22} /></div>
                    <div>
                        <span className="block text-sm font-bold text-vintage-text">Auto-centrowanie</span>
                        <span className="text-[9px] text-vintage-muted uppercase tracking-wider">Stała pozycja mapy</span>
                    </div>
                </div>
                <div className="w-11 h-6 bg-vintage-primary rounded-full relative cursor-pointer shadow-inner">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                </div>
            </div>
        </div>
    );
}
