import type { Metadata } from 'next';
import { LuMail, LuMapPin, LuClock, LuMessageSquare, LuPhone } from 'react-icons/lu';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
    title: 'Kontakt | MapStory',
    description: 'Masz pytania dotyczące swojego zamówienia lub naszych produktów? Skontaktuj się z nami — chętnie pomożemy.',
};

export default function KontaktPage() {
    return (
        <main className="relative pt-40 pb-32 bg-vintage-bg overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-vintage-primary/5 to-transparent pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-vintage-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container-mapstory relative z-10">
                {/* Header Section */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-primary/10 border border-vintage-primary/20 text-vintage-primary text-[10px] font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <LuMessageSquare size={12} />
                        Centrum Pomocy
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-vintage-text mb-8 leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Jesteśmy tu, by <span className="text-vintage-primary italic">Pomóc.</span>
                    </h1>
                    <p className="text-vintage-muted text-xl md:text-2xl font-light leading-relaxed max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Masz pytanie o zamówienie, edytor lub współpracę? Skorzystaj z formularza lub wybierz bezpośredni kanał kontaktu.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-5 space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                        <div className="space-y-8">
                            {[
                                {
                                    icon: <LuMail size={24} />,
                                    title: 'Napisz do nas',
                                    info: 'kontakt@mapstory.pl',
                                    sub: 'Odpowiadamy zazwyczaj w ciągu 24h roboczych.',
                                    link: 'mailto:kontakt@mapstory.pl'
                                },
                                {
                                    icon: <LuPhone size={24} />,
                                    title: 'Zadzwoń do nas',
                                    info: '+48 123 456 789',
                                    sub: 'Dostępni pn-pt w godzinach 9:00 - 17:00.',
                                    link: 'tel:+48123456789'
                                },
                                {
                                    icon: <LuMapPin size={24} />,
                                    title: 'Nasza Pracownia',
                                    info: 'ul. Kolejowa 12, 00-001 Warszawa',
                                    sub: 'Tu tworzymy i wysyłamy Twoje mapy.',
                                    link: 'https://maps.google.com'
                                },
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link}
                                    target={item.link.startsWith('http') ? '_blank' : undefined}
                                    className="flex items-start gap-6 group cursor-pointer transition-all duration-300"
                                >
                                    <div className="w-14 h-14 bg-white border border-vintage-border rounded-sm shadow-sm flex items-center justify-center shrink-0 text-vintage-muted group-hover:text-vintage-primary group-hover:border-vintage-primary/30 group-hover:shadow-card transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-serif text-xl font-bold text-vintage-primary transition-colors">{item.title}</h3>
                                        <div className="text-vintage-text font-medium text-lg">{item.info}</div>
                                        <p className="text-vintage-muted text-sm font-light leading-relaxed">{item.sub}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Social / Extra Info */}
                        <div className="p-8 bg-white/40 border border-vintage-border rounded-sm backdrop-blur-sm">
                            <h4 className="font-serif text-lg font-bold text-vintage-text mb-4 flex items-center gap-2">
                                <LuClock size={18} className="text-vintage-primary" />
                                Reagujemy szybko
                            </h4>
                            <p className="text-vintage-muted text-sm leading-relaxed mb-6">
                                Nasz zespół produkcyjny pracuje od poniedziałku do piątku. Zamówienia cyfrowe dostarczane są natychmiastowo 24/7.
                            </p>
                            <div className="flex gap-4">
                                <div className="h-0.5 grow bg-vintage-primary/10 rounded-full overflow-hidden">
                                    <div className="h-full w-2/3 bg-vintage-primary animate-pulse"></div>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-vintage-primary">High Priority Support</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7 lg:sticky lg:top-32 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
