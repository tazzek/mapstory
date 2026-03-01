'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LuMenu, LuX, LuMapPin, LuUser, LuShoppingBag, LuChevronDown } from 'react-icons/lu';
import Button from '@/components/ui/Button';
import MegaMenu from './MegaMenu';
import GiftMegaMenu from './GiftMegaMenu';
import GiftMegaMenuPanel from './GiftMegaMenuPanel';
import { cn } from '@/lib/utils';
import { useProductDrawerStore } from '@/store/useProductDrawer';

export interface ProductItem {
    name: string;
    desc: string;
    slug: string;
    image: string;
}

export interface ProductCategory {
    title: string;
    items: ProductItem[];
}

const productCategories: ProductCategory[] = [
    {
        title: "ZIEMIA",
        items: [
            {
                name: "StreetMap",
                desc: "Nordic, Noir, Vintage",
                slug: "streetmap",
                image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                name: "TopoArt",
                desc: "Góry i rzeźba terenu 3D",
                slug: "topoart",
                image: "https://images.unsplash.com/photo-1519681393798-3828fb4090bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                name: "ActivePath",
                desc: "Twoje trasy i wyprawy GPX",
                slug: "activepath",
                image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
        ]
    },
    {
        title: "NIEBO",
        items: [
            {
                name: "Luna Antique",
                desc: "Fazy Księżyca (XIX w.)",
                slug: "luna-antique",
                image: "https://images.unsplash.com/photo-1532693322450-2cb5c511067d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                name: "CelestialCity",
                desc: "Gwiazdy nad miastem",
                slug: "celestialcity",
                image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
        ]
    },
    {
        title: "SZTUKA",
        items: [
            {
                name: "LoveStory",
                desc: "Mapa + Wasze zdjęcie",
                slug: "lovestory",
                image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            },
            {
                name: "Artisan Sketch",
                desc: "Architektura & Blueprint",
                slug: "artisan-sketch",
                image: "https://images.unsplash.com/photo-1503594384566-461fe158e797?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
            }
        ]
    }
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Zmieniamy system zarządzania otwartym panelem z osobnych stanów na wspólny enum
    const [openMenu, setOpenMenu] = useState<'NONE' | 'PRODUKTY' | 'PREZENTY'>('NONE');

    const { openDrawer } = useProductDrawerStore();
    const pathname = usePathname();

    const isEditor = pathname === '/edytor';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Editor has its own navbar via layout.tsx
    if (isEditor) return null;

    const navbarClasses = isScrolled
        ? 'bg-white py-3 border-b border-vintage-border'
        : 'bg-vintage-paper py-5 border-b border-transparent';

    const containerClasses = 'container-mapstory';

    const logoBgClass = isScrolled
        ? 'bg-vintage-text text-white'
        : 'bg-vintage-primary text-white';

    return (
        <nav
            className={cn("fixed w-full z-50 transition-all duration-300", navbarClasses, isScrolled && "shadow-soft")}
            onMouseLeave={() => setOpenMenu('NONE')}
        >
            <div className={cn(containerClasses, "relative")}>
                <div className="flex justify-between items-center h-14">

                    {/* 1. LEFT: LOGO */}
                    <Link
                        href="/"
                        className="flex items-center cursor-pointer group z-50 relative min-w-[140px]"
                    >
                        <div className={cn("p-1.5 rounded mr-3 transition-all duration-300 group-hover:rotate-12", logoBgClass)}>
                            <LuMapPin size={22} strokeWidth={1.5} />
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-tight text-vintage-text">
                            MapStory
                        </span>
                    </Link>

                    {/* 2. CENTER: MAIN NAVIGATION (Desktop) */}
                    <div className="flex mobile:hidden items-center justify-center space-x-12 h-full flex-1">

                        {/* MEGA MENU TRIGGER */}
                        <div
                            className="h-full flex items-center"
                            onMouseEnter={() => setOpenMenu('PRODUKTY')}
                        >
                            <Link
                                href="/produkty/streetmap"
                                className={cn(
                                    "flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors uppercase py-4 relative group",
                                    openMenu === 'PRODUKTY' ? "text-vintage-primary" : "text-vintage-text hover:text-vintage-primary"
                                )}
                            >
                                Produkty
                                <LuChevronDown size={14} className={cn("transition-transform duration-300", openMenu === 'PRODUKTY' && "rotate-180")} />
                                <span className={cn("absolute bottom-3 left-0 w-full h-[1px] bg-current origin-bottom-right transform transition-transform duration-300 scale-x-0 group-hover:origin-bottom-left", openMenu === 'PRODUKTY' ? "scale-x-100" : "group-hover:scale-x-100")} />
                            </Link>
                        </div>

                        {/* NASZE NOWE MENU PREZENTOWE */}
                        <GiftMegaMenu
                            isOpen={openMenu === 'PREZENTY'}
                            onOpen={() => setOpenMenu('PREZENTY')}
                        />

                        {/* INSPIRATIONS */}
                        <Link
                            href="/inspiracje"
                            className={cn(
                                "text-sm font-semibold tracking-wide transition-colors uppercase py-4 relative group",
                                pathname === '/inspiracje' ? "text-vintage-primary" : "text-vintage-text hover:text-vintage-primary"
                            )}
                        >
                            Inspiracje
                            <span className={cn("absolute bottom-3 left-0 w-full h-[1px] bg-current origin-bottom-right transform transition-transform duration-300 scale-x-0 group-hover:origin-bottom-left", pathname === '/inspiracje' ? "scale-x-100" : "group-hover:scale-x-100")} />
                        </Link>

                        {/* ABOUT US */}
                        <Link
                            href="/o-nas"
                            className={cn(
                                "text-sm font-semibold tracking-wide transition-colors uppercase py-4 relative group",
                                pathname === '/o-nas' ? "text-vintage-primary" : "text-vintage-text hover:text-vintage-primary"
                            )}
                        >
                            O Nas
                            <span className={cn("absolute bottom-3 left-0 w-full h-[1px] bg-current origin-bottom-right transform transition-transform duration-300 scale-x-0 group-hover:origin-bottom-left", pathname === '/o-nas' ? "scale-x-100" : "group-hover:scale-x-100")} />
                        </Link>
                    </div>

                    {/* 3. RIGHT: ACTIONS & CTA */}
                    <div className="flex mobile:hidden items-center justify-end gap-8 min-w-[140px]">
                        <Button
                            variant="dark"
                            size="md"
                            onClick={openDrawer}
                            className="font-semibold tracking-widest px-8 shadow-lg hover:shadow-xl mr-2 text-white"
                        >
                            ZAPROJEKTUJ
                        </Button>

                        {/* Icons Group */}
                        <div className="flex items-center gap-6">
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors p-1">
                                <LuUser size={22} strokeWidth={1.5} />
                            </button>
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors relative p-1">
                                <LuShoppingBag size={22} strokeWidth={1.5} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-vintage-primary rounded-full ring-2 ring-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile LuMenu Toggle */}
                    <div className="hidden mobile:flex items-center gap-4 mr-1">
                        <button className="text-vintage-text">
                            <LuShoppingBag size={22} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-vintage-text hover:text-vintage-primary focus:outline-none p-1"
                        >
                            {isMobileMenuOpen ? <LuX size={24} strokeWidth={1.5} /> : <LuMenu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MEGA MENU PANEL (Desktop) --- */}
            <MegaMenu
                isOpen={openMenu === 'PRODUKTY'}
                categories={productCategories}
                onClose={() => setOpenMenu('NONE')}
            />

            <GiftMegaMenuPanel
                isOpen={openMenu === 'PREZENTY'}
                onClose={() => setOpenMenu('NONE')}
            />

            {/* --- MOBILE MENU --- */}
            {isMobileMenuOpen && (
                <div className="hidden mobile:block bg-white border-t border-vintage-border absolute w-full h-screen shadow-xl animate-fade-in z-40 overflow-y-auto pb-20">
                    <div className="px-6 py-6 space-y-6">

                        {/* Mobile Categories */}
                        {productCategories.map((cat, idx) => (
                            <div key={idx} className="space-y-3">
                                <h3 className="text-xs font-bold text-vintage-muted uppercase tracking-widest">
                                    {cat.title}
                                </h3>
                                <div className="space-y-2 pl-2 border-l border-vintage-border">
                                    {cat.items.map((item, i) => (
                                        <Link
                                            key={i}
                                            href={`/produkty/${item.slug}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center gap-3 w-full text-left py-2"
                                        >
                                            <Image src={item.image} alt="" width={48} height={48} className="rounded-sm object-cover" />
                                            <div>
                                                <span className="block font-serif text-lg text-vintage-text font-bold">{item.name}</span>
                                                <span className="block text-sm text-vintage-text/70">{item.desc}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="pt-4 border-t border-vintage-border space-y-2">
                            <Link
                                href="/inspiracje"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-left py-3 font-bold text-vintage-text uppercase tracking-wide border-b border-vintage-border/50"
                            >
                                Inspiracje
                            </Link>

                            {/* Mobile Gift Section */}
                            <div className="py-2 space-y-3">
                                <h3 className="text-[10px] font-bold text-vintage-primary uppercase tracking-[0.2em]">Na prezent</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 pl-2">
                                    <Link href="/prezenty/dla-niej" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-vintage-text py-1">Dla Niej</Link>
                                    <Link href="/prezenty/dla-niego" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-vintage-text py-1">Dla Niego</Link>
                                    <Link href="/prezenty/dla-pary" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-vintage-text py-1">Dla Pary</Link>
                                    <Link href="/prezenty/dla-rodzicow" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-vintage-text py-1">Dla Rodziców</Link>
                                    <Link href="/karta-podarunkowa" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-vintage-primary font-bold py-1 col-span-2">Karta Podarunkowa 🎁</Link>
                                </div>
                            </div>

                            <Link
                                href="/o-nas"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-left py-3 font-bold text-vintage-text uppercase tracking-wide border-t border-vintage-border/50"
                            >
                                O Nas
                            </Link>
                        </div>

                        <div className="pt-2">
                            <div className="flex items-center gap-2 py-3 text-vintage-text border-b border-vintage-border/50">
                                <LuUser size={18} /> <span>Moje Konto</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                variant="dark"
                                fullWidth
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    openDrawer();
                                }}
                                className="font-bold tracking-widest py-4"
                            >
                                ZAPROJEKTUJ
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
