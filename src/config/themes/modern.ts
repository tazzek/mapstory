import { ThemeConfig } from '@/types/theme';

export const modernTheme: ThemeConfig = {
    id: 'modern',
    label: 'Modern',
    badgeClass: 'bg-gray-800 text-white',
    swatchColors: ['#FFFFFF', '#EEEEEE', '#333333'],
    mapboxUrl: 'mapbox://styles/mapbox/light-v11', // Placeholder
    layout: {
        paddingX: 'clamp(1rem, 6%, 3rem)',
        paddingY: 'clamp(1rem, 4.5%, 3rem)',
        mapBorder: null,
        textPosition: 'outside-top',
        canvasBackground: '#FFFFFF',
        textColor: '#1a1a1a',
        accentColor: '#333333',
    }
};
