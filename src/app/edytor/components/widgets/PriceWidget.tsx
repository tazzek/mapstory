'use client';

import { LuShoppingCart } from 'react-icons/lu';
import { usePosterStore } from '@/store/usePosterStore';

export default function PriceWidget() {
    const pricing = usePosterStore((s) => s.pricing);
    const config = usePosterStore((s) => s.config);

    const handleAddToCart = async () => {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ config, productId: 'streetmap-v1' }),
            });

            if (response.ok) {
                console.log('Product added to cart successfully');
                // Future: Redirect to checkout or show success notification
            } else {
                console.error('Failed to add to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            className="flex items-center gap-3 bg-vintage-text text-white px-6 py-3.5 rounded-2xl shadow-2xl hover:bg-vintage-primary transition-all duration-300 group"
        >
            <LuShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
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
