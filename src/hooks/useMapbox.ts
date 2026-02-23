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
    const currentStyleRef = useRef<string>(initialConfig.current.styleId);

    // Initialize Map
    useEffect(() => {
        const container = containerRef.current;
        console.info('[MapboxDebug] useEffect Init started');

        if (!container) {
            console.error('[MapboxDebug] Container ref is NULL');
            return;
        }

        const rect = container.getBoundingClientRect();
        console.info(`[MapboxDebug] Container dimensions: ${rect.width}x${rect.height}px`);
        console.info(`[MapboxDebug] Offset dimensions: ${container.offsetWidth}x${container.offsetHeight}px`);

        if (container.offsetWidth === 0 || container.offsetHeight === 0) {
            console.warn('[MapboxDebug] Container has ZERO dimensions. Map will not be visible!');
        }

        if (mapRef.current) {
            console.warn('[MapboxDebug] Map already exists, skipping re-init');
            return;
        }

        const token = getMapboxToken();
        console.info(`[MapboxDebug] Token present: ${!!token}`);
        if (!token) {
            console.error('[MapboxDebug] Mapbox Token NOT FOUND in lib/mapbox');
            return;
        }
        mapboxgl.accessToken = token;

        const activeTheme = themes[initialConfig.current.styleId] || themes.vintage;
        console.info(`[MapboxDebug] Loading style: ${initialConfig.current.styleId}, URL: ${activeTheme.mapboxUrl}`);

        try {
            const map = new mapboxgl.Map({
                container: container,
                style: activeTheme.mapboxUrl,
                center: [initialConfig.current.lng, initialConfig.current.lat],
                zoom: 12,
                preserveDrawingBuffer: true,
                attributionControl: false,
            });

            map.on('load', () => {
                console.info('[MapboxDebug] EVENT: map.on("load") triggered');
                setIsMapLoaded(true);
                map.resize(); // Wymuszamy przeliczenie po wczytaniu
            });

            map.on('error', (e) => {
                console.error('[MapboxDebug] EVENT: map.on("error"):', e.error);
            });

            map.on('styledata', () => {
                console.info('[MapboxDebug] EVENT: map.on("styledata") triggered');
            });

            map.on('moveend', () => {
                const center = map.getCenter();
                updateConfig({
                    lat: center.lat,
                    lng: center.lng,
                });
            });

            const resizeObserver = new ResizeObserver(() => {
                if (mapRef.current) {
                    console.info('[MapboxDebug] ResizeObserver triggered');
                    requestAnimationFrame(() => {
                        mapRef.current?.resize();
                    });
                }
            });
            resizeObserver.observe(container);

            mapRef.current = map;

        } catch (err) {
            console.error('[MapboxDebug] CRITICAL ERROR during map creation:', err);
        }

        return () => {
            console.info('[MapboxDebug] Cleanup map instance');
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [containerRef, updateConfig]);

    // Sync Style
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;
        if (currentStyleRef.current === styleId) return;

        console.info(`[MapboxDebug] Switching style to: ${styleId}`);
        const activeTheme = themes[styleId] || themes.vintage;

        try {
            setIsStyleChanging(true);
            currentStyleRef.current = styleId;
            mapRef.current.setStyle(activeTheme.mapboxUrl);

            mapRef.current.once('style.load', () => {
                console.info('[MapboxDebug] New style loaded successfully');
                setTimeout(() => {
                    setIsStyleChanging(false);
                }, 300);
            });

        } catch (e) {
            console.error('[MapboxDebug] Error switching style:', e);
            setIsStyleChanging(false);
        }
    }, [styleId, isMapLoaded]);

    // Sync Location
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;

        const currentCenter = mapRef.current.getCenter();
        const dist = Math.sqrt(
            Math.pow(currentCenter.lng - lng, 2) +
            Math.pow(currentCenter.lat - lat, 2)
        );

        if (dist > 0.0001) {
            console.info(`[MapboxDebug] Flying to new location: ${lat}, ${lng}`);
            mapRef.current.flyTo({
                center: [lng, lat],
                essential: true
            });
        }
    }, [lat, lng, isMapLoaded]);

    return { map: mapRef.current, isMapLoaded, isStyleChanging };
};
