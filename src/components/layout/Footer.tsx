'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Instagram, Facebook, Mail, ArrowUpRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Footer() {
    const pathname = usePathname();
    if (pathname === '/edytor') return null;

    return (
        <footer className="bg-vintage-footer text-vintage-text pt-24 pb-12 border-t border-vintage-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Newsletter Section */}
                <div className="pb-16 border-b border-vintage-border mb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <h3 className="font-serif text-3xl text-vintage-text mb-3">Dołącz do newslettera</h3>
                        <p className="text-vintage-muted font-light">Odbierz -10% na pierwsze zamówienie i cotygodniową dawkę inspiracji wnętrzarskich.</p>
                    </div>
                    <div className="flex gap-3">
                        <input
                            type="email"
                            placeholder="Twój adres email"
                            className="flex-1 bg-white border border-vintage-border rounded-sm px-5 py-3 text-vintage-text placeholder-vintage-muted focus:outline-none focus:border-vintage-primary focus:ring-1 focus:ring-vintage-primary transition-all shadow-sm"
                        />
                        <Button variant="primary" className="whitespace-nowrap px-8">Zapisz się</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <div className="flex items-center">
                            <div className="bg-vintage-primary text-white p-1.5 rounded-sm mr-2">
                                <MapPin size={20} />
                            </div>
                            <span className="font-serif text-2xl font-bold text-vintage-text tracking-wide">MapStory</span>
                        </div>
                        <p className="text-sm text-vintage-muted leading-relaxed max-w-xs">
                            Tworzymy personalizowane mapy, które zamieniają Twoje wspomnienia w sztukę. <br />
                            <span className="text-vintage-primary mt-2 flex items-center gap-2 font-medium">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Made in Poland
                            </span>
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-serif text-lg text-vintage-text mb-6">Sklep</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link href="/edytor" className="hover:text-vintage-primary transition-colors flex items-center group text-vintage-text/80">Zaprojektuj plakat <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
                            <li><Link href="/inspiracje" className="hover:text-vintage-primary transition-colors text-vintage-text/80">Galeria inspiracji</Link></li>
                            <li><a href="#" className="hover:text-vintage-primary transition-colors text-vintage-text/80">Karty podarunkowe</a></li>
                            <li><a href="#" className="hover:text-vintage-primary transition-colors text-vintage-text/80">Dla firm (B2B)</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg text-vintage-text mb-6">Pomoc</h4>
                        <ul className="space-y-3 text-sm text-vintage-muted">
                            <li><Link href="/faq" className="hover:text-vintage-primary transition-colors">Centrum Pomocy / FAQ</Link></li>
                            <li><a href="#" className="hover:text-vintage-primary transition-colors">Czas i koszt dostawy</a></li>
                            <li><a href="#" className="hover:text-vintage-primary transition-colors">Zwroty i reklamacje</a></li>
                            <li><Link href="/regulamin" className="hover:text-vintage-primary transition-colors">Regulamin sklepu</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-serif text-lg text-vintage-text mb-6">Kontakt</h4>
                        <ul className="space-y-4 text-sm text-vintage-muted mb-6">
                            <li className="flex items-center gap-3 hover:text-vintage-primary transition-colors cursor-pointer group">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-vintage-primary border border-vintage-border shadow-sm group-hover:border-vintage-primary/30">
                                    <Mail size={16} />
                                </div>
                                kontakt@mapstory.pl
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-sm bg-white flex items-center justify-center text-vintage-text hover:bg-vintage-primary hover:text-white transition-all duration-300 border border-vintage-border shadow-sm"><Instagram size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-sm bg-white flex items-center justify-center text-vintage-text hover:bg-vintage-primary hover:text-white transition-all duration-300 border border-vintage-border shadow-sm"><Facebook size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-vintage-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-vintage-muted">
                    <p>&copy; {new Date().getFullYear()} MapStory. Wszelkie prawa zastrzeżone.</p>

                    <div className="flex gap-6 mt-4 md:mt-0 items-center opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <div className="flex items-center gap-1 font-bold italic"><span className="text-yellow-500">In</span>Post</div>
                        <div className="font-bold">BLIK</div>
                        <div className="font-bold">Visa</div>
                        <div className="font-bold">Mastercard</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
