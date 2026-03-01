import type { Metadata } from 'next';
import { LuUsers, LuCamera, LuGift, LuStar, LuCheck, LuArrowRight, LuInstagram } from 'react-icons/lu';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Współpraca | MapStory',
    description: 'Dołącz do społeczności twórców MapStory. Sprawdź nasz program dla ambasadorów i twórców treści.',
};

export default function WspolpracaPage() {
    return (
        <main className="relative pt-40 pb-32 bg-vintage-bg overflow-hidden min-h-screen">
            {/* Background elements */}
            <div className="absolute inset-0 grid-bg opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-vintage-primary/5 to-transparent pointer-events-none"></div>

            <div className="container-mapstory relative z-10 text-center">
                {/* Header Section */}
                <div className="max-w-5xl mx-auto mb-20 md:mb-32">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vintage-primary/10 border border-vintage-primary/20 text-vintage-primary text-[10px] font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <LuStar size={12} />
                        Program dla Twórców
                    </div>
                    <h1 className="font-serif text-4xl md:text-7xl font-bold text-vintage-text mb-8 leading-[0.9] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 uppercase">
                        Zostań Partnerem <br />
                        <span className="text-vintage-primary italic lowercase">MapStory.</span>
                    </h1>
                    <p className="text-vintage-muted text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Szukamy kreatywnych dusz, które pomogą nam uchwycić magię wspomnień. <br className="hidden md:block" />
                        Pokaż nasze mapy przez swój obiektyw i dołącz do naszej społeczności.
                    </p>
                </div>

                <div className="max-w-[1280px] mx-auto px-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-vintage-muted mb-16">
                        Dwie drogi do wspólnej przygody:
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        {/* Program 1: Ambasadorzy */}
                        <div className="bg-white border border-vintage-border rounded-sm p-8 md:p-16 text-left shadow-card relative overflow-hidden group hover:border-vintage-primary/30 transition-all duration-500 flex flex-col">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-vintage-primary/5 -mr-24 -mt-24 rounded-full blur-3xl group-hover:bg-vintage-primary/10 transition-colors"></div>

                            <div className="mb-10 relative">
                                <div className="w-16 h-16 bg-vintage-primary/5 border border-vintage-primary/10 rounded-sm flex items-center justify-center text-vintage-primary mb-8 group-hover:bg-vintage-primary group-hover:text-white transition-all duration-500">
                                    <LuUsers size={32} />
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-vintage-text mb-4 leading-tight">Influencers & <br />Ambassador program</h2>
                                <div className="w-12 h-1 bg-vintage-primary/20 rounded-full"></div>
                            </div>

                            <ul className="space-y-6 mb-16 flex-grow relative">
                                {[
                                    { text: 'Wypełnij krótki formularz zgłoszeniowy.', link: 'Wypełnij tutaj' },
                                    { text: 'Po akceptacji otrzymasz kod podarunkowy **250 PLN** na dowolne produkty.', highlight: true },
                                    { text: 'W zamian prosimy o 2-3 estetyczne zdjęcia lub 1 wideo na Twoim Instagramie lub TikToku.' },
                                    { text: 'Oznacz nas w postach wykorzystując tag @mapstory.pl.' },
                                    { text: 'Dla stałych partnerów oferujemy cykliczne nowości oraz prowizje.' },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-5">
                                        <LuCheck size={20} className="text-vintage-primary shrink-0 mt-1" />
                                        <div className="text-vintage-muted font-light leading-relaxed text-base md:text-lg">
                                            {item.highlight ? <span className="font-medium text-vintage-text underline decoration-vintage-primary/20 decoration-2 underline-offset-4">{item.text}</span> : item.text}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <footer className="relative">
                                <Button variant="primary" size="lg" className="w-full md:w-auto py-5 px-12 group/btn text-sm uppercase tracking-widest font-bold">
                                    Aplikuj Teraz
                                    <LuArrowRight className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </footer>
                        </div>

                        {/* Program 2: Content Sharing */}
                        <div className="bg-white border border-vintage-border rounded-sm p-8 md:p-16 text-left shadow-card relative overflow-hidden group hover:border-vintage-primary/30 transition-all duration-500 flex flex-col">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-vintage-primary/5 -mr-24 -mt-24 rounded-full blur-3xl group-hover:bg-vintage-primary/10 transition-colors"></div>

                            <div className="mb-10 relative">
                                <div className="w-16 h-16 bg-vintage-primary/5 border border-vintage-primary/10 rounded-sm flex items-center justify-center text-vintage-primary mb-8 group-hover:bg-vintage-primary group-hover:text-white transition-all duration-500">
                                    <LuCamera size={32} />
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-vintage-text mb-4 leading-tight">Content Sharing <br />Program</h2>
                                <div className="w-12 h-1 bg-vintage-primary/20 rounded-full"></div>
                            </div>

                            <ul className="space-y-6 mb-16 flex-grow relative">
                                {[
                                    { text: 'Masz już naszą mapę? Prześlij nam swoje wideo produktowe (unboxing, lifestyle).' },
                                    { text: 'Za każde wideo, które wykorzystamy w naszych social mediach, otrzymasz **150 PLN kod rabatowy**.', highlight: true },
                                    { text: 'Możesz wysłać dowolną liczbę zgłoszeń - każda wybrana rolka to nowa nagroda.' },
                                    { text: 'Szczególnie szukamy nagrań pokazujących mapy jako prezent na rocznice, śluby lub urodziny.' },
                                    { text: 'Prześlij pliki bezpośrednio przez nasz formularz uploadu.' },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-5">
                                        <LuCheck size={20} className="text-vintage-primary shrink-0 mt-1" />
                                        <div className="text-vintage-muted font-light leading-relaxed text-base md:text-lg">
                                            {item.highlight ? <span className="font-medium text-vintage-text underline decoration-vintage-primary/20 decoration-2 underline-offset-4">{item.text}</span> : item.text}
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <footer className="relative">
                                <Button variant="outline" size="lg" className="w-full md:w-auto py-5 px-12 border-vintage-primary text-vintage-primary group/btn hover:bg-vintage-primary hover:text-white transition-all text-sm uppercase tracking-widest font-bold">
                                    Prześlij Wideo
                                    <LuArrowRight className="ml-3 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </footer>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-24 text-center space-y-8">
                        <div className="flex justify-center items-center gap-6">
                            <div className="w-16 h-[1px] bg-vintage-border/50"></div>
                            <LuInstagram className="text-vintage-primary/60" size={28} />
                            <div className="w-16 h-[1px] bg-vintage-border/50"></div>
                        </div>
                        <p className="text-vintage-muted font-serif italic text-xl">
                            Masz inny pomysł na współpracę? Napisz do nas na <span className="text-vintage-text font-bold border-b border-vintage-primary/30">hello@mapstory.pl</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
