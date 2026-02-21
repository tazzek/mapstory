import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { getMapboxToken } from '@/lib/mapbox';
import { themes } from '@/config/themes';
import { usePosterStore } from '@/store/usePosterStore';

export const useMapbox = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [isStyleChanging, setIsStyleChanging] = useState(false);

    const styleId = usePosterStore((s) => s.config.style);
    const lat = usePosterStore((s) => s.config.lat);
    const lng = usePosterStore((s) => s.config.lng);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    const initialConfig = useRef({ styleId, lat, lng });

    // NOWOŚĆ: Strażnik zapobiegający wieszaniu się loadera na start
    const currentStyleRef = useRef<string>(initialConfig.current.styleId);

    // Initialize Map
    useEffect(() => {
        const container = containerRef.current;
        if (!container || mapRef.current) return;

        const token = getMapboxToken();
        if (!token) {
            console.error('Mapbox Token not found');
            return;
        }
        mapboxgl.accessToken = token;

        const activeTheme = themes[initialConfig.current.styleId] || themes.vintage;

        const map = new mapboxgl.Map({
            container: container,
            style: activeTheme.mapboxUrl,
            center: [initialConfig.current.lng, initialConfig.current.lat],
            zoom: 12,
            preserveDrawingBuffer: true,
            attributionControl: false,
        });

        map.on('load', () => setIsMapLoaded(true));

        map.on('moveend', () => {
            const center = map.getCenter();
            updateConfig({
                lat: center.lat,
                lng: center.lng,
            });
        });

        // POPRAWKA: Super płynny observer oparty na klatkach przeglądarki, brak opóźnienia
        const resizeObserver = new ResizeObserver(() => {
            if (mapRef.current) {
                requestAnimationFrame(() => {
                    mapRef.current?.resize();
                });
            }
        });
        resizeObserver.observe(container);

        mapRef.current = map;

        return () => {
            resizeObserver.disconnect();
            map.remove();
            mapRef.current = null;
        };
    }, [containerRef, updateConfig]);

    // Sync Style
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;

        // POPRAWKA: Przerywamy, jeśli styl jest już nałożony - to naprawia zawieszony loader!
        if (currentStyleRef.current === styleId) return;

        const activeTheme = themes[styleId] || themes.vintage;

        try {
            setIsStyleChanging(true);
            currentStyleRef.current = styleId; // Aktualizujemy strażnika
            mapRef.current.setStyle(activeTheme.mapboxUrl);

            mapRef.current.once('style.load', () => {
                setTimeout(() => {
                    setIsStyleChanging(false);
                }, 300);
            });

        } catch (e) {
            console.error('Error switching style:', e);
            setIsStyleChanging(false);
        }
    }, [styleId, isMapLoaded]);

    // Sync Location (FlyTo)
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;

        const currentCenter = mapRef.current.getCenter();
        const dist = Math.sqrt(
            Math.pow(currentCenter.lng - lng, 2) +
            Math.pow(currentCenter.lat - lat, 2)
        );

        if (dist > 0.0001) {
            mapRef.current.flyTo({
                center: [lng, lat],
                essential: true
            });
        }
    }, [lat, lng, isMapLoaded]);

    return { map: mapRef.current, isMapLoaded, isStyleChanging };
};
