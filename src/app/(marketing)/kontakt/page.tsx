import type { Metadata } from 'next';
import { LuMail, LuMapPin, LuClock } from 'react-icons/lu';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
    title: 'Kontakt',
    description: 'Skontaktuj się z zespołem MapStory — chętnie odpowiemy na Twoje pytania.',
};

export default function KontaktPage() {
    return (
        <main className="pt-32 pb-24 bg-vintage-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-4">Kontakt</h1>
                    <p className="text-vintage-muted text-lg max-w-xl mx-auto">Masz pytanie? Chętnie pomożemy. Napisz do nas, a odpowiemy w ciągu 24 godzin.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {[
                        { icon: <LuMail size={24} />, title: 'Email', info: 'kontakt@mapstory.pl', sub: 'Odpowiadamy w 24h' },
                        { icon: <LuMapPin size={24} />, title: 'Adres', info: 'Warszawa, Polska', sub: 'Produkcja lokalna' },
                        { icon: <LuClock size={24} />, title: 'Godziny', info: 'Pn-Pt 9:00–17:00', sub: 'Czas CET' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-vintage-border rounded-sm p-8 text-center shadow-sm">
                            <div className="w-12 h-12 bg-vintage-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-vintage-primary">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl text-vintage-text mb-2">{item.title}</h3>
                            <p className="text-vintage-text font-medium">{item.info}</p>
                            <p className="text-vintage-muted text-sm mt-1">{item.sub}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-vintage-border rounded-sm p-8 lg:p-12 shadow-soft max-w-2xl mx-auto">
                    <h2 className="font-serif text-2xl text-vintage-text mb-8 text-center">Napisz do nas</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-vintage-text mb-2">Imię</label>
                                <input type="text" className="w-full border border-vintage-border rounded-sm px-4 py-3 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary transition-all" placeholder="Jan" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-vintage-text mb-2">Email</label>
                                <input type="email" className="w-full border border-vintage-border rounded-sm px-4 py-3 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary transition-all" placeholder="jan@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-vintage-text mb-2">Temat</label>
                            <input type="text" className="w-full border border-vintage-border rounded-sm px-4 py-3 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary transition-all" placeholder="W czym możemy pomóc?" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-vintage-text mb-2">Wiadomość</label>
                            <textarea rows={5} className="w-full border border-vintage-border rounded-sm px-4 py-3 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary transition-all resize-none" placeholder="Twoja wiadomość..." />
                        </div>
                        <div className="text-center pt-2">
                            <Button variant="primary" size="lg" className="px-12">Wyślij wiadomość</Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
