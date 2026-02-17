'use client';

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ArrowRight, Star, Check, Globe } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full bg-vintage-paper pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EBE5DE] skew-x-12 origin-top transform translate-x-1/3 z-0 pointer-events-none opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* Text Content */}
                    <div className="order-2 lg:order-1 space-y-10 animate-fade-in-up lg:pl-12 px-4 lg:px-0">

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-vintage-border">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-vintage-secondary border-2 border-white overflow-hidden">
                                            <Image src={`https://picsum.photos/50/50?random=${i}`} alt="User" width={24} height={24} className="object-cover opacity-80" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-vintage-text tracking-wide uppercase">5000+ Opinii</span>
                            </div>
                            <div className="flex items-center text-vintage-primary">
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                                <Star size={14} fill="currentColor" />
                            </div>
                        </div>

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
                            <Link href="/edytor">
                                <Button variant="dark" size="lg" icon={<ArrowRight size={18} />}>
                                    Zaprojektuj plakat
                                </Button>
                            </Link>
                            <Link href="/inspiracje">
                                <Button variant="outline" size="lg">
                                    Zobacz galerię
                                </Button>
                            </Link>
                        </div>

                        <div className="pt-8 grid grid-cols-2 gap-y-4 gap-x-8 text-sm text-vintage-text/70 border-t border-vintage-text/10 mt-8">
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-vintage-primary/10 flex items-center justify-center mr-3 text-vintage-primary">
                                    <Globe size={12} />
                                </div>
                                Polska produkcja
                            </div>
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-vintage-primary/10 flex items-center justify-center mr-3 text-vintage-primary">
                                    <Check size={12} />
                                </div>
                                Wysyłka w 48h
                            </div>
                        </div>
                    </div>

                    {/* Visual Content */}
                    <div className="order-1 lg:order-2 relative group px-4 lg:px-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full opacity-20 blur-3xl"></div>

                        <div className="relative transform transition-transform duration-700 hover:scale-105 z-10">
                            <div className="bg-white p-3 shadow-poster rounded-sm mx-auto max-w-md relative border border-white">
                                <div className="absolute inset-0 border border-gray-100 pointer-events-none z-20"></div>
                                <div className="bg-[#1A1A1A] p-[10px] shadow-2xl relative">
                                    <div className="bg-[#FDFBF7] p-6 lg:p-8 shadow-inner">
                                        <div className="aspect-[3/4] bg-vintage-bg relative overflow-hidden flex flex-col items-center justify-end pb-8 border border-vintage-border/50">
                                            <div className="absolute inset-0 opacity-90 transition-transform duration-[2000ms] ease-in-out group-hover:scale-110">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                                    alt="Twoje wspomnienia na mapie"
                                                    fill
                                                    priority
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                    className="object-cover"
                                                    style={{ filter: 'grayscale(100%) contrast(110%) sepia(15%)' }}
                                                    fetchPriority="high"
                                                    unoptimized
                                                /></div>

                                            <div className="absolute inset-4 border border-vintage-text/10 z-10"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-32 h-32 lg:w-48 lg:h-48 border border-vintage-primary/60 rounded-full bg-vintage-primary/5 backdrop-blur-[1px]"></div>
                                                <div className="w-1.5 h-1.5 bg-vintage-primary rounded-full absolute"></div>
                                            </div>

                                            <div className="relative z-10 text-center bg-white/95 backdrop-blur-md px-6 py-4 w-[85%] mx-auto shadow-card border border-vintage-border/50">
                                                <h3 className="font-serif text-2xl tracking-widest uppercase text-vintage-text">Warszawa</h3>
                                                <div className="w-8 h-[1px] bg-vintage-primary mx-auto my-2"></div>
                                                <p className="font-sans text-[9px] tracking-[0.25em] text-vintage-muted uppercase font-medium">52°13&apos;N 21°00&apos;E</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-5 -right-5 bg-vintage-text text-white px-5 py-3 shadow-xl rounded-sm z-30 flex items-center gap-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-vintage-secondary uppercase tracking-wider">Bestseller</span>
                                    <span className="font-serif text-lg leading-none">Vintage Style</span>
                                </div>
                                <div className="h-8 w-[1px] bg-white/20"></div>
                                <span className="font-bold text-vintage-primary">4.9/5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
