import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { getMapboxToken } from '@/lib/mapbox';
import { getMapboxStyle } from '@/config/mapbox-styles';
import { usePosterStore } from '@/store/usePosterStore';

mapboxgl.accessToken = getMapboxToken();

export const useMapbox = (containerRef: React.RefObject<HTMLDivElement | null>) => {
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const config = usePosterStore((s) => s.config);
    const updateConfig = usePosterStore((s) => s.updateConfig);

    // Initialize Map
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        // Default Token check
        if (!mapboxgl.accessToken) {
            console.error('Mapbox Token not found');
            return;
        }

        const map = new mapboxgl.Map({
            container: containerRef.current,
            style: getMapboxStyle(config.style),
            center: [config.lng, config.lat],
            zoom: 12, // Default zoom if not strictly in store yet
            preserveDrawingBuffer: true, // Needed for screenshot/export
            attributionControl: false,
        });

        map.on('load', () => {
            setIsMapLoaded(true);
        });

        // Update store on move end
        map.on('moveend', () => {
            const center = map.getCenter();
            updateConfig({
                lat: center.lat,
                lng: center.lng,
                // zoom: map.getZoom() // We might want to sync zoom too
            });
        });

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, [containerRef]); // Run once on mount/container ref

    // Sync Style
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;
        const styleUrl = getMapboxStyle(config.style);

        // Debug
        // console.log('Switching style to:', styleUrl);

        try {
            // Check if style is really different to avoid reload?
            // Mapbox doesn't expose "current style URL" easily after load.
            // But we can store the last loaded style in a ref.
            // For now, let's just set it. Mapbox GL JS handles this reasonably well.
            mapRef.current.setStyle(styleUrl);
        } catch (e) {
            console.error('Error switching style:', e);
        }
    }, [config.style, isMapLoaded]);

    // Sync Location (FlyTo) if changed externally (e.g. search)
    useEffect(() => {
        if (!mapRef.current || !isMapLoaded) return;
        const currentCenter = mapRef.current.getCenter();
        // Only fly if distance is significant to avoid loop with moveend
        const dist = Math.sqrt(
            Math.pow(currentCenter.lng - config.lng, 2) +
            Math.pow(currentCenter.lat - config.lat, 2)
        );

        if (dist > 0.0001) {
            mapRef.current.flyTo({
                center: [config.lng, config.lat],
                essential: true
            });
        }
    }, [config.lat, config.lng, isMapLoaded]);

    return { map: mapRef.current, isMapLoaded };
};
