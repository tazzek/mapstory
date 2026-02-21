import { ThemeConfig } from '@/types/theme';

export const midnightTheme: ThemeConfig = {
    id: 'midnight',
    label: 'Midnight',
    badgeClass: 'bg-blue-900 text-cyan-400',
    swatchColors: ['#0B132B', '#1C2541', '#5BC0BE'],
    mapboxUrl: 'mapbox://styles/mapbox/navigation-night-v1', // Placeholder
    layout: {
        padding: '0',
        mapBorder: null,
        textPosition: 'overlay-bottom',
        canvasBackground: '#0B132B',
        textColor: '#5BC0BE',
        accentColor: '#1C2541',
    }
};
