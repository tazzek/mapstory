import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCategory } from './index';

interface MegaMenuProps {
    isOpen: boolean;
    categories: ProductCategory[];
    onClose: () => void;
}

export default function MegaMenu({ isOpen, categories, onClose }: MegaMenuProps) {
    const [activeCategoryTitle, setActiveCategoryTitle] = useState<string>('');

    // Pre-select first category on mount or when categories change
    useEffect(() => {
        if (categories.length > 0 && !activeCategoryTitle) {
            setActiveCategoryTitle(categories[0].title);
        }
    }, [categories, activeCategoryTitle]);

    const activeCategory = categories.find(cat => cat.title === activeCategoryTitle) || categories[0];

    return (
        <div
            className={`hidden md:block absolute top-full left-0 w-full bg-white border-t border-vintage-border shadow-poster transition-all duration-500 overflow-hidden ${isOpen ? 'opacity-100 max-h-[700px] visible' : 'opacity-0 max-h-0 invisible'
                }`}
            onMouseLeave={onClose}
        >
            <div className="container-mapstory py-12">
                <div className="flex gap-12 lg:gap-16 h-[400px]">

                    {/* Left Column (30%) */}
                    <div className="w-1/3 flex flex-col justify-between border-r border-vintage-border/30 pr-8">
                        <div>
                            <h2 className="font-serif text-3xl xl:text-4xl font-bold tracking-tight mb-8 text-vintage-text leading-tight">
                                Kolekcja Zima 2026.<br />
                                <span className="italic text-vintage-primary font-light">Zatrzymane w czasie.</span>
                            </h2>

                            <ul className="space-y-6 mt-16">
                                {categories.map((cat, idx) => {
                                    const isActive = activeCategoryTitle === cat.title;
                                    return (
                                        <li key={cat.title}>
                                            <button
                                                onMouseEnter={() => setActiveCategoryTitle(cat.title)}
                                                className="group flex items-center gap-6 w-full text-left"
                                            >
                                                <span className={`text-xs font-bold w-6 transition-opacity duration-300 ${isActive ? 'text-vintage-primary opacity-100' : 'text-vintage-muted opacity-40 group-hover:opacity-80'}`}>
                                                    0{idx + 1}
                                                </span>
                                                <span
                                                    className={`font-serif text-2xl lg:text-3xl transition-all duration-500 ${isActive
                                                        ? 'text-vintage-primary font-bold translate-x-3'
                                                        : 'text-vintage-muted hover:text-vintage-text'
                                                        }`}
                                                >
                                                    {cat.title}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div className="text-xs font-bold text-vintage-primary tracking-[0.2em] uppercase">
                            MapStory Original
                        </div>
                    </div>

                    {/* Right Column (70%) */}
                    <div className="w-2/3 relative h-full">
                        <div key={activeCategoryTitle} className="flex gap-6 h-full items-center animate-fade-in-soft">
                            {activeCategory?.items.map((item, idx) => {
                                // Masonry effect by shifting items down
                                const mtClass = idx === 1 ? 'mt-20' : idx === 2 ? 'mt-8' : '';

                                return (
                                    <Link
                                        href={`/produkty/${item.slug}`}
                                        onClick={onClose}
                                        key={item.slug}
                                        className={`group relative flex-1 h-[85%] rounded-sm overflow-hidden bg-vintage-bg shadow-sm hover:shadow-xl transition-all duration-500 ${mtClass}`}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            sizes="(max-width: 1024px) 33vw, 25vw"
                                        />

                                        {/* Overlay gradient for text readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Content */}
                                        <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-white font-serif text-2xl font-bold mb-1">{item.name}</h3>
                                            <p className="text-white/80 text-sm font-medium tracking-wide leading-relaxed">{item.desc}</p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
