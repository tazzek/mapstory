'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, User, ShoppingBag, ChevronDown, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import MegaMenu from './MegaMenu';

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
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const pathname = usePathname();

    const isEditor = pathname === '/edytor';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Compact white Navbar for editor mode
    if (isEditor) {
        return (
            <nav className="fixed w-full z-50 bg-white py-2 border-b border-vintage-border/50 shadow-sm">
                <div className="max-w-full mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-10">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center text-vintage-muted hover:text-vintage-primary transition-colors gap-2 text-sm">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline">Powrót</span>
                            </Link>
                            <div className="h-5 w-px bg-vintage-border"></div>
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-vintage-primary text-white p-1 rounded">
                                    <MapPin size={16} strokeWidth={1.5} />
                                </div>
                                <span className="font-serif text-lg font-bold text-vintage-text">MapStory</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors p-1">
                                <User size={20} strokeWidth={1.5} />
                            </button>
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors relative p-1">
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-vintage-primary rounded-full ring-2 ring-white"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    const navbarClasses = isScrolled
        ? 'bg-white py-3 border-b border-vintage-border'
        : 'bg-vintage-paper py-5 border-b border-transparent';

    const containerClasses = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

    const logoBgClass = isScrolled
        ? 'bg-vintage-text text-white'
        : 'bg-vintage-primary text-white';

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${navbarClasses} ${isScrolled ? 'shadow-soft' : ''}`}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
            <div className={containerClasses}>
                <div className="flex justify-between items-center h-14">

                    {/* 1. LEFT: LOGO */}
                    <Link
                        href="/"
                        className="flex items-center cursor-pointer group z-50 relative min-w-[140px]"
                    >
                        <div className={`p-1.5 rounded mr-3 transition-all duration-300 group-hover:rotate-12 ${logoBgClass}`}>
                            <MapPin size={22} strokeWidth={1.5} />
                        </div>
                        <span className="font-serif text-2xl font-bold tracking-tight text-vintage-text">
                            MapStory
                        </span>
                    </Link>

                    {/* 2. CENTER: MAIN NAVIGATION (Desktop) */}
                    <div className="hidden md:flex items-center justify-center space-x-12 h-full flex-1">

                        {/* MEGA MENU TRIGGER */}
                        <div
                            className="h-full flex items-center"
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                        >
                            <Link
                                href="/produkty/streetmap"
                                className={`flex items-center gap-1 text-sm font-bold tracking-wide transition-colors uppercase py-4 ${isMegaMenuOpen ? 'text-vintage-primary' : 'text-vintage-text hover:text-vintage-primary'
                                    }`}
                            >
                                Produkty
                                <ChevronDown size={14} className={`transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                            </Link>
                        </div>

                        {/* INSPIRATIONS */}
                        <Link
                            href="/inspiracje"
                            className={`text-sm font-bold tracking-wide transition-colors uppercase py-4 ${pathname === '/inspiracje' ? 'text-vintage-primary' : 'text-vintage-text hover:text-vintage-primary'
                                }`}
                        >
                            Inspiracje
                        </Link>

                        {/* ABOUT US */}
                        <Link
                            href="/o-nas"
                            className={`text-sm font-bold tracking-wide transition-colors uppercase py-4 ${pathname === '/o-nas' ? 'text-vintage-primary' : 'text-vintage-text hover:text-vintage-primary'
                                }`}
                        >
                            O Nas
                        </Link>
                    </div>

                    {/* 3. RIGHT: ACTIONS & CTA */}
                    <div className="hidden md:flex items-center justify-end gap-8 min-w-[140px]">
                        <Button
                            variant="dark"
                            size="md"
                            onClick={() => window.location.href = '/edytor'}
                            className="font-bold tracking-widest px-8 shadow-lg hover:shadow-xl mr-2 text-white"
                        >
                            ZAPROJEKTUJ
                        </Button>

                        {/* Icons Group */}
                        <div className="flex items-center gap-6">
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors p-1">
                                <User size={24} strokeWidth={1.5} />
                            </button>
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors relative p-1">
                                <ShoppingBag size={24} strokeWidth={1.5} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-vintage-primary rounded-full ring-2 ring-white"></span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <button className="text-vintage-text">
                            <ShoppingBag size={22} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-vintage-text hover:text-vintage-primary focus:outline-none p-1"
                        >
                            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MEGA MENU PANEL (Desktop) --- */}
            <MegaMenu
                isOpen={isMegaMenuOpen}
                categories={productCategories}
                onClose={() => setIsMegaMenuOpen(false)}
            />

            {/* --- MOBILE MENU --- */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-vintage-border absolute w-full h-screen shadow-xl animate-fade-in z-40 overflow-y-auto pb-20">
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
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.image} alt="" className="w-12 h-12 rounded-sm object-cover" />
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
                                className="block w-full text-left py-3 font-bold text-vintage-text uppercase tracking-wide"
                            >
                                Inspiracje
                            </Link>
                            <Link
                                href="/o-nas"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block w-full text-left py-3 font-bold text-vintage-text uppercase tracking-wide"
                            >
                                O Nas
                            </Link>
                        </div>

                        <div className="pt-2">
                            <div className="flex items-center gap-2 py-3 text-vintage-text border-b border-vintage-border/50">
                                <User size={18} /> <span>Moje Konto</span>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link href="/edytor" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button
                                    variant="dark"
                                    fullWidth
                                    className="font-bold tracking-widest py-4"
                                >
                                    ZAPROJEKTUJ
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
