export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

if (!MAPBOX_ACCESS_TOKEN) {
    console.warn('Missing NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN');
}

export const getMapboxToken = () => MAPBOX_ACCESS_TOKEN;
