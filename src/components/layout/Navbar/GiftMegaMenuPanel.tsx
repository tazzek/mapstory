'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LuGift, LuArrowRight, LuHeart, LuHouse, LuBaby, LuUsers } from 'react-icons/lu';
import { cn } from '@/lib/utils';

interface GiftMegaMenuPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GiftMegaMenuPanel({ isOpen, onClose }: GiftMegaMenuPanelProps) {
    return (
        <div
            className={cn(
                "hidden md:block absolute top-full left-0 w-full bg-white border-t border-vintage-border shadow-poster transition-all duration-500 overflow-hidden",
                isOpen ? 'opacity-100 max-h-[700px] visible' : 'opacity-0 max-h-0 invisible'
            )}
            onMouseLeave={onClose}
        >
            <div className="container-mapstory py-12">
                <div className="flex gap-12 lg:gap-16 h-[400px]">

                    {/* LEWA STRONA: Linki SEO (Okazje i Dla Kogo) */}
                    <div className="w-[45%] flex gap-12 pr-8 border-r border-vintage-border/30">

                        {/* Kolumna 1: Okazje (Szeroka) */}
                        <div className="flex-[2]">
                            <h3 className="font-serif text-3xl xl:text-4xl font-bold tracking-tight mb-8 text-vintage-text leading-tight border-b border-vintage-border/50 pb-3">
                                Wyjątkowe Okazje.
                            </h3>
                            <ul className="grid grid-cols-1 gap-y-4">
                                <li>
                                    <Link href="/prezenty/zareczyny" className="group flex items-center gap-3 w-full text-left" onClick={onClose}>
                                        <LuHeart size={16} className="text-vintage-muted opacity-40 group-hover:text-red-500 group-hover:opacity-100 transition-all duration-300" />
                                        <span className="font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300">Zaręczyny</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/prezenty/rocznica" className="group flex items-center gap-3 w-full text-left" onClick={onClose}>
                                        <LuUsers size={16} className="text-vintage-muted opacity-40 group-hover:text-vintage-primary group-hover:opacity-100 transition-all duration-300" />
                                        <span className="font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300">Rocznica</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/prezenty/na-slub" className="group flex items-center gap-3 w-full text-left" onClick={onClose}>
                                        <LuHeart size={16} className="text-vintage-muted opacity-40 group-hover:text-vintage-primary group-hover:opacity-100 transition-all duration-300" />
                                        <span className="font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300">Ślub</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/prezenty/walentynki" className="group flex items-center gap-3 w-full text-left" onClick={onClose}>
                                        <LuHeart size={16} className="text-vintage-muted opacity-40 group-hover:text-red-400 group-hover:opacity-100 transition-all duration-300" />
                                        <span className="font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300">Walentynki</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/prezenty/na-parapetowke" className="group flex items-center gap-3 w-full text-left" onClick={onClose}>
                                        <LuHouse size={16} className="text-vintage-muted opacity-40 group-hover:text-vintage-primary group-hover:opacity-100 transition-all duration-300" />
                                        <span className="font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300">Parapetówka</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/prezenty/na-narodziny" className="group flex items-center gap-3 w-full text-left" onClick={onClose}>
                                        <LuBaby size={16} className="text-vintage-muted opacity-40 group-hover:text-blue-400 group-hover:opacity-100 transition-all duration-300" />
                                        <span className="font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300">Narodziny Dziecka</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Kolumna 2: Dla Kogo (Węższa) */}
                        <div className="flex-1">
                            <h3 className="font-serif text-3xl xl:text-4xl font-bold tracking-tight mb-8 text-vintage-text leading-tight border-b border-vintage-border/50 pb-3 whitespace-nowrap">
                                Dla kogo?
                            </h3>
                            <ul className="space-y-4">
                                <li><Link href="/prezenty/dla-niej" className="block font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300" onClick={onClose}>Dla Niej</Link></li>
                                <li><Link href="/prezenty/dla-niego" className="block font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300" onClick={onClose}>Dla Niego</Link></li>
                                <li><Link href="/prezenty/dla-pary" className="block font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300" onClick={onClose}>Dla Pary</Link></li>
                                <li><Link href="/prezenty/dla-rodzicow" className="block font-serif text-lg lg:text-xl text-vintage-muted hover:text-vintage-text transition-colors duration-300" onClick={onClose}>Dla Rodziców</Link></li>
                                <li><Link href="/karta-podarunkowa" className="block font-serif text-lg lg:text-xl text-vintage-primary hover:text-vintage-text transition-colors duration-300 font-bold italic" onClick={onClose}>Karta Podarunkowa</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* PRAWA STRONA: Visuale (Cross-sell - Zgodne z "Produkty") */}
                    <div className="w-[55%] relative h-full flex gap-6 items-center animate-fade-in-soft">

                        {/* Kafelek 1: Karta Podarunkowa */}
                        <Link href="/karta-podarunkowa" className="group relative flex-1 h-[85%] rounded-sm overflow-hidden bg-vintage-bg shadow-sm hover:shadow-xl transition-all duration-500" onClick={onClose}>
                            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                                <Image
                                    src="/marketing/gift-card.png"
                                    alt="Karta Podarunkowa MapStory"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 25vw, 20vw"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white font-serif text-2xl font-bold mb-1">Karta Podarunkowa</h3>
                                <p className="text-white/80 text-sm font-medium tracking-wide flex items-center gap-1">
                                    Prezent Last-Minute <LuArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </p>
                            </div>
                        </Link>

                        {/* Kafelek 2: Bestsellery */}
                        <Link href="/bestsellery" className="group relative flex-1 h-[85%] rounded-sm overflow-hidden bg-vintage-bg shadow-sm hover:shadow-xl transition-all duration-500 mt-20" onClick={onClose}>
                            <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                                <Image
                                    src="/marketing/bestsellers.png"
                                    alt="Bestsellery MapStory"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 25vw, 20vw"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white font-serif text-2xl font-bold mb-1">Bestsellery</h3>
                                <p className="text-white/80 text-sm font-medium tracking-wide flex items-center gap-1">
                                    Zobacz najczęściej kupowane mapy <LuArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </p>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
