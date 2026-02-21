import Image from 'next/image';

export const ProductShowcase = () => (
    <div className="order-1 lg:order-2 relative group px-4 lg:px-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white rounded-full opacity-20 blur-3xl"></div>

        <div className="relative transform transition-transform duration-700 hover:scale-105 z-10">
            <div className="bg-white p-3 shadow-poster rounded-sm mx-auto max-w-md relative border border-white">
                <div className="absolute inset-0 border border-gray-100 pointer-events-none z-20"></div>
                <div className="bg-[#1A1A1A] p-[10px] shadow-2xl relative">
                    <div className="bg-[#FDFBF7] p-6 lg:p-8 shadow-inner">
                        <div className="aspect-[3/4] bg-vintage-bg relative overflow-hidden flex flex-col items-center justify-end pb-8 border border-vintage-border/50">
                            <div className="absolute inset-0 opacity-90 transition-transform duration-[2000ms] ease-in-out group-hover:scale-110">
                                <Image
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Twoje wspomnienia na mapie"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    style={{ filter: 'grayscale(100%) contrast(110%) sepia(15%)' }}
                                    fetchPriority="high"
                                    unoptimized
                                /></div>

                            <div className="absolute inset-4 border border-vintage-text/10 z-10"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 lg:w-48 lg:h-48 border border-vintage-primary/60 rounded-full bg-vintage-primary/5 backdrop-blur-[1px]"></div>
                                <div className="w-1.5 h-1.5 bg-vintage-primary rounded-full absolute"></div>
                            </div>

                            <div className="relative z-10 text-center bg-white/95 backdrop-blur-md px-6 py-4 w-[85%] mx-auto shadow-card border border-vintage-border/50">
                                <h3 className="font-serif text-2xl tracking-widest uppercase text-vintage-text">Warszawa</h3>
                                <div className="w-8 h-[1px] bg-vintage-primary mx-auto my-2"></div>
                                <p className="font-sans text-[9px] tracking-[0.25em] text-vintage-muted uppercase font-medium">52°13&apos;N 21°00&apos;E</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute -bottom-5 -right-5 bg-vintage-text text-white px-5 py-3 shadow-xl rounded-sm z-30 flex items-center gap-3">
                <div className="flex flex-col">
                    <span className="text-[10px] text-vintage-secondary uppercase tracking-wider">Bestseller</span>
                    <span className="font-serif text-lg leading-none">Vintage Style</span>
                </div>
                <div className="h-8 w-[1px] bg-white/20"></div>
                <span className="font-bold text-vintage-primary">4.9/5</span>
            </div>
        </div>
    </div>
);
