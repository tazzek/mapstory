'use client';

import { useState } from 'react';
import {
    LuChevronDown,
    LuShoppingBag,
    LuPalette,
    LuTruck,
    LuFileCode
} from 'react-icons/lu';

interface Question {
    q: string;
    a: string;
}

interface Category {
    id: string;
    name: string;
    icon: React.ReactNode;
    questions: Question[];
}

const categories: Category[] = [
    {
        id: 'orders',
        name: 'Zamówienia i Płatności',
        icon: <LuShoppingBag size={20} />,
        questions: [
            { q: 'Jak złożyć zamówienie?', a: 'To proste! Wybierz lokalizację w naszym edytorze, dostosuj styl, kolory i napisy, wybierz format, a następnie przejdź do koszyka. Cały proces zajmie Ci nie więcej niż 5 minut.' },
            { q: 'Jakie metody płatności są dostępne?', a: 'Obsługujemy bezpieczne płatności online: BLIK, szybkie przelewy oraz karty płatnicze. Proces płatności jest szyfrowany i realizowany przez certyfikowanych operatorów.' },
            { q: 'Czy otrzymam fakturę VAT?', a: 'Oczywiście. Fakturę w formie elektronicznej (PDF) wyślemy na Twój adres e-mail automatycznie po sfinalizowaniu zamówienia.' },
            { q: 'Czy mogę edytować zamówienie po jego złożeniu?', a: 'Ponieważ zamówienia trafiają do druku bardzo szybko, edycja jest możliwa tylko do momentu rozpoczęcia produkcji (zazwyczaj do 1-2 godzin od złożenia). W takim przypadku prosimy o pilny kontakt.' },
        ]
    },
    {
        id: 'product',
        name: 'Produkt i Jakość',
        icon: <LuPalette size={20} />,
        questions: [
            { q: 'Na jakim papierze drukujecie?', a: 'Używamy matowego papieru archiwalnego o gramaturze 200g/m². Zapewnia on głębię kolorów, brak odblasków i trwałość na dziesięciolecia.' },
            { q: 'Skąd pochodzą dane na mapach?', a: 'Korzystamy z najdokładniejszych danych OpenStreetMap Premium (OSM), które są aktualizowane co tydzień. Dzięki temu nawet najnowsze osiedla są widoczne na Twoim plakacie.' },
            { q: 'Co to jest technologia "Hillshading"?', a: 'To cyfrowa symulacja rzeźby terenu (cieniowanie wzgórz). Dzięki niej mapa zyskuje efekt "3D" i głębię, pokazując góry, doliny i ukształtowanie krajobrazu w artystyczny sposób.' },
            { q: 'Czy kolory na ekranie będą takie same jak na wydruku?', a: 'Staramy się, aby odwzorowanie barw było jak najwierniejsze. Należy jednak pamiętać, że każdy monitor ma inne ustawienia jasności i profil kolorystyczny.' },
        ]
    },
    {
        id: 'shipping',
        name: 'Wysyłka i Zwroty',
        icon: <LuTruck size={20} />,
        questions: [
            { q: 'Ile kosztuje dostawa?', a: 'Dostawa do Paczkomatów InPost to 15 zł, a przesyłka kurierska 20 zł. Przy zamówieniach powyżej 250 zł dostawa jest darmowa.' },
            { q: 'Jak długo będę czekać na plakat?', a: 'Wydruk i przygotowanie zajmuje nam zazwyczaj 2-3 dni robocze. Do tego należy doliczyć 1-2 dni na dostawę kurierem lub do paczkomatu.' },
            { q: 'Jak pakujecie plakaty?', a: 'Bezpieczeństwo to priorytet. Plakaty zwijamy w bibułę i umieszczamy w grubościennych, ekologicznych tubach tekturowych, które wytrzymają nawet najtrudniejszą podróż.' },
            { q: 'Czy mogę zwrócić spersonalizowany plakat?', a: 'Zgodnie z prawem konsumenckim, produkty tworzone na specjalne zamówienie (personalizowane) nie podlegają zwrotom bez podania przyczyny. Jeśli jednak plakat dotrze uszkodzony lub z błędem produkcyjnym — wymienimy go na nasz koszt.' },
        ]
    },
    {
        id: 'digital',
        name: 'Pliki Cyfrowe',
        icon: <LuFileCode size={20} />,
        questions: [
            { q: 'Co zawiera pakiet cyfrowy?', a: 'Otrzymasz plik PDF w formacie wektorowym (nieskończona skalowalność) oraz wysokiej rozdzielczości plik PNG (300 DPI) przygotowany pod konkretny format wydruku.' },
            { q: 'Kiedy otrzymam plik cyfrowy?', a: 'Link do pobrania plików cyfrowych otrzymasz automatycznie na e-mail natychmiast po zaksięgowaniu płatności — zazwyczaj dzieje się to w kilka sekund.' },
        ]
    }
];

export default function FAQContent() {
    const [openIndex, setOpenIndex] = useState<string | null>('orders-0');

    const toggleQuestion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-0">
            {/* Top Navigation - Optimized for width */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16 p-1.5 bg-white/60 backdrop-blur-md border border-vintage-border rounded-sm sticky top-24 z-20 shadow-sm overflow-x-auto no-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            const el = document.getElementById(cat.id);
                            if (el) {
                                const yOffset = -140;
                                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest text-vintage-text/70 hover:text-vintage-primary hover:bg-white rounded-sm transition-all group border border-transparent hover:border-vintage-primary/10 whitespace-nowrap"
                    >
                        <span className="text-vintage-muted group-hover:text-vintage-primary transition-colors">
                            {cat.icon}
                        </span>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Questions List - Grid System */}
            <div className="space-y-24">
                {categories.map((category) => (
                    <section key={category.id} id={category.id} className="scroll-mt-44">
                        <div className="flex items-center gap-4 mb-10 group">
                            <div className="w-12 h-12 bg-white shadow-card flex items-center justify-center rounded-sm text-vintage-primary border border-vintage-border/30 group-hover:border-vintage-primary/30 transition-colors">
                                {category.icon}
                            </div>
                            <div>
                                <h2 className="font-serif text-3xl font-bold text-vintage-text uppercase tracking-tight">{category.name}</h2>
                                <div className="h-0.5 w-10 bg-vintage-primary/40 group-hover:w-full transition-all duration-700 mt-1"></div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {category.questions.map((faq, i) => {
                                const id = `${category.id}-${i}`;
                                const isOpen = openIndex === id;

                                return (
                                    <div
                                        key={id}
                                        className={`group transition-all duration-500 rounded-sm border h-fit relative overflow-hidden ${isOpen
                                            ? 'bg-white border-vintage-primary/40 shadow-card ring-1 ring-vintage-primary/5'
                                            : 'bg-white/40 border-vintage-border hover:border-vintage-primary/30 hover:bg-white active:scale-[0.998]'
                                            }`}
                                    >
                                        <button
                                            onClick={() => toggleQuestion(id)}
                                            className={`w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer focus:outline-none transition-all ${isOpen ? 'pb-4' : ''}`}
                                        >
                                            <span className={`font-serif text-lg md:text-xl leading-snug transition-colors duration-300 ${isOpen ? 'text-vintage-primary font-bold' : 'text-vintage-text/90 group-hover:text-vintage-primary'}`}>
                                                {faq.q}
                                            </span>
                                            <div className={`flex-shrink-0 ml-6 transition-all duration-500 border rounded-full p-2 ${isOpen ? 'rotate-180 border-vintage-primary bg-vintage-primary text-white shadow-md' : 'rotate-0 border-vintage-border text-vintage-muted group-hover:border-vintage-primary group-hover:text-vintage-primary'}`}>
                                                <LuChevronDown size={16} />
                                            </div>
                                        </button>

                                        <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                            }`}>
                                            <div className="overflow-hidden">
                                                <div className="px-6 md:px-8 pb-8 pt-2 text-vintage-text/70 leading-relaxed font-light border-t border-vintage-border/5 mx-6 md:mx-8 mt-0">
                                                    <div className="flex gap-4">
                                                        <div className="w-1 bg-vintage-primary/10 rounded-full shrink-0"></div>
                                                        <p className="text-base md:text-lg">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {isOpen && <div className="absolute top-0 left-0 w-1 h-full bg-vintage-primary"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
