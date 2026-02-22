'use client';

import { LuZoomIn, LuZoomOut, LuRotateCcw } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';

export default function ZoomControl() {
    const zoomLevel = usePosterStore((s) => s.zoomLevel);
    const zoomIn = usePosterStore((s) => s.zoomIn);
    const zoomOut = usePosterStore((s) => s.zoomOut);
    const setZoom = usePosterStore((s) => s.setZoom);

    return (
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-vintage-border/50 p-1.5">
            <button
                onClick={zoomOut}
                disabled={zoomLevel <= 50}
                className="p-2.5 rounded-xl hover:bg-vintage-bg text-vintage-text transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <LuZoomOut size={18} />
            </button>
            <button
                onClick={() => setZoom(100)}
                className="px-3 py-1 text-xs font-bold text-vintage-muted hover:text-vintage-primary transition-colors min-w-[3rem] text-center"
            >
                {zoomLevel}%
            </button>
            <button
                onClick={zoomIn}
                disabled={zoomLevel >= 200}
                className="p-2.5 rounded-xl hover:bg-vintage-bg text-vintage-text transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <LuZoomIn size={18} />
            </button>
            <div className="w-px h-6 bg-vintage-border mx-1"></div>
            <button
                onClick={() => setZoom(100)}
                className="p-2.5 rounded-xl hover:bg-vintage-bg text-vintage-muted transition-all"
                title="Reset"
            >
                <LuRotateCcw size={16} />
            </button>
        </div>
    );
}
