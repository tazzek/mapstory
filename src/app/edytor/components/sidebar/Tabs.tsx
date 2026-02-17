'use client';

import React from 'react';
import { MapPin, Palette, Type, Frame, Sparkles, RefreshCw } from 'lucide-react';
import { EditorTab } from '@/types/poster';
import { usePosterStore } from '@/store/usePosterStore';

interface TabItem {
    id: EditorTab;
    label: string;
    icon: React.ReactNode;
}

const tabs: TabItem[] = [
    { id: 'Lokalizacja', label: 'Miejsce', icon: <MapPin /> },
    { id: 'Styl', label: 'Styl', icon: <Palette /> },
    { id: 'Typografia', label: 'Tekst', icon: <Type /> },
    { id: 'Wydruk', label: 'Wydruk', icon: <Frame /> },
    { id: 'Dodatki', label: 'Więcej', icon: <Sparkles /> },
];

function SidebarItem({ tab }: { tab: TabItem }) {
    const activeTab = usePosterStore((s) => s.activeTab);
    const visitedSteps = usePosterStore((s) => s.visitedSteps);
    const setActiveTab = usePosterStore((s) => s.setActiveTab);

    const isActive = activeTab === tab.id;
    const isVisited = visitedSteps.includes(tab.id);

    return (
        <div
            onClick={() => setActiveTab(tab.id)}
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300 ${isActive ? 'scale-105' : 'hover:scale-105'}`}
        >
            <div
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-sm ${isActive
                        ? 'bg-gradient-to-br from-vintage-primary to-vintage-primaryHover text-white border-vintage-primary shadow-lg shadow-vintage-primary/30'
                        : isVisited
                            ? 'bg-gradient-to-br from-vintage-warm to-white text-vintage-primary border-vintage-primary/30'
                            : 'bg-vintage-primary/10 border-transparent text-vintage-text/70 group-hover:bg-vintage-primary/20 group-hover:text-vintage-text'
                    }`}
            >
                {React.cloneElement(tab.icon as React.ReactElement<{ strokeWidth?: number; size?: number }>, { strokeWidth: 1.5, size: 18 })}
            </div>
            <span className={`text-[9px] mt-2 font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-vintage-primary' : 'text-vintage-muted/80 group-hover:text-vintage-text'
                }`}>
                {tab.label}
            </span>
        </div>
    );
}

export function NavigationRail() {
    return (
        <div className="flex flex-col items-center gap-5 py-4">
            {tabs.map((tab) => (
                <SidebarItem key={tab.id} tab={tab} />
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
