'use client';

import { LuPencil, LuAlignLeft, LuAlignCenter, LuAlignRight, LuX, LuType, LuQuote, LuPenTool } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';

export default function TextTab() {
    const config = usePosterStore((s) => s.config);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    const fontStyles = [
        { id: 'sans', label: 'Modern', icon: <LuType size={18} /> },
        { id: 'serif', label: 'Classic', icon: <LuQuote size={18} /> },
        { id: 'handwritten', label: 'Handwritten', icon: <LuPenTool size={18} /> },
    ] as const;

    const alignments = [
        { id: 'left', icon: <LuAlignLeft size={18} /> },
        { id: 'center', icon: <LuAlignCenter size={18} /> },
        { id: 'right', icon: <LuAlignRight size={18} /> },
    ] as const;

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Main Title Section */}
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Tytuł Główny</label>
                <div className="relative group">
                    <input
                        type="text"
                        value={config.title}
                        onChange={(e) => updateConfig({ title: e.target.value })}
                        className="w-full pl-5 pr-12 py-4 bg-vintage-warm/50 border border-vintage-border rounded-xl text-vintage-text font-serif text-lg focus:ring-4 focus:ring-vintage-primary/10 transition-all shadow-inner"
                        placeholder="Np. KENNEDY SPACE CENTER"
                    />
                    {config.title && (
                        <button
                            onClick={() => updateConfig({ title: '' })}
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-vintage-muted/40 hover:text-vintage-primary transition-colors"
                        >
                            <LuX size={14} />
                        </button>
                    )}
                    <LuPencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-vintage-muted/40" />
                </div>
            </div>

            {/* Subtitle Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Podtytuł</label>
                    <div className="flex bg-vintage-warm/50 p-1 rounded-xl border border-vintage-border/50 shadow-inner">
                        <button
                            onClick={() => updateConfig({ subtitleMode: 'coordinates' })}
                            className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${config.subtitleMode === 'coordinates' ? 'bg-white text-vintage-primary shadow-sm' : 'text-vintage-muted hover:text-vintage-text'}`}
                        >
                            Współrzędne
                        </button>
                        <div className="w-px bg-vintage-border/30 h-4 self-center mx-0.5" />
                        <button
                            onClick={() => updateConfig({ subtitleMode: 'custom' })}
                            className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all ${config.subtitleMode === 'custom' ? 'bg-white text-vintage-primary shadow-sm' : 'text-vintage-muted hover:text-vintage-text'}`}
                        >
                            Własny
                        </button>
                    </div>
                </div>

                <div className="relative group">
                    <input
                        type="text"
                        value={config.subtitleMode === 'coordinates' ? config.subtitle : (config.customCoordinates || '')}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (config.subtitleMode === 'coordinates') {
                                // Inteligentne przełączenie na tryb własny przy próbie edycji
                                updateConfig({
                                    subtitleMode: 'custom',
                                    customCoordinates: val
                                });
                            } else {
                                updateConfig({ customCoordinates: val });
                            }
                        }}
                        className="w-full pl-5 pr-12 py-4 bg-vintage-warm/50 border border-vintage-border rounded-xl text-vintage-text font-sans text-sm focus:ring-4 focus:ring-vintage-primary/10 transition-all shadow-inner"
                        placeholder={config.subtitleMode === 'coordinates' ? config.subtitle : "Wpisz własny podtytuł..."}
                    />
                    {(config.subtitleMode === 'custom' ? config.customCoordinates : config.subtitle) && (
                        <button
                            onClick={() => {
                                if (config.subtitleMode === 'coordinates') {
                                    // Przy czyszczeniu w trybie współrzędnych też przełączamy na własny
                                    updateConfig({
                                        subtitleMode: 'custom',
                                        customCoordinates: ''
                                    });
                                } else {
                                    updateConfig({ customCoordinates: '' });
                                }
                            }}
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-vintage-muted/40 hover:text-vintage-primary transition-colors"
                        >
                            <LuX size={14} />
                        </button>
                    )}
                    <LuPencil size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-vintage-muted/40" />
                </div>
            </div>

            <div className="h-px bg-vintage-border/30 my-2" />

            {/* Font Section */}
            <div className="space-y-6">
                <div className="space-y-4">
                    <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Styl Pisemny</label>
                    <div className="grid grid-cols-3 gap-3">
                        {fontStyles.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => updateConfig({ fontFamily: style.id })}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${config.fontFamily === style.id
                                    ? 'bg-vintage-primary/5 border-vintage-primary text-vintage-primary shadow-sm'
                                    : 'bg-white border-vintage-border/50 text-vintage-muted hover:border-vintage-primary/30 hover:bg-vintage-warm/20'}`}
                            >
                                {style.icon}
                                <span className="text-[10px] font-bold uppercase tracking-wider">{style.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Wyrównanie</label>
                    <div className="flex gap-2">
                        {alignments.map((align) => (
                            <button
                                key={align.id}
                                onClick={() => updateConfig({ textAlign: align.id })}
                                className={`flex-1 flex justify-center p-3 rounded-xl border transition-all ${config.textAlign === align.id
                                    ? 'bg-vintage-primary/5 border-vintage-primary text-vintage-primary shadow-sm'
                                    : 'bg-white border-vintage-border/50 text-vintage-muted hover:border-vintage-primary/30 hover:bg-vintage-warm/20'}`}
                            >
                                {align.icon}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
