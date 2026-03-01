import type { Metadata } from 'next';
import { LuFileText, LuArrowRight } from 'react-icons/lu';

export const metadata: Metadata = {
    title: 'Regulamin | MapStory',
    description: 'Regulamin sklepu MapStory — warunki sprzedaży i korzystania z usług.',
};

const sections = [
    { id: 'postanowienia', title: '§1 Postanowienia ogólne' },
    { id: 'zamowienia', title: '§2 Zamówienia' },
    { id: 'ceny', title: '§3 Ceny i płatności' },
    { id: 'dostawa', title: '§4 Dostawa' },
    { id: 'reklamacje', title: '§5 Reklamacje i zwroty' },
];

export default function RegulaminPage() {
    return (
        <main className="relative pt-40 pb-32 bg-vintage-bg overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-vintage-primary/5 to-transparent pointer-events-none"></div>

            <div className="container-mapstory relative z-10">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-primary/10 border border-vintage-primary/20 text-vintage-primary text-[10px] font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <LuFileText size={12} />
                        Dokumenty Prawne
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-vintage-text mb-8 leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Regulamin <span className="text-vintage-primary italic">Sklepu.</span>
                    </h1>
                    <p className="text-vintage-muted text-xl md:text-2xl font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Zasady korzystania z serwisu MapStory oraz warunki realizacji zamówień. Ostatnia aktualizacja: <span className="font-medium text-vintage-text">Luty 2026</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Navigation Sidebar */}
                    <aside className="lg:col-span-3 lg:sticky lg:top-32 hidden lg:block animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                        <nav className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-vintage-muted font-bold mb-4 ml-4">Spis treści</p>
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="group flex items-center justify-between px-4 py-3 rounded-sm hover:bg-white hover:shadow-sm border border-transparent hover:border-vintage-border transition-all duration-300"
                                >
                                    <span className="text-sm font-medium text-vintage-muted group-hover:text-vintage-primary transition-colors">
                                        {section.title}
                                    </span>
                                    <LuArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 text-vintage-primary transition-all duration-300" />
                                </a>
                            ))}
                        </nav>
                    </aside>

                    {/* Content Section */}
                    <div className="lg:col-span-9 bg-white border border-vintage-border rounded-sm p-8 md:p-16 shadow-card animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 max-w-none">
                        <div className="prose prose-vintage prose-lg max-w-none">
                            <section id="postanowienia" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-6 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">01</span>
                                    Postanowienia ogólne
                                </h2>
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Sklep internetowy MapStory prowadzi sprzedaż personalizowanych plakatów z mapami oraz produktów pokrewnych.
                                    Niniejszy regulamin określa zasady korzystania ze sklepu, składania zamówień i realizacji usług.
                                </p>
                            </section>

                            <section id="zamowienia" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-6 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">02</span>
                                    Zamówienia
                                </h2>
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Zamówienia są realizowane wyłącznie za pośrednictwem strony internetowej.
                                    Każdy plakat jest tworzony na indywidualne zamówienie, co oznacza że jest produktem spersonalizowanym.
                                </p>
                            </section>

                            <section id="ceny" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-6 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">03</span>
                                    Ceny i płatności
                                </h2>
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Wszystkie ceny podane w sklepie są cenami brutto (zawierają VAT).
                                    Akceptujemy płatności kartą, BLIK, oraz przelewem bankowym.
                                </p>
                            </section>

                            <section id="dostawa" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-6 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">04</span>
                                    Dostawa
                                </h2>
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Standardowy czas realizacji wynosi 2-5 dni roboczych.
                                    Przesyłki realizowane są za pośrednictwem InPost oraz kuriera DPD.
                                </p>
                            </section>

                            <section id="reklamacje" className="scroll-mt-32">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-6 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">05</span>
                                    Reklamacje i zwroty
                                </h2>
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Ze względu na indywidualny charakter produktu, zwroty są możliwe wyłącznie w przypadku wad produkcyjnych.
                                    Reklamacje prosimy zgłaszać drogą mailową na adres kontakt@mapstory.pl.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
