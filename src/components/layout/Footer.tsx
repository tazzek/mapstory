'use client';

import Link from 'next/link';
import { LuMapPin, LuMail, LuMap, LuTruck, LuPackage, LuLeaf, LuHeart, LuArrowRight, LuPhone } from 'react-icons/lu';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Nasze nowe punkty zaufania (USP)
    const usps = [
        { icon: LuTruck, title: 'Szybka Dostawa', desc: '2-3 dni robocze' },
        { icon: LuPackage, title: 'Darmowa Dostawa', desc: 'Od 250 zł' },
        { icon: LuLeaf, title: 'Ekologiczny Wydruk', desc: 'Papier FSC®' },
        { icon: LuHeart, title: 'Produkcja w Polsce', desc: 'Wspierasz lokalnie' },
    ];

    return (
        <footer className="bg-[#fcfbf9] text-vintage-text border-t border-vintage-border/30 pt-10">

            {/* 1. SEKCJA TRUST BAR (Zastępuje stary Newsletter) */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-y border-vintage-border/30 px-8 rounded-sm">
                    {usps.map((usp, index) => (
                        <div key={index} className="flex flex-col items-center text-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-white border border-vintage-border/50 flex items-center justify-center text-gray-900 shadow-sm">
                                <usp.icon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-900 mb-1">{usp.title}</h4>
                                <p className="text-xs text-vintage-muted">{usp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. GŁÓWNA STOPKA */}
            <div className="max-w-7xl mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* KOLUMNA 1: Marka & Newsletter (F-Pattern Anchor) */}
                    <div className="md:col-start-2 md:col-span-4 flex flex-col space-y-6">
                        <Link href="/" className="flex items-center space-x-2 group w-fit">
                            <div className="bg-gray-900 text-vintage-paper p-1.5 rounded-sm group-hover:bg-gray-800 transition-colors duration-300">
                                <LuMapPin size={24} />
                            </div>
                            <span className="font-serif text-2xl font-bold tracking-wide">MapStory</span>
                        </Link>

                        <p className="text-sm text-vintage-muted leading-relaxed pr-8">
                            Tworzymy personalizowane mapy, które zamieniają Twoje wspomnienia w sztukę.
                        </p>

                        {/* Zintegrowany Newsletter */}
                        <div className="pt-2">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-3">Newsletter</h4>
                            <form className="flex gap-2 max-w-xs">
                                <input
                                    type="email"
                                    placeholder="Twój adres e-mail"
                                    className="bg-transparent border border-vintage-border/50 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-gray-900 transition-colors flex-1 min-w-0"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-gray-900 text-white px-5 py-2 rounded-sm text-[10px] uppercase tracking-widest font-bold hover:bg-gray-800 transition-colors duration-300 whitespace-nowrap"
                                >
                                    Zapisz się
                                </button>
                            </form>
                            <p className="text-[10px] text-vintage-muted mt-2">
                                Zapisując się, akceptujesz nasz <Link href="/regulamin" className="underline hover:text-gray-900">Regulamin</Link>.
                            </p>
                        </div>
                    </div>

                    {/* KOLUMNA 2: Wsparcie */}
                    <div className="md:col-span-3">
                        <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">Wsparcie</h3>
                        <ul className="space-y-4">
                            <li><Link href="/faq" className="text-sm text-vintage-muted hover:text-gray-900 transition-colors">Częste pytania (FAQ)</Link></li>
                            <li><Link href="/regulamin" className="text-sm text-vintage-muted hover:text-gray-900 transition-colors">Regulamin</Link></li>
                            <li><Link href="/polityka-prywatnosci" className="text-sm text-vintage-muted hover:text-gray-900 transition-colors">Polityka prywatności</Link></li>
                            <li><Link href="/kontakt" className="text-sm text-vintage-muted hover:text-gray-900 transition-colors">Dostawa i zwroty</Link></li>
                        </ul>
                    </div>

                    {/* KOLUMNA 3: Kontakt i O marce */}
                    <div className="md:col-span-3">
                        <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-900 mb-6">Kontakt & O marce</h3>
                        <div className="space-y-4">
                            <a href="mailto:hello@mapstory.pl" className="flex items-center space-x-3 text-sm text-vintage-muted hover:text-gray-900 transition-colors group">
                                <LuMail size={18} className="text-gray-900 group-hover:scale-110 transition-transform" />
                                <span>hello@mapstory.pl</span>
                            </a>
                            <a href="tel:+48555555555" className="flex items-center space-x-3 text-sm text-vintage-muted hover:text-gray-900 transition-colors group">
                                <LuPhone size={18} className="text-gray-900 group-hover:scale-110 transition-transform" />
                                <span>+48 555 555 555</span>
                            </a>

                            <div className="pt-2 flex flex-col space-y-3">
                                <Link href="/o-nas" className="text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-2 group">
                                    Poczytaj o nas <LuArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/kontakt" className="text-sm font-bold uppercase tracking-widest text-gray-900 hover:text-gray-700 transition-colors flex items-center gap-2 group">
                                    Dane firmy <LuArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="flex gap-3 pt-6 mt-6 border-t border-vintage-border/30">
                                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-vintage-border/50 shadow-sm"><FaFacebookF size={15} /></a>
                                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-vintage-border/50 shadow-sm"><FaInstagram size={15} /></a>
                                <a href="#" aria-label="Pinterest" className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-vintage-border/50 shadow-sm"><FaPinterestP size={15} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. COPYRIGHT */}
            <div className="border-t border-vintage-border/30 bg-vintage-paper/50 py-6">
                <div className="max-w-7xl mx-auto px-6 flex justify-center items-center text-xs text-vintage-muted">
                    <p>© {currentYear} MapStory. Wszelkie prawa zastrzeżone.</p>
                </div>
            </div>
        </footer>
    );
}
