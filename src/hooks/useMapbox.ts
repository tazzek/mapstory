import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { getMapboxToken } from '@/lib/mapbox';
// Zmienione na nowy system motywów:
import { themes } from '@/config/themes';
import { usePosterStore } from '@/store/usePosterStore';

export const useMapbox = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    // NOWOŚĆ: Stan informujący o zmianie stylu
    const [isStyleChanging, setIsStyleChanging] = useState(false);

    // OPTYMALIZACJA 1: Wyciągamy tylko to, co potrzebne, żeby uniknąć re-renderów przy wpisywaniu tekstu!
    const styleId = usePosterStore((s) => s.config.style);
    const lat = usePosterStore((s) => s.config.lat);
    const lng = usePosterStore((s) => s.config.lng);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    // Zamrażamy stan początkowy, aby Eslint nie kazał nam dodawać ich do dependencji w useEffect
    const initialConfig = useRef({ styleId, lat, lng });

    // Initialize Map
    useEffect(() => {
        const container = containerRef.current;
        if (!container || mapRef.current) return;

        // OPTYMALIZACJA 2: Bezpieczne dla Next.js (SSR). Token przypisujemy dopiero w przeglądarce.
        const token = getMapboxToken();
        if (!token) {
            console.error('Mapbox Token not found');
            return;
        }
        mapboxgl.accessToken = token;

        // Pobieramy adres URL stylu z naszej nowej architektury
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

        // OPTYMALIZACJA: Debounce dla ResizeObservera. 
        // Zapobiega "duszeniu" WebGL podczas płynnej animacji paddingu w CSS.
        let resizeTimeout: NodeJS.Timeout;
        const resizeObserver = new ResizeObserver(() => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (mapRef.current) mapRef.current.resize();
            }, 50); // Czeka 50ms od ostatniej zmiany rozmiaru zanim przeliczy canvas
        });
        resizeObserver.observe(container);

        mapRef.current = map;

        // OPTYMALIZACJA 3: Używamy lokalnej zmiennej 'container' do czyszczenia
        return () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeObserver.disconnect();
            map.remove();
            mapRef.current = null;
        };
    }, [containerRef, updateConfig]);

    // Sync Style
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;

        const activeTheme = themes[styleId] || themes.vintage;

        try {
            setIsStyleChanging(true); // Zaczynamy zmianę stylu!
            mapRef.current.setStyle(activeTheme.mapboxUrl);

            // Nasłuchujemy aż Mapbox wgra nowy styl. 
            // Używamy .once aby event wywołał się tylko jeden raz na zmianę.
            mapRef.current.once('style.load', () => {
                // Dajemy dodatkowe 300ms, aby kafle zdążyły się wyrenderować 
                // i CSS transition na containerze zdążyło się uspokoić.
                setTimeout(() => {
                    setIsStyleChanging(false);
                }, 300);
            });

        } catch (e) {
            console.error('Error switching style:', e);
            setIsStyleChanging(false);
        }
    }, [styleId, isMapLoaded]);

    // Sync Location (FlyTo) if changed externally
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

    // Zwracamy nowy stan!
    return { map: mapRef.current, isMapLoaded, isStyleChanging };
};
