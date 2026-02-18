'use client';

import { Search, Sparkles, MapPin, Crop } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';

export default function LocationTab() {
    const location = usePosterStore((s) => s.config.location);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Wyszukaj Miejsce</label>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-vintage-muted transition-colors group-focus-within:text-vintage-primary">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => updateConfig({ location: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 bg-vintage-warm/50 border border-vintage-border rounded-xl text-vintage-text focus:outline-none focus:ring-4 focus:ring-vintage-primary/10 focus:border-vintage-primary transition-all font-medium text-base shadow-inner"
                        placeholder="Gdzie zaczęła się Twoja historia?"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        className="text-[11px] text-vintage-primary hover:text-vintage-primaryHover font-bold transition-colors flex items-center gap-2 self-start uppercase tracking-wider"
                        onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition((pos) => {
                                    updateConfig({
                                        lat: pos.coords.latitude,
                                        lng: pos.coords.longitude,
                                        location: 'Twoja lokalizacja'
                                    });
                                });
                            }
                        }}
                    >
                        <MapPin size={12} /> Użyj mojej lokalizacji
                    </button>
                </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-vintage-border/40 space-y-3 shadow-soft">
                <div className="flex items-center gap-3 text-vintage-primary">
                    <div className="p-2 bg-vintage-warm/30 rounded-lg">
                        <Crop size={18} />
                    </div>
                    <span className="font-bold text-sm tracking-tight text-vintage-text">Instrukcja kadrowania</span>
                </div>
                <p className="text-xs text-vintage-muted leading-relaxed">
                    Chwyć mapę i przesuwaj, aby znaleźć idealny kadr. Użyj scrolla, aby przybliżyć widok ulicy lub oddalić na widok kraju.
                </p>
            </div>
        </div>
    );
}
