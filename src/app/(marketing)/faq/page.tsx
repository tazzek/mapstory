import type { Metadata } from 'next';
import Link from 'next/link';
import { LuCircleHelp, LuChevronDown } from 'react-icons/lu';

export const metadata: Metadata = {
    title: 'Najczęściej zadawane pytania',
    description: 'Odpowiedzi na najczęściej zadawane pytania dotyczące MapStory — personalizowanych plakatów z mapami.',
};

const faqs = [
    { q: 'Jak długo trwa realizacja zamówienia?', a: 'Większość zamówień realizujemy w ciągu 2-3 dni roboczych. Wydruki premium mogą wymagać 5 dni roboczych.' },
    { q: 'Jakie formaty oferujecie?', a: 'Oferujemy trzy popularne formaty: 30×40 cm, 50×70 cm i 70×100 cm. Każdy dostępny jest w orientacji pionowej i poziomej.' },
    { q: 'Czy mogę zamówić tylko plik cyfrowy?', a: 'Tak! Oferujemy opcję pobrania pliku w wysokiej rozdzielczości (300 DPI, PDF/PNG) bez konieczności zamawiania wydruku.' },
    { q: 'Jaka jest polityka zwrotów?', a: 'Ponieważ każdy plakat jest unikalny i tworzony na zamówienie, zwroty są możliwe tylko w przypadku wad produkcyjnych. Skontaktuj się z nami, a rozwiążemy problem.' },
    { q: 'Czy wysyłacie za granicę?', a: 'Obecnie wysyłamy na terenie Polski. Wysyłka międzynarodowa jest w przygotowaniu.' },
];

export default function FAQPage() {
    return (
        <main className="pt-32 pb-24 bg-vintage-bg">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="w-12 h-12 bg-vintage-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LuCircleHelp size={24} className="text-vintage-primary" />
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-4">FAQ</h1>
                    <p className="text-vintage-muted text-lg">Najczęściej zadawane pytania o MapStory.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <details key={i} className="group bg-white border border-vintage-border rounded-sm shadow-sm">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-serif text-lg text-vintage-text hover:text-vintage-primary transition-colors">
                                {faq.q}
                                <LuChevronDown size={20} className="text-vintage-muted group-open:rotate-180 transition-transform duration-300 flex-shrink-0 ml-4" />
                            </summary>
                            <div className="px-6 pb-6 text-vintage-muted leading-relaxed border-t border-vintage-border/50 pt-4">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-vintage-muted">Nie znalazłeś odpowiedzi? <Link href="/kontakt" className="text-vintage-primary font-medium hover:underline">Napisz do nas</Link></p>
                </div>
            </div>
        </main>
    );
}
