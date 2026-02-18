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
            className={`group nav-step-item flex items-center gap-4 ml-4 rounded-l-2xl cursor-pointer transition-all duration-300 ${isActive
                ? 'bg-white shadow-[-4px_0_12px_rgba(0,0,0,0.03)] z-10'
                : 'hover:bg-black/5'
                }`}
        >
            <div
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${isActive
                    ? 'bg-[#A88B5E] text-white shadow-sm'
                    : 'bg-black/5 text-[#1A1A1A]/40 group-hover:bg-[#A88B5E]/10 group-hover:text-[#A88B5E]'
                    }`}
            >
                {React.cloneElement(tab.icon as React.ReactElement<{ strokeWidth?: number; size?: number }>, { strokeWidth: 1.5, size: 18 })}
            </div>
            <div className="flex-1 min-w-0">
                <div
                    className={`nav-step-label text-[9px] font-bold uppercase tracking-[0.2em] ${isActive ? 'text-[#A88B5E]' : 'text-[#8A7E6E]'}`}
                >
                    Krok {tab.step}
                </div>
                <div className={`font-serif text-base leading-none ${isActive ? 'text-[#1A1A1A] font-bold' : 'text-[#5A5A5A] font-medium group-hover:text-[#1A1A1A]'
                    }`}>
                    {tab.label}
                </div>
            </div>
        </div>
    );
}

export function NavigationRail() {
    return (
        <div className="flex flex-col h-full relative">
            {/* Logo & Back Button Section */}
            <div
                className="px-6 relative flex items-center justify-center border-b border-vintage-border/10"
                style={{
                    paddingTop: 'calc(var(--spacing) * 4)',
                    paddingBottom: 'calc(var(--spacing) * 4)'
                }}
            >
                <Link
                    href="/"
                    className="absolute left-6 text-vintage-muted hover:text-vintage-primary transition-all"
                    title="Powrót"
                >
                    <ArrowLeft size={20} />
                </Link>

                <Link href="/" className="flex items-center group">
                    <div className="bg-vintage-text text-white p-1 rounded mr-2 transition-all duration-300 group-hover:rotate-12">
                        <MapPin size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-serif text-lg font-bold tracking-tight text-vintage-text">
                        MapStory
                    </span>
                </Link>
            </div>

            {/* Steps Section */}
            <div className="flex flex-col gap-1 py-6">
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
