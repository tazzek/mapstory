import React from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ZoomControlProps {
    zoomLevel: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

export default function ZoomControl({ zoomLevel, onZoomIn, onZoomOut }: ZoomControlProps) {
    return (
        <div className="absolute bottom-10 left-10 z-30 h-14 flex items-center animate-fade-in-up delay-100">
            <div className="bg-white/95 backdrop-blur-md rounded-full shadow-2xl border border-white/60 flex items-center px-1.5 py-1.5 h-14">
                <button
                    onClick={onZoomOut}
                    className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-vintage-warm text-vintage-text transition-colors disabled:opacity-20"
                    disabled={zoomLevel <= 50}
                >
                    <ZoomOut size={18} />
                </button>
                <div className="w-16 text-center">
                    <span className="text-[11px] font-bold text-vintage-text select-none tracking-widest">{zoomLevel}%</span>
                </div>
                <button
                    onClick={onZoomIn}
                    className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-vintage-warm text-vintage-text transition-colors disabled:opacity-20"
                    disabled={zoomLevel >= 200}
                >
                    <ZoomIn size={18} />
                </button>
            </div>
        </div>
    );
}
