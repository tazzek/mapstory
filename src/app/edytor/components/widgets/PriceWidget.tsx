'use client';

import { ShoppingCart } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';

export default function PriceWidget() {
    const pricing = usePosterStore((s) => s.pricing);

    return (
        <button className="flex items-center gap-3 bg-vintage-text text-white px-6 py-3.5 rounded-2xl shadow-2xl hover:bg-vintage-primary transition-all duration-300 group">
            <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
            <div className="flex items-center gap-2">
                {pricing.discountPercent > 0 && (
                    <span className="text-white/50 line-through text-sm">{pricing.basePrice} PLN</span>
                )}
                <span className="font-bold tracking-wide">{pricing.formattedPrice}</span>
            </div>
            {pricing.quantity > 1 && (
                <span className="text-white/60 text-sm">×{pricing.quantity}</span>
            )}
            <span className="text-white/60 text-sm">• Do koszyka</span>
        </button>
    );
}
