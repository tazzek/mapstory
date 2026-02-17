'use client';

import React from 'react';
import { MapPin, Palette, Type, Frame, Sparkles, RefreshCw, Check } from 'lucide-react';
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
    { id: 'Typografia', label: 'Typografia', icon: <Type />, step: 3 },
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
            className={`group flex items-center gap-4 px-5 py-5 cursor-pointer transition-all duration-300 mx-4 rounded-xl ${isActive
                    ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] scale-105 z-10'
                    : 'hover:bg-black/5'
                }`}
        >
            <div
                className={`relative w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 flex-shrink-0 ${isActive
                        ? 'bg-[#A88B5E] text-white border-[#A88B5E]'
                        : isVisited
                            ? 'bg-transparent text-[#A88B5E] border-[#A88B5E] border'
                            : 'bg-transparent text-[#1A1A1A]/40 border-[#1A1A1A]/20 border group-hover:border-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/60'
                    }`}
            >
                {React.cloneElement(tab.icon as React.ReactElement<{ strokeWidth?: number; size?: number }>, { strokeWidth: 1.5, size: 20 })}
            </div>
            <div className="flex-1 min-w-0">
                <div className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5 ${isActive ? 'text-[#A88B5E]' : 'text-[#8A7E6E]'
                    }`}>
                    Krok {tab.step}
                </div>
                <div className={`font-serif text-lg leading-none ${isActive ? 'text-[#1A1A1A] font-bold' : 'text-[#5A5A5A] font-medium group-hover:text-[#1A1A1A]'
                    }`}>
                    {tab.label}
                </div>
            </div>
            {isVisited && (
                <Check size={18} className="text-[#A88B5E] flex-shrink-0" strokeWidth={2.5} />
            )}
        </div>
    );
}

export function NavigationRail() {
    return (
        <div className="flex flex-col gap-2 py-8">
            {tabs.map((tab) => (
                <StepItem key={tab.id} tab={tab} />
            ))}
        </div>
    );
}

export function SecondaryPanelHeader() {
    const activeTab = usePosterStore((s) => s.activeTab);
    const resetSection = usePosterStore((s) => s.resetSection);

    return (
        <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl text-vintage-text tracking-tight">{activeTab}</h2>
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
