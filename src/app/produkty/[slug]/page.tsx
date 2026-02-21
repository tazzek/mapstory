import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Printer, Download, ArrowLeft, Star, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ProductPageCTA } from './ProductPageCTA';

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
        <main className="min-h-screen bg-vintage-bg">
            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* 1. Left: Floating Canvas (55%) */}
                <div className="w-full lg:w-[55%] relative bg-[#F0EBE5] flex items-center justify-center lg:justify-start lg:pl-[max(3rem,calc((100vw-90rem)/2+3rem))] xl:pl-[max(4rem,calc((100vw-90rem)/2+4rem))] p-8 min-h-[50vh] lg:min-h-screen overflow-hidden">
                    {/* Background grid texture */}
                    <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

                    {/* Container for Breadcrumbs + Poster so they are perfectly aligned together */}
                    <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg z-10 flex flex-col pt-12 lg:pt-0">

                        {/* Breadcrumbs aligned exactly with the poster's left edge */}
                        <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold tracking-widest uppercase text-vintage-muted mb-8">
                            <Link href="/" className="hover:text-vintage-primary transition-colors">Strona Główna</Link>
                            <span className="text-vintage-border">/</span>
                            <span className="text-vintage-primary">{product.name}</span>
                        </div>

                        {/* The Floating Poster Canvas */}
                        <div className="relative w-full aspect-[3/4]">
                            <div className="absolute inset-0 bg-black/10 transform translate-y-12 blur-3xl scale-95 rounded-sm"></div>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover shadow-poster rounded-sm"
                                priority
                                sizes="(max-width: 1024px) 100vw, 55vw"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Right: Museum Plaque (45%) */}
                <div className="w-full lg:w-[45%] bg-white flex flex-col justify-center px-8 py-16 lg:py-24 lg:pl-16 lg:pr-[max(3rem,calc((100vw-90rem)/2+3rem))] xl:pr-[max(4rem,calc((100vw-90rem)/2+4rem))] border-l border-vintage-border/50">
                    <div className="w-full max-w-lg mx-auto lg:mx-0">

                        {/* Headers */}
                        <div className="mb-10">
                            <p className="text-xs font-bold text-vintage-primary uppercase tracking-[0.3em] mb-4">
                                KOLEKCJA {product.category}
                            </p>
                            <h1 className="font-serif text-5xl xl:text-6xl font-bold text-vintage-text mb-6 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-vintage-text/70 text-lg font-medium tracking-wide">
                                {product.description}
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px w-full bg-vintage-border/40 mb-10"></div>

                        {/* Museum Details (Features) */}
                        <div className="mb-14">
                            <ul className="space-y-5">
                                {product.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-4 text-vintage-text text-sm font-medium">
                                        <span className="text-vintage-primary mt-1.5 flex-shrink-0 text-[8px]">■</span>
                                        <span className="leading-snug">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Integrated Purchase Block */}
                        <div className="space-y-8">
                            <div>
                                <p className="font-serif text-4xl font-bold text-vintage-text leading-none">{product.price}</p>
                            </div>

                            <ProductPageCTA />

                            <div className="flex gap-6 pt-2">
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-vintage-muted font-bold tracking-widest uppercase">
                                    <Printer size={16} className="text-vintage-primary" /> Wydruk Premium
                                </div>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-vintage-muted font-bold tracking-widest uppercase">
                                    <Download size={16} className="text-vintage-primary" /> Wersja Cyfrowa
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* 3. Section: Editorial Details (Below the fold) */}
            <section className="py-24 bg-white border-t border-vintage-border/50">
                <div className="container-mapstory">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Summary / Gallery (Left - 5 cols) */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h2 className="font-serif text-3xl text-vintage-text mb-6">Sztuka w detalu</h2>
                                <p className="text-vintage-muted leading-relaxed font-medium">
                                    Nasze plakaty to nie tylko wydruki. To starannie wyselekcjonowane dzieła sztuki, bazujące na precyzyjnych danych. Używamy najwyższej klasy certyfikowanego papieru muzealnego o gramaturze 250g/m², który gwarantuje przetrwanie Twoich wspomnień przez dekady bez utraty głębi kolorów.
                                </p>
                            </div>

                            {/* Blank image boxes for future real photos */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="aspect-[4/5] bg-vintage-bg border border-vintage-border/50 rounded-sm flex flex-col items-center justify-center text-vintage-muted/60 p-6 text-center transform transition-transform hover:-translate-y-1 duration-500">
                                    <span className="text-xs font-bold uppercase tracking-widest mb-2">[Zdjęcie 1]</span>
                                    <span className="text-[10px]">Zbliżenie na papier</span>
                                </div>
                                <div className="aspect-[4/5] bg-vintage-bg border border-vintage-border/50 rounded-sm flex flex-col items-center justify-center text-vintage-muted/60 p-6 text-center transform transition-transform hover:-translate-y-1 duration-500 mt-8">
                                    <span className="text-xs font-bold uppercase tracking-widest mb-2">[Zdjęcie 2]</span>
                                    <span className="text-[10px]">Pancerna tuba</span>
                                </div>
                            </div>
                        </div>

                        {/* Features & FAQ (Right - 7 cols) */}
                        <div className="lg:col-span-7">

                            {/* Feature Icons Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-20">
                                <div className="border border-vintage-border/30 bg-vintage-bg/50 p-8 rounded-sm">
                                    <MapPin size={24} strokeWidth={1.5} className="text-vintage-primary mb-5" />
                                    <h4 className="font-serif text-lg text-vintage-text mb-2 font-bold">Precyzyjne Dane</h4>
                                    <p className="text-sm text-vintage-muted leading-relaxed">Zasilane przez dedykowane, oficjalne instytuty geograficzne i astronomiczne.</p>
                                </div>
                                <div className="border border-vintage-border/30 bg-vintage-bg/50 p-8 rounded-sm">
                                    <Star size={24} strokeWidth={1.5} className="text-vintage-primary mb-5" />
                                    <h4 className="font-serif text-lg text-vintage-text mb-2 font-bold">Papier Muzealny</h4>
                                    <p className="text-sm text-vintage-muted leading-relaxed">Bezkwasowy papier 250g, głęboki mat, nie blaknie wyeksponowany na słońcu.</p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-vintage-border/40 mb-16"></div>

                            {/* Reviews */}
                            <div className="mb-0">
                                <h3 className="text-xs font-bold text-vintage-primary uppercase tracking-[0.2em] mb-8">Opinie Klientów</h3>
                                <div className="space-y-10">
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-vintage-bg border border-vintage-border flex items-center justify-center text-vintage-text font-serif text-xl flex-shrink-0">A</div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-bold text-vintage-text">Anna W.</span>
                                                <span className="text-xs text-vintage-success bg-vintage-success/10 px-2 py-0.5 rounded-sm">• Zweryfikowany</span>
                                            </div>
                                            <p className="text-vintage-muted italic leading-relaxed">"Papier jest niesamowity, gruby i matowy. Plakat robi ogromne wrażenie na żywo, dużo większe i bardziej prestiżowe niż na zdjęciach w sieci."</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-12 h-12 rounded-full bg-vintage-bg border border-vintage-border flex items-center justify-center text-vintage-text font-serif text-xl flex-shrink-0">M</div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-bold text-vintage-text">Michał K.</span>
                                                <span className="text-xs text-vintage-success bg-vintage-success/10 px-2 py-0.5 rounded-sm">• Zweryfikowany</span>
                                            </div>
                                            <p className="text-vintage-muted italic leading-relaxed">"Kupiłem na rocznicę. Żona była zachwycona dokładnością i samą jakością wydruku. Całość zapakowana jak dzieło sztuki. Rzadko spotykana jakość."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Divider for Full Width FAQ */}
                    <div className="h-px w-full bg-vintage-border/40 my-24"></div>

                    {/* Full Width FAQ & Instructions */}
                    <div className="max-w-5xl mx-auto">
                        <h3 className="text-center text-xs font-bold text-vintage-primary uppercase tracking-[0.2em] mb-16">FAQ & Informacje Praktyczne</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12">
                            <div>
                                <h4 className="font-serif text-xl text-vintage-text font-bold mb-3">Jak wygląda proces tworzenia?</h4>
                                <p className="text-vintage-muted text-sm leading-relaxed">Kliknij „Zaprojektuj”, wpisz w wyszukiwarkę interesującą Cię lokację geograficzną i dostosuj detale kompozycji. Nasz trójwymiarowy edytor zadba o precyzyjne skadrowanie i umieszczenie etykiety.</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-vintage-text font-bold mb-3">Jaki jest czas dostarczenia sztuki?</h4>
                                <p className="text-vintage-muted text-sm leading-relaxed">Twój plakat zostanie wyprodukowany i pieczołowicie zamknięty w sztywnej, bezpiecznej tubie. Paczki opuszczają naszą pracownię w ciągu maksymalnie 48 godzin od skompletowania zamówienia.</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-vintage-text font-bold mb-3">Jaka jest trwałość wydruku?</h4>
                                <p className="text-vintage-muted text-sm leading-relaxed">Będąc świadomym inwestycji w sztukę ścienną stosujemy muzealny papier bezkwasowy i tusze na bazie pigmentu. Wydruk utrzyma spektakularną czerń i odcienie przez dekady, unikając efektu blaknięcia.</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-vintage-text font-bold mb-3">Mogę wydrukować to na własną rękę?</h4>
                                <p className="text-vintage-muted text-sm leading-relaxed">Oczywiście. Wybierając w koszyku pozycję Wersja Cyfrowa (High-Res) na podany adres e-mail przyjdzie niemal natychmiast wygenerowany profesjonalny plik wielkoformatowy gotowy do posłania do drukarni.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
