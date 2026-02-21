import { ThemeConfig } from '@/types/theme';

export const sunsetTheme: ThemeConfig = {
    id: 'sunset',
    label: 'Sunset',
    badgeClass: 'bg-red-900 text-red-100',
    swatchColors: ['#BC4749', '#F2E8CF', '#386641'],
    mapboxUrl: 'mapbox://styles/mapbox/navigation-day-v1', // Placeholder
    layout: {
        paddingX: 'clamp(1rem, 6%, 3rem)',
        paddingY: 'clamp(1rem, 4.5%, 3rem)',
        mapBorder: null,
        textPosition: 'outside-bottom',
        canvasBackground: '#F2E8CF',
        textColor: '#BC4749',
        accentColor: '#386641',
    }
};
