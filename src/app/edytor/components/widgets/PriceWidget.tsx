import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface PriceWidgetProps {
    currentPrice: string;
}

export default function PriceWidget({ currentPrice }: PriceWidgetProps) {
    return (
        <div className="absolute bottom-10 right-10 z-30 h-14 flex items-center animate-fade-in-up delay-100">
            <div className="relative group">
                <button className="bg-vintage-text text-white h-14 px-10 rounded-full shadow-2xl flex items-center gap-5 hover:bg-black transition-all duration-300 hover:-translate-y-1.5 border border-white/10 group">
                    <span className="font-serif italic text-xl text-white/90">{currentPrice}</span>
                    <span className="w-px h-6 bg-white/20"></span>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-xs tracking-[0.25em] uppercase">DO KOSZYKA</span>
                        <ShoppingBag size={20} className="transition-transform group-hover:scale-110" />
                    </div>
                </button>
                <div className="absolute -inset-1 bg-vintage-primary/30 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
        </div>
    );
}
