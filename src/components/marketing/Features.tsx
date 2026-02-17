import { ArrowRight } from 'lucide-react';

const steps = [
    {
        id: "01",
        title: "Wybierz swój punkt na ziemi",
        description: "Każde miejsce ma swoją historię. Wpisz miasto, ulicę lub współrzędne miejsca, gdzie wszystko się zaczęło. Nasza baza obejmuje cały świat.",
        image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        align: "right"
    },
    {
        id: "02",
        title: "Zostań kuratorem sztuki",
        description: "Nie korzystasz z gotowca. Ty decydujesz. Wybierz styl Noir, Vintage lub Modern. Dostosuj kolory, dodaj dedykację i datę.",
        image: "https://images.unsplash.com/photo-1615800098779-1be8287d6b07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        align: "left"
    },
    {
        id: "03",
        title: "Powieś wspomnienia na ścianie",
        description: "My zajmiemy się resztą. Drukujemy na matowym papierze muzealnym 200g i wysyłamy w bezpiecznej tubie w 48h.",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        align: "right"
    }
];

export default function Features() {
    return (
        <section className="bg-vintage-bg pb-24 pt-[calc(var(--spacing)*32)] lg:pb-32 relative overflow-hidden border-t border-vintage-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: Vertical Text */}
                    <div className="hidden lg:flex lg:col-span-2 relative justify-center">
                        <div className="sticky top-0 h-screen flex items-center justify-center">
                            <h2 className="text-[80px] leading-none font-serif font-bold text-vintage-text/5 -rotate-90 whitespace-nowrap tracking-widest origin-center">
                                JAK TO DZIAŁA
                            </h2>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Steps */}
                    <div className="lg:col-span-10 space-y-24 lg:space-y-32 pt-0">

                        <div className="lg:hidden mb-12 text-center pt-12">
                            <h2 className="font-serif text-3xl font-bold text-vintage-text tracking-wide">
                                Jak to działa?
                            </h2>
                        </div>

                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-20 group`}
                            >
                                <div className="flex-1 space-y-6 relative">
                                    {index !== steps.length - 1 && (
                                        <div className={`hidden lg:block absolute -bottom-32 ${index % 2 === 1 ? 'left-0' : 'right-0'} w-px h-24 bg-vintage-primary/20`}></div>
                                    )}
                                    <div className="flex items-baseline gap-4">
                                        <span className="font-serif text-6xl text-vintage-primary opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                                            {step.id}
                                        </span>
                                        <div className="h-px bg-vintage-primary/30 flex-1"></div>
                                    </div>
                                    <h3 className="font-serif text-3xl md:text-4xl text-vintage-text leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-vintage-muted text-lg leading-relaxed max-w-md">
                                        {step.description}
                                    </p>
                                    {index === 0 && (
                                        <button className="text-sm font-bold uppercase tracking-widest text-vintage-primary flex items-center gap-2 mt-4 hover:gap-4 transition-all">
                                            Znajdź lokalizację <ArrowRight size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex-1 w-full">
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-card border border-vintage-border/50 group-hover:shadow-2xl transition-all duration-700">
                                        <div className="absolute inset-0 bg-vintage-primary/5 mix-blend-multiply z-10 pointer-events-none"></div>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        />
                                        {index === 0 && (
                                            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-sm shadow-sm z-20 flex items-center gap-3 animate-fade-in-up">
                                                <div className="w-8 h-8 rounded-full bg-vintage-bg flex items-center justify-center text-vintage-primary">
                                                    <ArrowRight size={14} className="-rotate-45" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="h-2 w-2/3 bg-vintage-text/10 rounded mb-1"></div>
                                                    <div className="h-1.5 w-1/2 bg-vintage-text/5 rounded"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
