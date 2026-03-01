import type { Metadata } from 'next';
import Link from 'next/link';
import {
    LuCircleHelp,
    LuMail
} from 'react-icons/lu';
import FAQContent from './FAQContent';

export const metadata: Metadata = {
    title: 'Najczęściej zadawane pytania - MapStory.pl',
    description: 'Centrum pomocy MapStory. Poznaj odpowiedzi na pytania o personalizację plakatów, jakość druku, wysyłkę i płatności.',
};

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-vintage-bg pt-32 pb-24 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-vintage-primary/5 to-transparent"></div>

            <div className="container-mapstory relative z-10">
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-vintage-primary/10 text-vintage-primary rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-vintage-primary/20">
                        <LuCircleHelp size={14} />
                        Centrum Pomocy
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-vintage-text mb-6 tracking-tight">
                        Częste <span className="text-vintage-primary italic">Pytania</span>
                    </h1>
                    <p className="text-vintage-muted text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Wszystko, co musisz wiedzieć o tworzeniu, zamawianiu i dostawie Twojej MapStory. Nie znalazłeś odpowiedzi? Jesteśmy dla Ciebie dostępni.
                    </p>
                </div>

                {/* FAQ Content (Client Component) */}
                <FAQContent />

                {/* Still have questions? */}
                <div className="mt-32 bg-vintage-text text-white p-12 md:p-16 rounded-sm shadow-poster relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-vintage-primary/10 rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">Wciąż potrzebujesz <span className="text-vintage-primary italic">pomocy?</span></h3>
                            <p className="text-white/70 text-lg font-light">
                                Nasz zespół wsparcia jest dostępny od poniedziałku do piątku w godzinach 9:00 - 17:00. Chętnie pomożemy w personalizacji projektu lub sprawdzimy status zamówienia.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                href="/kontakt"
                                className="bg-vintage-primary hover:bg-vintage-primaryHover text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-vintage-primary/30"
                            >
                                <LuMail size={18} />
                                Napisz do nas
                            </Link>
                            <Link
                                href="/edytor"
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3"
                            >
                                Zacznij projektować
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
