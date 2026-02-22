import type { Metadata } from 'next';
import { LuFileText } from 'react-icons/lu';

export const metadata: Metadata = {
    title: 'Regulamin',
    description: 'Regulamin sklepu MapStory — warunki sprzedaży i korzystania z usług.',
};

export default function RegulaminPage() {
    return (
        <main className="pt-32 pb-24 bg-vintage-bg">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="w-12 h-12 bg-vintage-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LuFileText size={24} className="text-vintage-primary" />
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-vintage-text mb-4">Regulamin</h1>
                    <p className="text-vintage-muted">Ostatnia aktualizacja: Luty 2026</p>
                </div>

                <div className="bg-white border border-vintage-border rounded-sm p-8 lg:p-12 shadow-sm prose prose-vintage max-w-none">
                    <h2 className="font-serif text-2xl text-vintage-text mb-4">§1 Postanowienia ogólne</h2>
                    <p className="text-vintage-muted leading-relaxed mb-6">
                        Sklep internetowy MapStory prowadzi sprzedaż personalizowanych plakatów z mapami oraz produktów pokrewnych.
                        Niniejszy regulamin określa zasady korzystania ze sklepu, składania zamówień i realizacji usług.
                    </p>

                    <h2 className="font-serif text-2xl text-vintage-text mb-4">§2 Zamówienia</h2>
                    <p className="text-vintage-muted leading-relaxed mb-6">
                        Zamówienia są realizowane wyłącznie za pośrednictwem strony internetowej.
                        Każdy plakat jest tworzony na indywidualne zamówienie, co oznacza że jest produktem spersonalizowanym.
                    </p>

                    <h2 className="font-serif text-2xl text-vintage-text mb-4">§3 Ceny i płatności</h2>
                    <p className="text-vintage-muted leading-relaxed mb-6">
                        Wszystkie ceny podane w sklepie są cenami brutto (zawierają VAT).
                        Akceptujemy płatności kartą, BLIK, oraz przelewem bankowym.
                    </p>

                    <h2 className="font-serif text-2xl text-vintage-text mb-4">§4 Dostawa</h2>
                    <p className="text-vintage-muted leading-relaxed mb-6">
                        Standardowy czas realizacji wynosi 2-5 dni roboczych.
                        Przesyłki realizowane są za pośrednictwem InPost oraz kuriera DPD.
                    </p>

                    <h2 className="font-serif text-2xl text-vintage-text mb-4">§5 Reklamacje i zwroty</h2>
                    <p className="text-vintage-muted leading-relaxed">
                        Ze względu na indywidualny charakter produktu, zwroty są możliwe wyłącznie w przypadku wad produkcyjnych.
                        Reklamacje prosimy zgłaszać drogą mailową na adres kontakt@mapstory.pl.
                    </p>
                </div>
            </div>
        </main>
    );
}
