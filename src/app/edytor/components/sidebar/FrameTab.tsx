'use client';

import { Frame, FileDown, Sparkles } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';
import { PosterSize } from '@/types/poster';

export default function FrameTab() {
    const config = usePosterStore((s) => s.config);
    const activeTab = usePosterStore((s) => s.activeTab);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    if (activeTab === 'Dodatki') {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="p-5 bg-vintage-warm rounded-full text-vintage-primary mb-5 shadow-sm">
                    <Sparkles size={32} />
                </div>
                <h3 className="font-serif text-xl mb-2 text-vintage-text">Personalizowane Dodatki</h3>
                <p className="text-sm text-vintage-muted px-4 leading-relaxed">
                    Dodaj naklejki, dedykowane opakowanie prezentowe lub certyfikat autentyczności.
                </p>
                <div className="mt-8 p-4 bg-vintage-bg rounded-xl border border-dashed border-vintage-border w-full">
                    <span className="text-[9px] font-bold text-vintage-muted uppercase tracking-widest">Funkcja dostępna wkrótce</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in">
            <div className="space-y-6">
                <label className="text-[9px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Wybierz Produkt</label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => updateConfig({ isDigital: false })}
                        className={`p-5 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 ${!config.isDigital ? 'border-vintage-primary bg-vintage-paper shadow-xl' : 'border-vintage-border bg-white'}`}
                    >
                        <div className={`p-3 rounded-xl ${!config.isDigital ? 'bg-vintage-primary text-white' : 'bg-vintage-warm text-vintage-muted'}`}><Frame size={22} /></div>
                        <div className="text-center">
                            <span className={`block text-xs font-bold ${!config.isDigital ? 'text-vintage-text' : 'text-vintage-text/70'}`}>Wydruk Premium</span>
                            <span className="text-[10px] text-vintage-primary font-bold mt-1 block">OD 149 PLN</span>
                        </div>
                    </button>

                    <button
                        onClick={() => updateConfig({ isDigital: true })}
                        className={`p-5 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 ${config.isDigital ? 'border-vintage-primary bg-vintage-paper shadow-xl' : 'border-vintage-border bg-white'}`}
                    >
                        <div className={`p-3 rounded-xl ${config.isDigital ? 'bg-vintage-primary text-white' : 'bg-vintage-warm text-vintage-muted'}`}><FileDown size={22} /></div>
                        <div className="text-center">
                            <span className={`block text-xs font-bold ${config.isDigital ? 'text-vintage-text' : 'text-vintage-text/70'}`}>Plik Cyfrowy</span>
                            <span className="text-[10px] text-vintage-primary font-bold mt-1 block">49 PLN</span>
                        </div>
                    </button>
                </div>
            </div>

            {!config.isDigital && (
                <div className="space-y-5 pt-6 border-t border-dashed border-vintage-border/60">
                    <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Rozmiar Plakatu</label>
                    <div className="grid grid-cols-3 gap-3">
                        {(['30x40', '50x70', '70x100'] as PosterSize[]).map(size => (
                            <button
                                key={size}
                                onClick={() => updateConfig({ size })}
                                className={`py-3 text-[13px] font-bold border-2 rounded-xl transition-all ${config.size === size ? 'border-vintage-primary text-vintage-primary bg-vintage-paper shadow-md' : 'border-vintage-border text-vintage-muted hover:border-vintage-secondary'}`}
                            >
                                {size} cm
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
