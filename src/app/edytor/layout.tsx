import Link from 'next/link';
import { ArrowLeft, MapPin, User, ShoppingBag } from 'lucide-react';

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* Compact white editor navbar */}
            <nav className="fixed w-full z-50 bg-white py-2 border-b border-vintage-border/50 shadow-sm">
                <div className="max-w-full mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-10">
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center text-vintage-muted hover:text-vintage-primary transition-colors gap-2 text-sm">
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline">Powrót</span>
                            </Link>
                            <div className="h-5 w-px bg-vintage-border"></div>
                            <Link href="/" className="flex items-center gap-2">
                                <div className="bg-vintage-primary text-white p-1 rounded">
                                    <MapPin size={16} strokeWidth={1.5} />
                                </div>
                                <span className="font-serif text-lg font-bold text-vintage-text">MapStory</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors p-1">
                                <User size={20} strokeWidth={1.5} />
                            </button>
                            <button className="text-vintage-text hover:text-vintage-primary transition-colors relative p-1">
                                <ShoppingBag size={20} strokeWidth={1.5} />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-vintage-primary rounded-full ring-2 ring-white"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}
