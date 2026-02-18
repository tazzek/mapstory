'use client';

import { Search, Sparkles, MapPin, Crop } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';

import { getMapboxToken } from '@/lib/mapbox';
import dynamic from 'next/dynamic';

const SearchBox = dynamic(
    () => import('@mapbox/search-js-react').then((mod) => mod.SearchBox),
    { ssr: false }
);

export default function LocationTab() {
    const config = usePosterStore((s) => s.config);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-vintage-muted uppercase tracking-[0.25em]">Wyszukaj Miejsce</label>
                <div className="relative z-50">
                    <SearchBox
                        accessToken={getMapboxToken()}
                        options={{
                            language: 'pl',
                            types: 'place,locality,address',
                        }}
                        onRetrieve={(res) => {
                            const feature = res.features[0] as any;
                            const [lng, lat] = feature.geometry.coordinates;
                            const placeName = feature.properties?.name_preferred || feature.properties?.name || feature.text;
                            const fullAddress = feature.properties?.full_address || feature.place_name;

                            updateConfig({
                                lat,
                                lng,
                                title: placeName?.toUpperCase(),
                                location: fullAddress,
                                subtitle: `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`
                            });
                        }}
                        theme={{
                            variables: {
                                fontFamily: 'var(--font-sans)',
                                unit: '14px',
                                padding: '0.8em',
                                borderRadius: '12px',
                                boxShadow: 'none',
                            }
                        }}
                        value={config.location}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        className="text-[11px] text-vintage-primary hover:text-vintage-primaryHover font-bold transition-colors flex items-center gap-2 self-start uppercase tracking-wider"
                        onClick={() => {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition((pos) => {
                                    updateConfig({
                                        lat: pos.coords.latitude,
                                        lng: pos.coords.longitude,
                                        location: 'Twoja lokalizacja',
                                        title: 'MOJA LOKALIZACJA'
                                    });
                                });
                            }
                        }}
                    >
                        <MapPin size={12} /> Użyj mojej lokalizacji
                    </button>
                </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-vintage-border/40 space-y-3 shadow-soft">
                <div className="flex items-center gap-3 text-vintage-primary">
                    <div className="p-2 bg-vintage-warm/30 rounded-lg">
                        <Crop size={18} />
                    </div>
                    <span className="font-bold text-sm tracking-tight text-vintage-text">Instrukcja kadrowania</span>
                </div>
                <p className="text-xs text-vintage-muted leading-relaxed">
                    Chwyć mapę i przesuwaj, aby znaleźć idealny kadr. Użyj scrolla, aby przybliżyć widok ulicy lub oddalić na widok kraju.
                </p>
            </div>
        </div>
    );
}
