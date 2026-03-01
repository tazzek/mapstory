'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Symulacja wysyłki
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <div className="bg-white border border-vintage-primary/20 rounded-sm p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-vintage-primary/10 text-vintage-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-serif text-2xl text-vintage-text mb-2">Wiadomość wysłana!</h3>
                <p className="text-vintage-muted mb-8">Dziękujemy za kontakt. Odpowiemy tak szybko, jak to możliwe.</p>
                <Button variant="outline" onClick={() => setStatus('idle')}>Wyślij nową wiadomość</Button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-vintage-border rounded-sm shadow-card p-8 md:p-12 relative overflow-hidden group">
            {/* Dekoracja w rogu */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-vintage-primary/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-vintage-primary/10 transition-colors"></div>

            <h2 className="font-serif text-2xl md:text-3xl text-vintage-text mb-8 relative">Napisz do nas</h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-vintage-text/60 ml-1">Twoje Imię</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-vintage-bg/30 border border-vintage-border rounded-sm px-5 py-4 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary focus:bg-white transition-all placeholder:text-vintage-muted/40"
                            placeholder="Jan Kowalski"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-vintage-text/60 ml-1">Adres Email</label>
                        <input
                            required
                            type="email"
                            className="w-full bg-vintage-bg/30 border border-vintage-border rounded-sm px-5 py-4 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary focus:bg-white transition-all placeholder:text-vintage-muted/40"
                            placeholder="jan@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-vintage-text/60 ml-1">Temat rozmowy</label>
                    <input
                        required
                        type="text"
                        className="w-full bg-vintage-bg/30 border border-vintage-border rounded-sm px-5 py-4 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary focus:bg-white transition-all placeholder:text-vintage-muted/40"
                        placeholder="W czym możemy pomóc?"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-vintage-text/60 ml-1">Wiadomość</label>
                    <textarea
                        required
                        rows={5}
                        className="w-full bg-vintage-bg/30 border border-vintage-border rounded-sm px-5 py-4 text-vintage-text focus:outline-none focus:ring-1 focus:ring-vintage-primary focus:border-vintage-primary focus:bg-white transition-all resize-none placeholder:text-vintage-muted/40"
                        placeholder="Opisz swoją sprawę..."
                    />
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full md:w-auto px-12 py-4 shadow-lg active:scale-[0.98] transition-transform"
                        disabled={status === 'sending'}
                    >
                        {status === 'sending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
