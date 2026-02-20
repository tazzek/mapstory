'use client';

import Link from 'next/link';
import React from 'react';
import { MapPin, Palette, Type, Frame, Sparkles, RefreshCw, ArrowLeft } from 'lucide-react';
import { EditorTab } from '@/types/poster';
import { usePosterStore } from '@/store/usePosterStore';

interface TabItem {
    id: EditorTab;
    label: string;
    icon: React.ReactNode;
    step: number;
}

const tabs: TabItem[] = [
    { id: 'Lokalizacja', label: 'Lokalizacja', icon: <MapPin />, step: 1 },
    { id: 'Styl', label: 'Styl', icon: <Palette />, step: 2 },
    { id: 'Tytuły', label: 'Tytuły', icon: <Type />, step: 3 },
    { id: 'Wydruk', label: 'Wydruk', icon: <Frame />, step: 4 },
    { id: 'Dodatki', label: 'Dodatki', icon: <Sparkles />, step: 5 },
];

function StepItem({ tab }: { tab: TabItem }) {
    const activeTab = usePosterStore((s) => s.activeTab);
    const visitedSteps = usePosterStore((s) => s.visitedSteps);
    const setActiveTab = usePosterStore((s) => s.setActiveTab);

    const isActive = activeTab === tab.id;
    const isVisited = visitedSteps.includes(tab.id) && !isActive;

    return (
        <div
            onClick={() => setActiveTab(tab.id)}
            className={`group flex transition-all duration-300 cursor-pointer select-none focus:outline-none focus:ring-0
                flex-row items-center gap-4 pl-[15px] pt-4 pb-4 pr-0 mb-2
                tablet:flex-col tablet:justify-center tablet:gap-0 tablet:px-0 tablet:py-4 tablet:mb-0
                ml-4 rounded-l-2xl tablet:mx-auto tablet:w-[84px] tablet:rounded-xl
                mobile:flex-col mobile:justify-center mobile:gap-1 mobile:py-2 mobile:mx-1 mobile:flex-1 mobile:px-0 mobile:mb-0
                ${isActive
                    ? 'bg-white shadow-[0_0_12px_rgba(0,0,0,0.03)] z-10 mobile:bg-transparent mobile:shadow-none mobile:border-none'
                    : 'hover:bg-black/5 bg-transparent mobile:hover:bg-transparent'
                }`}
        >
            <div
                className={`w-9 h-9 tablet:w-11 tablet:h-11 mobile:w-8 mobile:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isActive
                    ? 'bg-[#A88B5E] text-white shadow-sm mobile:ring-[3px] mobile:ring-[#A88B5E]/30 mobile:ring-offset-2 mobile:ring-offset-[#EBE9E4]'
                    : 'bg-black/5 text-[#1A1A1A]/40 group-hover:bg-[#A88B5E]/10 group-hover:text-[#A88B5E]'
                    }`}
            >
                {React.cloneElement(tab.icon as React.ReactElement<{ strokeWidth?: number; size?: number; className?: string }>, { strokeWidth: 1.5, size: 20, className: "tablet:scale-125 mobile:scale-100 transition-transform" })}
            </div>
            <div className="flex-1 min-w-0 tablet:flex-none tablet:w-full tablet:mt-[6px] mobile:flex-none mobile:w-full mobile:mt-0.5">
                <div
                    className={`nav-step-label text-[9px] font-bold uppercase tracking-[0.2em] tablet:hidden mobile:hidden ${isActive ? 'text-[#A88B5E]' : 'text-[#8A7E6E]'}`}
                >
                    Krok {tab.step}
                </div>
                <div className={`font-serif text-base leading-none tablet:text-center tablet:text-[10px] mobile:text-center mobile:text-[9.5px] tablet:font-sans tablet:tracking-wider tablet:uppercase mobile:font-sans mobile:tracking-wide mobile:uppercase ${isActive ? 'text-[#1A1A1A] font-bold tablet:text-vintage-primary mobile:text-vintage-primary' : 'text-[#5A5A5A] font-medium group-hover:text-[#1A1A1A]'
                    }`}>
                    {tab.label}
                </div>
            </div>
        </div>
    );
}

export function NavigationRail() {
    return (
        <div className="flex flex-col mobile:flex-row h-full relative">
            {/* Logo & Back Button Section */}
            <div
                className="px-6 relative flex items-center justify-center border-b border-vintage-border/10 mobile:hidden tablet:px-2 tablet:flex-row tablet:gap-1.5"
                style={{
                    paddingTop: 'calc(var(--spacing) * 4)',
                    paddingBottom: 'calc(var(--spacing) * 4)'
                }}
            >
                <Link
                    href="/"
                    className="absolute left-6 text-vintage-muted hover:text-vintage-primary transition-all tablet:static"
                    title="Powrót"
                >
                    <ArrowLeft size={16} />
                </Link>

                <Link href="/" className="flex items-center group tablet:flex-row">
                    <div className="bg-vintage-text text-white p-1 rounded mr-2 transition-all duration-300 group-hover:rotate-12 tablet:hidden">
                        <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-serif text-lg font-bold tracking-tight text-vintage-text tablet:text-[11px] tablet:font-sans tablet:uppercase tablet:tracking-wider tablet:mt-px">
                        MapStory
                    </span>
                </Link>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col mobile:flex-row flex-1 mobile:justify-around gap-1 py-6 tablet:py-4 mobile:py-0 mobile:items-center">
                {tabs.map((tab) => (
                    <StepItem key={tab.id} tab={tab} />
                ))}
            </div>
        </div>
    );
}

export function SecondaryPanelHeader() {
    const activeTab = usePosterStore((s) => s.activeTab);
    const resetSection = usePosterStore((s) => s.resetSection);

    return (
        <div
            className="flex justify-between items-center"
            style={{ marginBottom: 'calc(var(--spacing) * 2)' }}
        >
            <h2 className="font-serif text-xl font-bold text-vintage-text tracking-tight">{activeTab}</h2>
            <button
                onClick={() => resetSection(activeTab)}
                className="p-2 rounded-xl hover:bg-vintage-warm text-vintage-muted hover:text-vintage-primary transition-all"
                title="Resetuj sekcję"
            >
                <RefreshCw size={16} />
            </button>
        </div>
    );
}

export { tabs };
