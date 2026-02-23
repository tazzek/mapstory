'use client';

import React from 'react';
import Link from 'next/link';
import { LuGift, LuArrowRight, LuHeart, LuHouse, LuBaby, LuUsers, LuChevronDown } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface GiftMegaMenuTriggerProps {
    isOpen: boolean;
    onOpen: () => void;
}

export default function GiftMegaMenu({ isOpen, onOpen }: GiftMegaMenuTriggerProps) {
    return (
        <div
            className="h-full flex items-center"
            onMouseEnter={onOpen}
        >
            <Link
                href="/prezenty"
                className={cn(
                    "flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors uppercase py-4 relative group",
                    isOpen ? "text-vintage-primary" : "text-vintage-text hover:text-vintage-primary"
                )}
            >
                <LuGift size={14} className="mb-[2px] opacity-80" />
                Na prezent
                <LuChevronDown size={14} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
                <span className={cn("absolute bottom-3 left-0 w-full h-[1px] bg-current origin-bottom-right transform transition-transform duration-300 scale-x-0 group-hover:origin-bottom-left", isOpen ? "scale-x-100" : "group-hover:scale-x-100")} />
            </Link>
        </div>
    );
}
