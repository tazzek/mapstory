'use client';

import { useState } from 'react';
import { Sparkles, Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const maps = [
    { id: 1, title: "Japonia - Midnight", author: "Kasia K.", location: "Tokio", image: "https://images.unsplash.com/photo-1542640244-7e672d6bd4e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", style: "Noir" },
    { id: 2, title: "Islandia - Abstrakcja", author: "Piotr W.", location: "Reykjavik", image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", style: "Scandi" },
    { id: 3, title: "Amsterdam - Vintage", author: "Timo B.", location: "Centrum", image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", style: "Vintage" },
    { id: 4, title: "Nowy Jork - Grid", author: "Anna M.", location: "Manhattan", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", style: "Modern" },
    { id: 5, title: "Rzym - Classic", author: "Marco P.", location: "Koloseum", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", style: "Vintage" },
    { id: 6, title: "Paryż - Noir", author: "Sophie L.", location: "Le Marais", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", style: "Noir" },
];

export default function TopRated() {
    const [startIndex, setStartIndex] = useState(0);
    const itemsToShow = 3;
    const maxIndex = maps.length - itemsToShow;

    return (
        <section className="bg-vintage-bg py-24 px-4 sm:px-6 lg:px-8 border-t border-vintage-border relative">
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-fade-in-up">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-primary/10 border border-vintage-primary/20 text-vintage-primary text-xs font-medium uppercase tracking-wider mb-4">
                            <Sparkles size={14} />
                            Galeria Społeczności
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-4">
                            Wasze Historie. <span className="text-vintage-primary">Wasze Projekty.</span>
                        </h2>
                        <p className="text-vintage-muted">
                            Zobacz, jak inni uwiecznili swoje wspomnienia. Przeglądaj {maps.length} unikalnych historii.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mt-6 md:mt-0">
                        <button
                            onClick={() => setStartIndex(prev => Math.max(0, prev - 1))}
                            disabled={startIndex === 0}
                            className={`w-12 h-12 rounded-full border border-vintage-border flex items-center justify-center transition-all ${startIndex === 0 ? 'text-vintage-muted/30 cursor-not-allowed' : 'text-vintage-text hover:bg-vintage-text hover:text-white hover:border-vintage-text shadow-sm'}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => setStartIndex(prev => Math.min(maxIndex, prev + 1))}
                            disabled={startIndex >= maxIndex}
                            className={`w-12 h-12 rounded-full border border-vintage-border flex items-center justify-center transition-all ${startIndex >= maxIndex ? 'text-vintage-muted/30 cursor-not-allowed' : 'text-vintage-text hover:bg-vintage-text hover:text-white hover:border-vintage-text shadow-sm'}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div
                        className="flex gap-10 transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${startIndex * (100 / 3)}%)` }}
                    >
                        {maps.map((map) => (
                            <div key={map.id} className="min-w-[100%] md:min-w-[calc(33.333%-20px)] group relative cursor-pointer">
                                <div className="bg-white p-6 pb-6 rounded-sm shadow-card hover:shadow-poster transition-all duration-500 border border-vintage-border/50 h-full">
                                    <div className="aspect-[4/5] bg-vintage-bg relative overflow-hidden mb-6 border border-vintage-border/30">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={map.image} alt={map.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-vintage-text hover:text-red-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 z-10">
                                            <Heart size={16} />
                                        </button>
                                    </div>
                                    <div className="px-1">
                                        <p className="text-vintage-primary text-[10px] font-bold uppercase tracking-widest mb-2">{map.location}</p>
                                        <h3 className="font-serif text-xl text-vintage-text mb-1">{map.title}</h3>
                                        <div className="flex items-center justify-between pt-4 border-t border-vintage-border mt-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-vintage-muted uppercase tracking-wider">Projekt:</span>
                                                <span className="text-xs text-vintage-text font-medium">{map.author}</span>
                                            </div>
                                            <span className="text-[10px] uppercase tracking-wider text-vintage-muted border border-vintage-border px-2 py-0.5 rounded-sm">
                                                {map.style}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="w-full mt-12 flex justify-center items-center gap-2 text-vintage-text border border-vintage-border py-4 rounded hover:bg-white transition-colors font-medium">
                    Zobacz pełną galerię <ArrowRight size={16} />
                </button>
            </div>
        </section>
    );
}
