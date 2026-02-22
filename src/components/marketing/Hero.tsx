'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { LuArrowRight, LuCheck, LuGlobe } from 'react-icons/lu';
import { HeroBackground } from './Hero/HeroBackground';
import { ReviewBadge } from './Hero/ReviewBadge';
import { ProductShowcase } from './Hero/ProductShowcase';
import { useProductDrawerStore } from '@/store/useProductDrawer';

export default function Hero() {
    const { openDrawer } = useProductDrawerStore();

    return (
        <section className="relative w-full bg-vintage-paper pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

            {/* Decorative background element */}
            <HeroBackground />

            <div className="container-mapstory relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1 space-y-10 animate-fade-in-up">

                        <ReviewBadge />

                        <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-[1.05] text-vintage-text tracking-tight">
                            Twoje wspomnienia <br />
                            <span className="text-vintage-primary italic relative">
                                na mapie.
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-vintage-secondary opacity-40" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00024 7.23468C32.1645 3.32832 108.887 -2.48628 197.999 2.50853" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                            </span>
                        </h1>

                        <p className="text-lg text-vintage-text/80 leading-relaxed max-w-lg border-l-2 border-vintage-primary/30 pl-6">
                            Zaprojektuj unikalny plakat w stylu Modern Vintage.
                            Połącz precyzję kartografii z emocjami wspomnień.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button variant="dark" size="lg" icon={<LuArrowRight size={18} />} onClick={openDrawer}>
                                Zaprojektuj plakat
                            </Button>
                            <Link href="/inspiracje">
                                <Button variant="outline" size="lg">
                                    Zobacz galerię
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-vintage-text/70 border-t border-vintage-text/10 mt-8">
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-vintage-primary/10 flex items-center justify-center mr-3 text-vintage-primary">
                                    <LuGlobe size={12} />
                                </div>
                                Polska produkcja
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-vintage-primary/10 flex items-center justify-center mr-3 text-vintage-primary">
                                    <LuCheck size={12} />
                                </div>
                                Wysyłka w 48h
                            </div>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <ProductShowcase />
                </div>
            </div>
        </section>
    );
}
