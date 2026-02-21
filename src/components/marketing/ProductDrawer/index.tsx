'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { useProductDrawerStore } from '@/store/useProductDrawer';
import { PRODUCTS_DATA } from './productsData';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

export const ProductDrawer = () => {
    const { isOpen, activeBg, closeDrawer } = useProductDrawerStore();
    const pathname = usePathname();

    // Handle escape key closing
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeDrawer();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeDrawer]);

    // Trap scroll when opened
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    // Do not render anything if we are inside the editor
    if (pathname === '/edytor') return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col justify-center overflow-hidden animate-fade-in">
            {/* Dynamic Background Overlay */}
            <div
                className={cn(
                    "absolute inset-0 transition-colors duration-1000 ease-in-out opacity-95",
                    activeBg
                )}
            />

            {/* Backdrop blur texture */}
            <div className="absolute inset-0 backdrop-blur-xl pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col h-full w-full">

                {/* Header */}
                <div className="flex justify-between items-center p-6 md:p-8 lg:px-12">
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-current opacity-90">
                        Wybierz kolekcję.
                    </h2>
                    <button
                        onClick={closeDrawer}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors group backdrop-blur-sm"
                    >
                        <X size={28} className="text-current group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Horizontal Scroll Area / Grid */}
                <div className="flex-1 flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory px-4 md:px-12 hide-scrollbar pb-10">
                    <div className="flex flex-row items-center justify-start min-w-max mx-auto px-4 md:px-8">
                        {PRODUCTS_DATA.map((product) => (
                            <div key={product.id} className="snap-center">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer hints */}
                <div className="pb-8 text-center text-current/50 text-sm font-medium tracking-widest uppercase">
                    Przesuń, aby odkryć więcej
                </div>
            </div>
        </div>
    );
};
