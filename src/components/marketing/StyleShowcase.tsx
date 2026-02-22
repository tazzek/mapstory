'use client';

import { useState } from 'react';
import Image from 'next/image';
import { LuPalette } from 'react-icons/lu';

const styles = [
    { id: 'noir', name: "Midnight Noir", desc: "Głęboka czerń i granat. Elegancja nocy dla nowoczesnych wnętrz typu loft.", colors: ['#0f172a', '#1e293b', '#94a3b8'], image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", filter: "grayscale(100%) invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)" },
    { id: 'vintage', name: "Classic Vintage", desc: "Ciepły pergamin i sepia. Klimat starych atlasów z XIX wieku.", colors: ['#f5f5f4', '#d6d3d1', '#78350f'], image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", filter: "sepia(60%) contrast(110%) brightness(95%)" },
    { id: 'nordic', name: "Nordic Minimal", desc: "Chłodna biel i delikatne szarości. Czysta forma dla jasnych przestrzeni.", colors: ['#ffffff', '#f1f5f9', '#64748b'], image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", filter: "brightness(115%) contrast(90%) grayscale(100%)" },
    { id: 'copper', name: "Copper Topo", desc: "Miedź i głęboki brąz. Techniczny sznyt inspirowany rzeźbą terenu.", colors: ['#451a03', '#92400e', '#d97706'], image: "https://images.unsplash.com/photo-1519681393798-3828fb4090bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", filter: "sepia(80%) hue-rotate(-30deg) contrast(120%) saturate(150%)" },
    { id: 'ink', name: "Ink & Paper", desc: "Głęboka czerń na kremie. Klasyczny kontrast tradycyjnego druku.", colors: ['#fffdd0', '#171717', '#404040'], image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", filter: "grayscale(100%) contrast(150%) brightness(110%)" },
];

export default function StyleShowcase() {
    const [activeStyle, setActiveStyle] = useState(1);

    return (
        <section className="bg-white py-24 lg:py-32 border-t border-vintage-border relative">
            <div className="container-mapstory">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-bg border border-vintage-border text-vintage-muted text-xs font-bold uppercase tracking-widest">
                        <LuPalette size={12} />
                        5 Unikalnych Palet
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl font-bold text-vintage-text">
                        Te Same Dane.<br />
                        <span className="text-vintage-primary italic">Inny Klimat.</span>
                    </h2>
                    <p className="text-vintage-muted text-lg leading-relaxed font-light">
                        Twoje wspomnienia zasługują na odpowiednią oprawę. Wybierz styl, który najlepiej pasuje do Twojego wnętrza.
                    </p>
                </div>

                <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] lg:aspect-[2/1] mb-12 shadow-2xl rounded-sm border border-vintage-border/20 overflow-hidden group">
                    <div className="absolute inset-0 bg-vintage-bg"></div>
                    {styles.map((style, index) => (
                        <div
                            key={style.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeStyle === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <Image
                                src={style.image}
                                alt={style.name}
                                fill
                                className="object-cover transform transition-transform duration-[2000ms] group-hover:scale-105"
                                style={{ filter: style.filter }}
                                sizes="(max-width: 1024px) 100vw, 80vw"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                            <div className="absolute bottom-8 left-8 text-white z-20 animate-fade-in">
                                <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-wide mb-2">{style.name}</h3>
                                <p className="text-white/80 font-sans text-sm md:text-base max-w-md border-l-2 border-vintage-primary pl-4">
                                    {style.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="absolute inset-0 border-[20px] border-white/90 z-20 pointer-events-none mix-blend-soft-light opacity-50"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                    {styles.map((style, index) => (
                        <button
                            key={style.id}
                            onClick={() => setActiveStyle(index)}
                            className={`group relative px-8 py-5 rounded-sm border transition-all duration-300 min-w-[160px] flex flex-col items-center justify-center gap-3
                ${activeStyle === index
                                    ? 'bg-vintage-text border-vintage-text text-white shadow-xl -translate-y-1'
                                    : 'bg-white border-vintage-border text-vintage-muted hover:border-vintage-primary hover:text-vintage-text hover:-translate-y-0.5'
                                }`}
                        >
                            <div className="flex gap-1.5">
                                {style.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className={`w-3 h-3 rounded-full border border-white/20 shadow-sm transition-transform duration-300 ${activeStyle === index ? 'scale-110' : ''}`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeStyle === index ? 'text-white' : 'text-vintage-text/80'}`}>
                                {style.name}
                            </span>
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-vintage-primary transform transition-all duration-300 ${activeStyle === index ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}></div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
