'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Globe, Mountain, Printer, ScanLine, Maximize2, ChevronDown } from 'lucide-react';

const features = [
    {
        id: 'data',
        icon: <Globe size={24} />,
        title: "Globalne Dane 2024",
        subtitle: "OpenStreetMap Premium",
        description: "Precyzja do poziomu numeru domu. Nasza baza jest aktualizowana co tydzień, obejmując każdą wioskę na świecie. Nie drukujemy pustych plam.",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        meta: "DATA: OSM-24-V2"
    },
    {
        id: 'terrain',
        icon: <Mountain size={24} />,
        title: "Rzeźba Terenu 3D",
        subtitle: "Hillshading Technology",
        description: "To nie jest płaska mapa. Używamy prawdziwych danych elewacyjnych, aby góry i doliny rzucały cyfrowy cień, nadając wydrukowi głębię.",
        image: "https://images.unsplash.com/photo-1519681393798-3828fb4090bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        meta: "ELEVATION: HIGH-RES"
    },
    {
        id: 'print',
        icon: <Printer size={24} />,
        title: "Jakość Druku 300 DPI",
        subtitle: "Fine Art Print",
        description: "Eksportuj pliki gotowe do druku wielkoformatowego. Idealna ostrość linii wektorowych, zero pikselozy nawet na formacie B1.",
        image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        meta: "RES: 300 DPI / VECTOR"
    }
];

export default function DetailedFeatures() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="bg-vintage-warm py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-vintage-border/50 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto relative z-10">

                <div className="mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl font-bold text-vintage-text mb-4">
                        Profesjonalne Mapy.<br />
                        <span className="text-vintage-primary italic">Zero Kompromisów.</span>
                    </h2>
                    <p className="text-vintage-muted max-w-xl text-lg font-light leading-relaxed">
                        Stwórz dzieło sztuki jakości galeryjnej, korzystając z technologii używanej przez profesjonalnych kartografów.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    <div className="lg:col-span-7 sticky top-32">
                        <div className="relative aspect-[4/3] w-full bg-vintage-bg rounded-sm shadow-2xl border border-white overflow-hidden group">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${activeIndex === index
                                        ? 'opacity-100 scale-100 grayscale-0'
                                        : 'opacity-0 scale-105 grayscale'
                                        }`}
                                >
                                    <Image src={feature.image} alt={feature.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                                </div>
                            ))}

                            <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none flex flex-col justify-between p-6">
                                <div className="flex justify-between items-start">
                                    <div className="bg-white/90 backdrop-blur text-vintage-text px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-vintage-border/50">
                                        Fig. 0{activeIndex + 1}
                                    </div>
                                    <ScanLine className="text-white/80 animate-pulse-slow" size={24} strokeWidth={1} />
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-white/90 font-mono text-[10px]">
                                        {features[activeIndex].meta}
                                    </div>
                                    <div className="bg-vintage-primary/90 text-white p-2 rounded-full backdrop-blur cursor-pointer hover:scale-110 transition-transform pointer-events-auto">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="border-t border-vintage-text/10">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.id}
                                    className={`group border-b border-vintage-text/10 cursor-pointer transition-all duration-300 px-4 -mx-4 rounded-sm ${activeIndex === index ? 'bg-white shadow-sm border-transparent py-6' : 'hover:bg-vintage-primary/5 py-6'
                                        }`}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className={`mt-1 transition-colors duration-300 ${activeIndex === index ? 'text-vintage-primary' : 'text-vintage-muted'}`}>
                                            {feature.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center w-full">
                                                <h3 className={`font-serif text-2xl transition-colors duration-300 ${activeIndex === index ? 'text-vintage-text font-bold' : 'text-vintage-text/70'}`}>
                                                    {feature.title}
                                                </h3>
                                                <div className={`transform transition-transform duration-500 text-vintage-muted ${activeIndex === index ? 'rotate-180 text-vintage-primary' : 'rotate-0'}`}>
                                                    <ChevronDown size={20} />
                                                </div>
                                            </div>
                                            <div className={`grid transition-all duration-500 ease-in-out ${activeIndex === index
                                                ? 'grid-rows-[1fr] opacity-100 mt-4'
                                                : 'grid-rows-[0fr] opacity-0 mt-0'
                                                }`}>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs font-bold text-vintage-primary uppercase tracking-widest mb-2">
                                                        {feature.subtitle}
                                                    </p>
                                                    <p className="text-vintage-text/70 leading-relaxed text-sm">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pl-4">
                            <button className="text-sm font-bold uppercase tracking-widest text-vintage-text hover:text-vintage-primary transition-colors flex items-center gap-2 group">
                                Zobacz specyfikację techniczną
                                <div className="w-8 h-px bg-vintage-text group-hover:bg-vintage-primary transition-colors"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
