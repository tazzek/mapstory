import type { Metadata } from 'next';
import { LuMapPin, LuHeart, LuUsers } from 'react-icons/lu';

export const metadata: Metadata = {
    title: 'O nas',
    description: 'Poznaj zespół MapStory — tworzymy personalizowane plakaty z mapami, które zamieniają wspomnienia w sztukę.',
};

export default function ONasPage() {
    return (
        <main className="pt-32 pb-24 bg-vintage-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h1 className="font-serif text-4xl md:text-6xl font-bold text-vintage-text mb-6">
                        Każde miejsce<br />
                        <span className="text-vintage-primary italic">opowiada historię.</span>
                    </h1>
                    <p className="text-vintage-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        Jesteśmy polską pracownią kreatywną, która łączy kartografię z emocjami.
                        Wierzymy, że każda lokalizacja niesie ze sobą wyjątkowe wspomnienia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: <LuMapPin size={28} />, title: 'Made in Poland', desc: 'Projektujemy i produkujemy w Polsce, z dbałością o najdrobniejsze detale.' },
                        { icon: <LuHeart size={28} />, title: 'Z pasją', desc: 'Każdy plakat to połączenie precyzji kartografii z emocjami wspomnień.' },
                        { icon: <LuUsers size={28} />, title: '5000+ klientów', desc: 'Zaufało nam tysiące osób, które zamieniły swoje ulubione miejsca w sztukę.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-vintage-border rounded-sm p-8 text-center shadow-sm hover:shadow-card transition-shadow duration-300">
                            <div className="w-14 h-14 bg-vintage-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-vintage-primary">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl text-vintage-text mb-3">{item.title}</h3>
                            <p className="text-vintage-muted text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-vintage-paper border border-vintage-border rounded-sm p-8 lg:p-16 text-center">
                    <h2 className="font-serif text-3xl text-vintage-text mb-6">Nasza misja</h2>
                    <p className="text-vintage-muted text-lg leading-relaxed max-w-3xl mx-auto">
                        Tworzymy narzędzia, które pozwalają każdemu zamienić swoje wspomnienia w dzieło sztuki.
                        Nasz kreator map jest intuicyjny, piękny i dostępny dla każdego —
                        niezależnie od umiejętności projektowych.
                    </p>
                </div>
            </div>
        </main>
    );
}
