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
        <div className="hidden mobile:flex items-center justify-between gap-3 px-6 py-3 bg-gray-900 border-t border-white/5 shadow-[0_-4px_30px_rgba(0,0,0,0.2)] z-[70] h-[78px] safe-area-bottom">
            {/* Format Selector Button */}
            <button
                onClick={handleFormatClick}
                className="flex flex-col items-start justify-center flex-1 min-w-0 group"
            >
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-0.5">Wymiary</span>
                <div className="flex items-center gap-1.5 overflow-hidden">
                    <span className="text-sm font-bold text-white truncate">{formatLabel}</span>
                    <LuMaximize2 size={12} className="text-white/30 group-active:text-white transition-colors" />
                </div>
            </button>

            {/* Price & Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="flex items-center gap-4 bg-white text-gray-900 px-6 h-[52px] rounded-xl active:scale-[0.97] transition-all shadow-[0_8px_20px_rgba(255,255,255,0.1)]"
            >
                <div className="flex flex-col items-end leading-tight">
                    <span className="text-base font-black tracking-tight">{pricing.formattedPrice}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Do koszyka</span>
                </div>
                <div className="w-px h-6 bg-gray-900/10" />
                <LuShoppingCart size={20} />
            </button>
        </div>
    );
}
