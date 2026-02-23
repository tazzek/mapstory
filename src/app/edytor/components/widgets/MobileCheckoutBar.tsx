'use client';

import React from 'react';
import { LuShoppingCart, LuMaximize2 } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';

export default function MobileCheckoutBar() {
    const pricing = usePosterStore((s) => s.pricing);
    const config = usePosterStore((s) => s.config);
    const setActiveTab = usePosterStore((s) => s.setActiveTab);
    const setMobilePanelOpen = usePosterStore((s) => s.setMobilePanelOpen);

    const handleAddToCart = async () => {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config, productId: 'streetmap-v1' }),
            });

            if (response.ok) {
                console.log('Product added to cart successfully');
            } else {
                console.error('Failed to add to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleFormatClick = () => {
        setActiveTab('Wydruk');
        setMobilePanelOpen(true);
    };

    const formatLabel = config.isDigital
        ? 'Cyfrowy'
        : `${config.size} cm`;

    return (
        <div className="hidden mobile:flex items-center justify-between gap-3 px-4 py-3 bg-white border-t border-vintage-border/10 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-[70] h-[72px]">
            {/* Format Selector Button */}
            <button
                onClick={handleFormatClick}
                className="flex flex-col items-start justify-center flex-1 min-w-0"
            >
                <span className="text-[10px] text-vintage-muted uppercase tracking-wider font-bold">Format</span>
                <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="text-sm font-bold text-vintage-text truncate">{formatLabel}</span>
                    <LuMaximize2 size={12} className="text-vintage-muted flex-shrink-0" />
                </div>
            </button>

            {/* Price & Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="flex items-center gap-3 bg-vintage-text text-white px-6 h-full rounded-xl active:scale-95 transition-all shadow-lg"
            >
                <div className="flex flex-col items-end leading-tight">
                    <span className="text-sm font-bold">{pricing.formattedPrice}</span>
                    <span className="text-[9px] text-white/60 uppercase tracking-tighter">Do koszyka</span>
                </div>
                <LuShoppingCart size={18} />
            </button>
        </div>
    );
}
