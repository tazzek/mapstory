'use client';

import Link from 'next/link';
import { LuMapPin, LuMail, LuTruck, LuPackage, LuLeaf, LuHeart, LuArrowRight, LuPhone } from 'react-icons/lu';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const usps = [
        { icon: LuTruck, title: 'Szybka Wysyłka', desc: '2-3 dni robocze' },
        { icon: LuPackage, title: 'Darmowa Dostawa', desc: 'Od 250 zł' },
        { icon: LuLeaf, title: 'Ekologiczny Druk', desc: 'Papier FSC®' },
        { icon: LuHeart, title: 'Polska Produkcja', desc: 'Wspierasz lokalnie' },
    ];

    return (
        <footer className="bg-[#f9f9f7] text-gray-800 border-t border-gray-100 pt-8">

            {/* 1. TRUST BAR - WERSJA PREMIUM (Horyzontalna) */}
            <div className="max-w-[1000px] mx-auto px-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-8 border-b border-gray-100">
                    {usps.map((usp, index) => (
                        // Układ horyzontalny: ikona z lewej, tekst z prawej
                        <div key={index} className="flex items-center gap-4 group">
                            <usp.icon
                                size={32}
                                strokeWidth={1}
                                className="text-gray-900 group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="flex flex-col text-left">
                                <h4 className="font-sans font-bold text-[11px] uppercase tracking-[0.15em] text-gray-900">
                                    {usp.title}
                                </h4>
                                <p className="text-[11px] text-gray-500 mt-0.5">
                                    {usp.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. GŁÓWNA STOPKA - SYMETRYCZNY UKŁAD 3 KOLUMN */}
            <div className="max-w-[1000px] mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">

                    {/* KOLUMNA 1: LEWA (Logo & Newsletter) */}
                    <div className="flex flex-col space-y-6 lg:pr-8">
                        <Link href="/" className="flex items-center space-x-2 group w-fit text-gray-900">
                            <div className="bg-gray-900 text-white p-1.5 rounded-sm group-hover:bg-gray-700 transition-colors duration-300">
                                <LuMapPin size={22} />
                            </div>
                            <span className="font-serif text-xl font-bold tracking-wide">MapStory</span>
                        </Link>

                        <p className="text-sm text-gray-500 leading-relaxed">
                            Tworzymy personalizowane mapy, które zamieniają Twoje wspomnienia w sztukę.
                        </p>

                        <div className="pt-2">
                            <form className="flex flex-col gap-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Twój adres e-mail"
                                        className="bg-transparent border border-gray-200 rounded-sm pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors w-full placeholder:text-gray-400"
                                        required
                                    />
                                    {/* Subtelny przycisk ze strzałką wewnątrz inputa - bardzo premium! */}
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-0 bottom-0 px-4 text-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center"
                                        aria-label="Zapisz się"
                                    >
                                        <LuArrowRight size={20} />
                                    </button>
                                </div>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                                    Dołącz do naszego newslettera
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* KOLUMNA 2: ŚRODEK (Wsparcie) - Wyrównanie idealnie na środek ekranu */}
                    <div className="flex flex-col lg:items-center">
                        <div className="w-full lg:w-max">
                            <h3 className="font-sans font-bold text-[11px] uppercase tracking-[0.15em] text-gray-900 mb-6">Wsparcie</h3>
                            <ul className="space-y-4">
                                <li><Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Częste pytania (FAQ)</Link></li>
                                <li><Link href="/regulamin" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Regulamin i Polityka</Link></li>
                                <li><Link href="/dostawa-i-zwroty" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Dostawa i zwroty</Link></li>
                                <li><Link href="/wspolpraca" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Współpraca</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* KOLUMNA 3: PRAWA (Kontakt) - Zawartość dociągnięta do prawej krawędzi */}
                    <div className="flex flex-col lg:items-end text-left lg:text-right">
                        <div className="w-full lg:w-auto">
                            <h3 className="font-sans font-bold text-[11px] uppercase tracking-[0.15em] text-gray-900 mb-6">Kontakt & O marce</h3>
                            <div className="space-y-4 mb-6">
                                <a href="mailto:hello@mapstory.pl" className="flex items-center lg:justify-end space-x-3 text-sm text-gray-500 hover:text-gray-900 transition-colors group">
                                    <span className="order-2 lg:order-1">hello@mapstory.pl</span>
                                    <LuMail size={16} className="text-gray-400 group-hover:text-gray-900 order-1 lg:order-2" />
                                </a>
                                <a href="tel:+48555555555" className="flex items-center lg:justify-end space-x-3 text-sm text-gray-500 hover:text-gray-900 transition-colors group">
                                    <span className="order-2 lg:order-1">+48 555 555 555</span>
                                    <LuPhone size={16} className="text-gray-400 group-hover:text-gray-900 order-1 lg:order-2" />
                                </a>
                                <div className="flex items-center lg:justify-end gap-3 pt-2">
                                    <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-gray-200"><FaInstagram size={14} /></a>
                                    <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-gray-200"><FaFacebookF size={14} /></a>
                                    <a href="#" aria-label="Pinterest" className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all duration-300 border border-gray-200"><FaPinterestP size={14} /></a>
                                </div>
                            </div>

                            <ul className="space-y-4 border-t border-gray-100 pt-6">
                                <li><Link href="/karta-podarunkowa" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Karta podarunkowa</Link></li>
                                <li><Link href="/o-nas" className="text-sm text-gray-900 hover:text-gray-500 transition-colors font-medium">Poznaj naszą historię</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. COPYRIGHT */}
            <div className="border-t border-gray-100 py-6 text-center">
                <div className="max-w-[1000px] mx-auto px-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    <p>© {currentYear} MapStory</p>
                    <p>Wszelkie prawa zastrzeżone</p>
                </div>
            </div>
        </footer>
    );
}
