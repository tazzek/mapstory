import { ProductCategory } from './index';

interface MegaMenuProps {
    isOpen: boolean;
    categories: ProductCategory[];
    onClose: () => void;
}

export default function MegaMenu({ isOpen, categories, onClose }: MegaMenuProps) {
    return (
        <div
            className={`hidden md:block absolute top-full left-0 w-full bg-white border-t border-vintage-border shadow-poster transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 max-h-[500px] visible' : 'opacity-0 max-h-0 invisible'
                }`}
            onMouseEnter={() => { }}
            onMouseLeave={onClose}
        >
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-4 gap-12">

                    {/* Columns 1-3: Categories */}
                    {categories.map((cat, idx) => (
                        <div key={idx} className="space-y-8">
                            <h3 className="font-serif text-sm font-bold text-vintage-primary uppercase tracking-[0.2em] border-b border-vintage-border/50 pb-3">
                                {cat.title}
                            </h3>
                            <ul className="space-y-6">
                                {cat.items.map((item, i) => (
                                    <li key={i} className="group cursor-pointer rounded-lg transition-colors">
                                        <a href={`/produkty/${item.slug}`} onClick={onClose}>
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 rounded-sm overflow-hidden flex-shrink-0 border border-vintage-border shadow-sm group-hover:shadow-md transition-all">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-serif text-lg text-vintage-text group-hover:text-vintage-primary transition-colors font-bold leading-tight">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-sm text-vintage-text/70 font-medium mt-1 leading-snug">
                                                        {item.desc}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Column 4: Bestseller / Highlight */}
                    <div className="col-span-1 pl-8 border-l border-vintage-border/50">
                        <h3 className="font-serif text-sm font-bold text-vintage-primary uppercase tracking-[0.2em] pb-5">
                            Bestseller
                        </h3>
                        <a href="/produkty/streetmap" onClick={onClose} className="group cursor-pointer relative overflow-hidden rounded-sm shadow-card aspect-[3/4] block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://images.unsplash.com/photo-1542640244-7e672d6bd4e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                                alt="Bestseller"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
                                <span className="text-[10px] bg-vintage-primary text-white px-2 py-0.5 rounded-sm self-start mb-2 font-bold tracking-wider">TOP 1</span>
                                <h4 className="text-white font-serif text-2xl font-bold">Classic Vintage</h4>
                                <div className="flex items-center text-white/90 text-xs mt-2 gap-2 font-medium tracking-wide">
                                    ZOBACZ TERAZ
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </div>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}
