import { ThemeConfig } from '@/types/theme';

export const oceanTheme: ThemeConfig = {
    id: 'ocean',
    label: 'Ocean',
    badgeClass: 'bg-sky-900 text-sky-100',
    swatchColors: ['#003049', '#669BBC', '#FDF0D5'],
    mapboxUrl: 'mapbox://styles/mapbox/satellite-v9', // Placeholder
    layout: {
        padding: '0',
        mapBorder: '4px solid rgba(255,255,255,0.2)',
        textPosition: 'boxed-bottom', // Etykieta dryfująca nad oceanem (wariant pro-tip)
        canvasBackground: '#FDF0D5',
        textColor: '#003049',
        accentColor: '#669BBC',
    }
};
