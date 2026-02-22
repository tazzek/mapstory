'use client';

import { LuChevronDown } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';

export default function FormatWidget() {
    const config = usePosterStore((s) => s.config);

    const label = config.isDigital
        ? 'Cyfrowy'
        : `${config.size} cm`;

    return (
        <button className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-vintage-border/50 text-vintage-text hover:border-vintage-primary transition-all text-sm font-bold">
            <span>Format: {label}</span>
            <LuChevronDown size={14} className="text-vintage-muted" />
        </button>
    );
}
