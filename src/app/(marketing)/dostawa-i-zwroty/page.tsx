import type { Metadata } from 'next';
import { LuTruck, LuPackage, LuRefreshCw, LuShieldCheck, LuClock, LuArrowRight } from 'react-icons/lu';

export const metadata: Metadata = {
    title: 'Dostawa i zwroty | MapStory',
    description: 'Informacje o kosztach i czasie dostawy oraz polityce zwrotów w sklepie MapStory.',
};

const sections = [
    { id: 'dostawa', title: 'Metody i koszty dostawy' },
    { id: 'czas', title: 'Czas realizacji i doręczenia' },
    { id: 'zwroty', title: 'Polityka zwrotów' },
    { id: 'reklamacje', title: 'Proces reklamacji' },
];

export default function DostawaZwrotyPage() {
    return (
        <main className="relative pt-40 pb-32 bg-vintage-bg overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-vintage-primary/5 to-transparent pointer-events-none"></div>

            <div className="container-mapstory relative z-10">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-primary/10 border border-vintage-primary/20 text-vintage-primary text-[10px] font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <LuTruck size={12} />
                        Logistyka i Wsparcie
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-vintage-text mb-8 leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Dostawa oraz <span className="text-vintage-primary italic">Zwroty.</span>
                    </h1>
                    <p className="text-vintage-muted text-xl md:text-2xl font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Wszystko, co musisz wiedzieć o drodze Twojego zamówienia — od naszej pracowni prosto pod Twoje drzwi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Navigation Sidebar */}
                    <aside className="lg:col-span-3 lg:sticky lg:top-32 hidden lg:block animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                        <nav className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest text-vintage-muted font-bold mb-4 ml-4">Spis informacji</p>
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

                        <div className="mt-12 p-6 bg-vintage-primary/5 rounded-sm border border-vintage-primary/10">
                            <LuShieldCheck className="text-vintage-primary mb-3" size={24} />
                            <h4 className="font-serif font-bold text-vintage-text mb-2">Bezpieczna przesyłka</h4>
                            <p className="text-xs text-vintage-muted leading-relaxed">Każdy plakat pakujemy w grubą, tekturową tubę, aby dotarł do Ciebie w idealnym stanie.</p>
                        </div>
                    </aside>

                    {/* Content Section */}
                    <div className="lg:col-span-9 bg-white border border-vintage-border rounded-sm p-8 md:p-16 shadow-card animate-in fade-in slide-in-from-right-8 duration-1000 delay-500 max-w-none">
                        <div className="prose prose-vintage prose-lg max-w-none">
                            <section id="dostawa" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-8 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">01</span>
                                    Metody i koszty dostawy
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                                    <div className="p-6 border border-vintage-border rounded-sm bg-vintage-bg/20">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-vintage-border">
                                                <LuPackage className="text-vintage-primary" size={20} />
                                            </div>
                                            <h3 className="font-serif font-bold text-vintage-text">Paczkomat InPost</h3>
                                        </div>
                                        <p className="text-sm text-vintage-muted mb-4 uppercase tracking-widest font-bold">14,99 PLN</p>
                                        <p className="text-sm text-vintage-muted leading-relaxed">Najwygodniejsza metoda dostawy. Odbierz przesyłkę w dowolnym momencie w wybranym paczkomacie.</p>
                                    </div>
                                    <div className="p-6 border border-vintage-border rounded-sm bg-vintage-bg/20">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-vintage-border">
                                                <LuTruck className="text-vintage-primary" size={20} />
                                            </div>
                                            <h3 className="font-serif font-bold text-vintage-text">Kurier DPD / InPost</h3>
                                        </div>
                                        <p className="text-sm text-vintage-muted mb-4 uppercase tracking-widest font-bold">18,99 PLN</p>
                                        <p className="text-sm text-vintage-muted leading-relaxed">Dostawa bezpośrednio pod Twoje drzwi. Idealne dla większych oprawionych zamówień.</p>
                                    </div>
                                </div>
                                <p className="mt-8 text-vintage-primary font-bold text-sm italic">
                                    Wskazówka: Darmowa dostawa dla wszystkich zamówień powyżej 250 PLN!
                                </p>
                            </section>

                            <section id="czas" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-8 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">02</span>
                                    Czas realizacji
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-6 items-start">
                                        <LuClock size={24} className="text-vintage-primary shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-serif font-bold text-vintage-text text-xl mb-2">Produkcja i pakowanie</h4>
                                            <p className="text-vintage-muted font-light">Każda mapa jest personalizowana i drukowana na Twoje zamówienie. Ten proces zajmuje zazwyczaj **1-2 dni robocze**.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-start">
                                        <LuTruck size={24} className="text-vintage-primary shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-serif font-bold text-vintage-text text-xl mb-2">Czas transportu</h4>
                                            <p className="text-vintage-muted font-light">Kurierzy zazwyczaj doręczają przesyłkę w ciągu **1-2 dni roboczych** od momentu odebrania jej z naszej pracowni.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="zwroty" className="scroll-mt-32 mb-16">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-8 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">03</span>
                                    Polityka zwrotów
                                </h2>
                                <div className="p-8 bg-vintage-primary/5 border border-vintage-primary/10 rounded-sm mb-8">
                                    <p className="text-vintage-text font-medium mb-4 italic">Ważna informacja o produktach personalizowanych:</p>
                                    <p className="text-vintage-muted leading-relaxed font-light">
                                        Zgodnie z polskim prawem, prawo do odstąpienia od umowy zawartej na odległość **nie przysługuje konsumentowi** w odniesieniu do umów, w których przedmiotem świadczenia jest produkt nieprefabrykowany, wyprodukowany według specyfikacji konsumenta lub służący zaspokojeniu jego zindywidualizowanych potrzeb.
                                    </p>
                                </div>
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Oznacza to, że nasze personalizowane mapy nie podlegają standardowym zwrotom bez podania przyczyny. Prosimy o uważne sprawdzenie projektu w edytorze przed złożeniem zamówienia.
                                </p>
                            </section>

                            <section id="reklamacje" className="scroll-mt-32">
                                <h2 className="font-serif text-3xl font-bold text-vintage-text mb-8 pb-4 border-b border-vintage-border/10 flex items-center gap-4">
                                    <span className="text-vintage-primary text-sm font-sans flex items-center justify-center w-8 h-8 rounded-full bg-vintage-primary/5 border border-vintage-primary/10 italic">04</span>
                                    Proces reklamacji
                                </h2>
                                <p className="text-vintage-muted leading-relaxed font-light mb-8">
                                    Mimo naszych starań, czasem coś może pójść nie tak podczas transportu lub produkcji. Jeśli Twój produkt dotarł uszkodzony lub posiada wady produkcyjne, naprawimy to!
                                </p>
                                <div className="space-y-4 not-prose">
                                    {[
                                        'Zrób zdjęcie uszkodzonego produktu oraz opakowania.',
                                        'Wyślij wiadomość na kontakt@mapstory.pl podając numer zamówienia.',
                                        'Rozpatrzymy zgłoszenie w ciągu 48h roboczych.',
                                        'W przypadku wady, wyślemy nowy produkt na nasz koszt.'
                                    ].map((step, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 border border-vintage-border rounded-sm hover:border-vintage-primary/30 transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-vintage-primary text-white flex items-center justify-center text-xs font-bold leading-none shrink-0">{i + 1}</div>
                                            <p className="text-sm text-vintage-text">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
