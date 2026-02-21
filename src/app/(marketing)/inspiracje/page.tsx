import type { Metadata } from 'next';
import { Camera, Heart } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Inspiracje',
    description: 'Galeria inspiracji MapStory — zobacz, jak inni zaprojektowali swoje unikalne plakaty z mapami.',
};

const inspirations = [
    { title: 'Tokio Noir', style: 'Noir', image: 'https://images.unsplash.com/photo-1542640244-7e672d6bd4e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Islandia Minimal', style: 'Scandi', image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Amsterdam Classic', style: 'Vintage', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Manhattan Grid', style: 'Modern', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Rzym Heritage', style: 'Vintage', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Paryż by Night', style: 'Noir', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Barcelona Warm', style: 'Vintage', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'London Fog', style: 'Scandi', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { title: 'Berlin Loft', style: 'Modern', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
];

export default function InspiracjePage() {
    return (
        <main className="pt-32 pb-24 bg-vintage-bg">
            <div className="container-mapstory">
                <div className="text-center mb-16">
                    <div className="w-12 h-12 bg-vintage-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera size={24} className="text-vintage-primary" />
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-4">Inspiracje</h1>
                    <p className="text-vintage-muted text-lg max-w-xl mx-auto">Galeria plakatów zaprojektowanych przez naszą społeczność. Znajdź swój styl.</p>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {inspirations.map((item, i) => (
                        <div key={i} className="break-inside-avoid group relative overflow-hidden rounded-sm shadow-card border border-vintage-border/50 cursor-pointer bg-white">
                            <div className={`${i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-square' : 'aspect-[4/5]'} relative overflow-hidden`}>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white text-vintage-text hover:text-red-500">
                                    <Heart size={16} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="font-serif text-white text-lg font-bold">{item.title}</h3>
                                    <span className="text-white/80 text-xs uppercase tracking-wider">{item.style}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
