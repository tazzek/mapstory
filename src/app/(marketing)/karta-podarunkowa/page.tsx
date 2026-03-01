import type { Metadata } from 'next';
import { LuGift, LuMail, LuClock, LuShieldCheck, LuArrowRight, LuStar, LuMapPin } from 'react-icons/lu';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Karta Podarunkowa | MapStory',
    description: 'Podaruj bliskim możliwość stworzenia własnej historii. Karty podarunkowe MapStory na każdą okazję.',
};

export default function KartaPodarunkowaPage() {
    return (
        <main className="relative pt-40 pb-32 bg-vintage-bg overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-vintage-primary/5 to-transparent pointer-events-none"></div>

            <div className="container-mapstory relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Left: Product Image / Card Visual */}
                    <div className="relative animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="aspect-[1.586/1] w-full max-w-xl mx-auto bg-[#2C3E50] rounded-xl shadow-poster overflow-hidden relative group">
                            {/* Card Content Design */}
                            <div className="absolute inset-0 grid-bg opacity-10"></div>
                            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-vintage-primary/20 backdrop-blur-md rounded-sm border border-white/10">
                                            <LuGift size={24} className="text-vintage-primary" />
                                        </div>
                                        <span className="font-serif text-2xl font-bold tracking-tight">MapStory</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Gift Card</div>
                                        <div className="font-serif italic text-vintage-primary text-xl">Prezent pełen wspomnień</div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="h-0.5 w-12 bg-vintage-primary"></div>
                                    <div className="text-4xl md:text-5xl font-serif font-bold tracking-tight">500 <span className="text-xl">PLN</span></div>
                                    <div className="text-[10px] uppercase tracking-[0.3em] opacity-40">Digital Edition • Always Valid</div>
                                </div>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-vintage-primary/20 rounded-full blur-3xl"></div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-sm shadow-card border border-vintage-border hidden md:block animate-bounce-slow">
                            <LuMail className="text-vintage-primary mb-2" size={24} />
                            <p className="text-[10px] font-bold uppercase tracking-widest text-vintage-text leading-tight">Dostawa w 60 sekund <br /> na Twój e-mail</p>
                        </div>
                    </div>

                    {/* Right: Selection info */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-primary/10 border border-vintage-primary/20 text-vintage-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                                <LuStar size={12} />
                                Idealny Prezent
                            </div>
                            <h1 className="font-serif text-5xl md:text-7xl font-bold text-vintage-text mb-6 leading-[0.9] tracking-tight">
                                Karta <span className="text-vintage-primary italic">Podarunkowa.</span>
                            </h1>
                            <p className="text-vintage-muted text-lg md:text-xl font-light leading-relaxed max-w-lg">
                                Podaruj bliskim wolność wyboru i radość z projektowania własnych wspomnień. Karta podarunkowa MapStory to idealny sposób, by upamiętnić ważne chwile, dając obdarowanej osobie pełną swobodę twórczą. Kartę otrzymasz błyskawicznie na e-mail w formie eleganckiego pliku PDF.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-vintage-muted">Wybierz wartość karty:</p>
                            <div className="grid grid-cols-3 gap-4">
                                {[100, 250, 500].map((amount) => (
                                    <button
                                        key={amount}
                                        className={`py-4 md:py-6 border rounded-sm font-serif text-xl md:text-2xl transition-all duration-300 flex flex-col items-center gap-1
                                            ${amount === 250
                                                ? 'border-vintage-primary bg-vintage-primary/5 text-vintage-text shadow-sm'
                                                : 'border-vintage-border text-vintage-muted hover:border-vintage-primary hover:text-vintage-primary'}`}
                                    >
                                        <span className="font-bold">{amount}</span>
                                        <span className="text-[10px] uppercase tracking-widest">PLN</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button variant="primary" size="lg" className="w-full md:w-auto px-16 py-5 shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
                                Dodaj do Koszyka
                                <LuArrowRight size={20} />
                            </Button>
                            <p className="text-[11px] text-vintage-muted mt-4 flex items-center gap-2">
                                <LuShieldCheck size={14} className="text-vintage-primary" />
                                Kod nie traci ważności i jest gotowy do użycia od razu po zakupie.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How it works section - Journey Layout */}
                <div className="mt-40 pt-24 border-t border-vintage-border/50 relative">
                    <div className="text-center mb-24">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-4">Twoja podróż z prezentem</h2>
                        <div className="w-24 h-1 bg-vintage-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Connecting Path (Desktop only) */}
                        <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 hidden md:block">
                            <svg className="w-full h-24 overflow-visible opacity-20" preserveAspectRatio="none">
                                <path
                                    d="M 50 10 Q 250 120 450 10 T 850 10"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeDasharray="8 8"
                                    className="text-vintage-primary"
                                />
                                <LuMapPin className="text-vintage-primary absolute" style={{ left: '5%', top: '0%' }} size={16} />
                                <LuMapPin className="text-vintage-primary absolute" style={{ left: '95%', top: '0%' }} size={16} />
                            </svg>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 relative z-10">
                            {[
                                {
                                    icon: <LuGift size={32} />,
                                    title: 'Wybierz kwotę',
                                    desc: 'Twoja przygoda zaczyna się tutaj. Wybierz wartość karty, która najlepiej oddaje skalę Twoich emocji.',
                                    offset: 'md:-translate-y-8'
                                },
                                {
                                    icon: <LuMail size={32} />,
                                    title: 'Błyskawiczna poczta',
                                    desc: 'Nasz cyfrowy gołąb dostarczy kod w 60 sekund. Otrzymasz PDF gotowy do wręczenia.',
                                    offset: 'md:translate-y-12'
                                },
                                {
                                    icon: <LuStar size={32} />,
                                    title: 'Cel: Radość',
                                    desc: 'Obdarowana osoba staje się odkrywcą – projektuje własną mapę, która zostanie z nią na zawsze.',
                                    offset: 'md:-translate-y-4'
                                }
                            ].map((step, i) => (
                                <div key={i} className={cn("flex flex-col items-center text-center group", step.offset)}>
                                    <div className="relative mb-8">
                                        {/* Stamp/Ticket Shape */}
                                        <div className="w-24 h-24 bg-white border-2 border-dashed border-vintage-border/50 rounded-sm flex items-center justify-center text-vintage-muted group-hover:text-vintage-primary group-hover:border-vintage-primary/50 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:-rotate-3">
                                            {/* Notches for stamp look */}
                                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-vintage-bg rounded-full border border-vintage-border/30"></div>
                                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-vintage-bg rounded-full border border-vintage-border/30"></div>
                                            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-vintage-bg rounded-full border border-vintage-border/30"></div>
                                            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-vintage-bg rounded-full border border-vintage-border/30"></div>

                                            {step.icon}
                                        </div>

                                        {/* Decorative Number */}
                                        <div className="absolute -top-4 -right-4 font-serif text-5xl font-bold text-vintage-primary/10 group-hover:text-vintage-primary/20 transition-colors pointer-events-none italic">
                                            0{i + 1}
                                        </div>
                                    </div>

                                    <h3 className="font-serif text-2xl font-bold text-vintage-text mb-4 tracking-tight">{step.title}</h3>
                                    <p className="text-sm text-vintage-muted font-light leading-relaxed max-w-[260px]">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Extra info section */}
                <div className="mt-40 bg-white border border-vintage-border rounded-sm p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-vintage-primary/5 -mr-32 -mt-32 rounded-full blur-3xl"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h3 className="font-serif text-3xl font-bold text-vintage-text italic">Prezent, który nigdy nie wygasa.</h3>
                            <div className="space-y-4">
                                <p className="text-vintage-muted leading-relaxed font-light">
                                    Nasze kody podarunkowe nie mają daty ważności. To oznacza, że osoba obdarowana może czekać na idealny moment — przeprowadzkę do nowego domu, narodziny dziecka czy powrót z wymarzonych wakacji — aby upamiętnić to wydarzenie na mapie.
                                </p>
                                <ul className="space-y-2">
                                    {['Działa na wszystkie produkty', 'Wielokrotny użytek do wyczerpania salda', 'Możliwość personalizacji PDF'].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-vintage-text">
                                            <LuShieldCheck size={16} className="text-vintage-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="bg-vintage-bg/50 p-8 border border-vintage-border rounded-sm border-dashed">
                            <h4 className="font-serif font-bold text-vintage-text mb-4">Warto wiedzieć</h4>
                            <p className="text-sm text-vintage-muted font-light leading-relaxed mb-6">
                                Karty podarunkowe nie podlegają zwrotom na gotówkę. Kody rabatowe nie mogą być wykorzystane przy zakupie karty podarunkowej.
                            </p>
                            <div className="flex gap-4">
                                <div className="h-0.5 grow bg-vintage-primary/10 rounded-full overflow-hidden mt-2">
                                    <div className="h-full w-full bg-vintage-primary/40"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
