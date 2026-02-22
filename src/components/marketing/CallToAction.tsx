import Link from 'next/link';
import Button from '@/components/ui/Button';
import { LuShoppingBag, LuMap } from 'react-icons/lu';
import { CallToActionCTA } from './CallToActionCTA';

export default function CallToAction() {
    return (
        <section className="bg-vintage-primary py-16 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-black/5 backdrop-blur-sm">
                    <LuMap size={28} className="text-black/20" />
                </div>

                <h2 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                    Twoja Lokalizacja.<br />
                    <span className="text-white/80 italic">Twoja Sztuka.</span>
                </h2>

                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-light">
                    Każdy plakat, który tworzysz, jest w 100% Twój. Żadnych znaków wodnych, subskrypcji czy ukrytych opłat.
                    Tylko czysta, piękna kartografia.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                    <CallToActionCTA />

                    <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white/10 hover:border-white hover:text-white px-10 py-4 text-base bg-transparent"
                        icon={<LuShoppingBag size={20} />}
                    >
                        Kup Wydruki
                    </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-white/70 uppercase tracking-widest">
                    <span>Dołącz do 1,400+ twórców</span>
                    <span className="hidden md:block w-1 h-1 bg-white/50 rounded-full"></span>
                    <span>Wydrukowano 9,200+ map</span>
                    <span className="hidden md:block w-1 h-1 bg-white/50 rounded-full"></span>
                    <span>Wysyłka w 24h</span>
                </div>
            </div>
        </section>
    );
}
