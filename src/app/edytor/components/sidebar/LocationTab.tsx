'use client';

import { Search, Sparkles } from 'lucide-react';
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
                <div className="flex justify-between items-center px-1">
                    <p className="text-xs text-vintage-muted italic">Np. &quot;Kraków, Rynek Główny&quot;</p>
                    <button className="text-xs text-vintage-primary hover:text-vintage-primaryHover font-bold flex items-center gap-1.5 transition-all uppercase tracking-wider">
                        <Sparkles size={12} /> Losuj
                    </button>
                </div>
            </div>
        </div>
    );
}
