import { MapStyle } from '@/types/poster';

export const MAPBOX_STYLES: Record<MapStyle | 'minimal', string> = {
    modern: 'mapbox://styles/mapbox/light-v11', // Placeholder
    vintage: 'mapbox://styles/mapbox/streets-v12', // Placeholder
    noir: 'mapbox://styles/mapbox/dark-v11', // Placeholder
    scandi: 'mapbox://styles/mapbox/outdoors-v12', // Placeholder
    midnight: 'mapbox://styles/mapbox/navigation-night-v1', // Placeholder
    forest: 'mapbox://styles/mapbox/satellite-streets-v12', // Placeholder
    ocean: 'mapbox://styles/mapbox/satellite-v9', // Placeholder
    sunset: 'mapbox://styles/mapbox/navigation-day-v1', // Placeholder
    minimal: 'mapbox://styles/mapbox/light-v10', // Placeholder for removed 'minimal' style if needed for backward compat, though type removed
};

// Fallback for types that might not match perfectly if we removed 'minimal' from MapStyle
export const getMapboxStyle = (style: string): string => {
    return MAPBOX_STYLES[style as MapStyle] || MAPBOX_STYLES.vintage;
};
