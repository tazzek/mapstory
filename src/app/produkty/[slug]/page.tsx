import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Star, Check, Printer, Download, MapPin, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ProductData {
    name: string;
    tagline: string;
    description: string;
    category: string;
    image: string;
    features: string[];
    price: string;
}

const products: Record<string, ProductData> = {
    streetmap: {
        name: 'StreetMap',
        tagline: 'Każda ulica ma swoją historię',
        description: 'Personalizowany plakat z mapą ulic Twojego miasta w stylu Nordic, Noir lub Vintage. Idealny na ścianę salonu lub jako prezent ze znaczeniem.',
        category: 'Ziemia',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Precyzja ulic do numeru domu', 'Style: Nordic, Noir, Vintage', 'Dane z OpenStreetMap 2024', 'Personalizacja tekstu i współrzędnych'],
        price: 'od 89 zł',
    },
    topoart: {
        name: 'TopoArt',
        tagline: 'Góry i rzeźba terenu w 3D',
        description: 'Plakat topograficzny z technologią hillshading, pokazujący rzeźbę terenu jak nigdy dotąd. Prawdziwe dane elewacyjne zamienione w sztukę.',
        category: 'Ziemia',
        image: 'https://images.unsplash.com/photo-1519681393798-3828fb4090bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Dane elewacyjne wysokiej rozdzielczości', 'Efekt Hillshading 3D', 'Izolinie terenu', 'Idealne na prezent dla podróżnika'],
        price: 'od 99 zł',
    },
    activepath: {
        name: 'ActivePath',
        tagline: 'Twoja trasa, Twoja historia',
        description: 'Importuj swój ślad GPX z Strava, Garmin lub innej aplikacji. Twoja wycieczka rowerowa, bieg lub wędrówka zamieniona w dzieło sztuki.',
        category: 'Ziemia',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Import GPX/KML z Strava, Garmin', 'Wizualizacja trasy na mapie', 'Statystyki aktywności na plakacie', 'Idealne dla biegaczy i rowerzystów'],
        price: 'od 99 zł',
    },
    'luna-antique': {
        name: 'Luna Antique',
        tagline: 'Fazy Księżyca z XIX wieku',
        description: 'Astronomiczny plakat w stylu antycznych rycin naukowych. Fazy Księżyca z wybranej daty — idealny na rocznicę lub pamiątkę ważnego dnia.',
        category: 'Niebo',
        image: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Dokładna faza Księżyca z dowolnej daty', 'Styl antycznych rycin XIX w.', 'Personalizacja daty i podpisu', 'Elegancki prezent rocznicowy'],
        price: 'od 89 zł',
    },
    celestialcity: {
        name: 'CelestialCity',
        tagline: 'Gwiazdy nad Twoim miastem',
        description: 'Mapa nieba nad wybranym miastem i datą. Idealny na rocznicę ślubu, urodziny lub pierwszy pocałunek pod gwiazdami.',
        category: 'Niebo',
        image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Dokładna mapa nieba z dowolnej daty', 'Gwiazdozbiory i planety', 'Wybór stylu i kolorystyki', 'Romantyczny prezent'],
        price: 'od 89 zł',
    },
    lovestory: {
        name: 'LoveStory',
        tagline: 'Mapa + Wasze zdjęcie',
        description: 'Połącz urocze zdjęcie ze swoją mapą. Idealny na walentynki, rocznicę lub jako prezent dla bliskiej osoby.',
        category: 'Sztuka',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Upload własnego zdjęcia', 'Mapa jako tło lub element', 'Dedykacja i data', 'Idealny prezent dla par'],
        price: 'od 109 zł',
    },
    'artisan-sketch': {
        name: 'Artisan Sketch',
        tagline: 'Architektura & Blueprint',
        description: 'Styl blueprint inspirowany rysunkami technicznymi i architektonicznymi. Twoja mapa w formie szkicu inżynierskiego.',
        category: 'Sztuka',
        image: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        features: ['Styl rysunku technicznego', 'Detale architektoniczne', 'Unikalna estetyka blueprint', 'Nowoczesny prezent'],
        price: 'od 99 zł',
    },
};

export async function generateStaticParams() {
    return Object.keys(products).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = products[slug];
    if (!product) return { title: 'Produkt nie znaleziony' };
    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = products[slug];

    if (!product) notFound();

    return (
        <main className="pt-28 pb-24 bg-vintage-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-vintage-muted mb-8">
                    <Link href="/" className="hover:text-vintage-primary transition-colors">Strona główna</Link>
                    <span>/</span>
                    <span className="text-vintage-text font-medium">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Image */}
                    <div className="relative group">
                        <div className="aspect-[3/4] bg-white rounded-sm shadow-poster overflow-hidden border border-vintage-border/50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="absolute top-4 left-4 bg-vintage-primary text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm">
                            {product.category}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-8 lg:sticky lg:top-32">
                        <div>
                            <p className="text-xs font-bold text-vintage-primary uppercase tracking-widest mb-2">{product.category}</p>
                            <h1 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-3">{product.name}</h1>
                            <p className="text-vintage-primary text-xl italic font-serif">{product.tagline}</p>
                        </div>

                        <p className="text-vintage-muted text-lg leading-relaxed">{product.description}</p>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center text-vintage-primary">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-sm text-vintage-muted">(247 opinii)</span>
                        </div>

                        <div className="space-y-3 border-t border-vintage-border pt-6">
                            <h3 className="font-serif text-lg text-vintage-text mb-4">Cechy produktu</h3>
                            {product.features.map((f, i) => (
                                <div key={i} className="flex items-start gap-3 text-vintage-text/80">
                                    <Check size={18} className="text-vintage-success mt-0.5 flex-shrink-0" />
                                    <span>{f}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white border border-vintage-border rounded-sm p-6 shadow-sm">
                            <div className="flex items-end justify-between mb-6">
                                <div>
                                    <p className="text-sm text-vintage-muted">Cena</p>
                                    <p className="font-serif text-3xl font-bold text-vintage-text">{product.price}</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1.5 text-xs text-vintage-muted bg-vintage-bg px-3 py-1.5 rounded-sm">
                                        <Printer size={14} /> Wydruk
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-vintage-muted bg-vintage-bg px-3 py-1.5 rounded-sm">
                                        <Download size={14} /> Cyfrowy
                                    </div>
                                </div>
                            </div>

                            <Link href="/edytor" className="block">
                                <Button variant="dark" fullWidth size="lg" icon={<ArrowRight size={20} />}>
                                    Zaprojektuj ten plakat
                                </Button>
                            </Link>
                        </div>

                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-vintage-muted hover:text-vintage-primary transition-colors">
                            <ArrowLeft size={16} /> Wróć do strony głównej
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
