'use client';

import { LuShare2, LuSofa } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';

export default function ShareAction() {
    const showRoomView = usePosterStore((s) => s.showRoomView);
    const toggleRoomView = usePosterStore((s) => s.toggleRoomView);

    return (
        <div className="flex items-center gap-2">
            <button className="p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-vintage-border/50 text-vintage-text hover:text-vintage-primary transition-all">
                <LuShare2 size={18} />
            </button>
            <button
                onClick={toggleRoomView}
                className={`p-3 rounded-2xl shadow-xl border transition-all ${showRoomView
                        ? 'bg-vintage-primary text-white border-vintage-primary'
                        : 'bg-white/95 backdrop-blur-md border-vintage-border/50 text-vintage-text hover:text-vintage-primary'
                    }`}
            >
                <LuSofa size={18} />
            </button>
        </div>
    );
}
