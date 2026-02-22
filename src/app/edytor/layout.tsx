import Link from 'next/link';
import { LuArrowLeft, LuMapPin, LuUser, LuShoppingBag } from 'react-icons/lu';

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
