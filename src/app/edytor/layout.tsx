import Link from 'next/link';
import { ArrowLeft, MapPin, User, ShoppingBag } from 'lucide-react';

export default function EditorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
