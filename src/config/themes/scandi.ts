import { ThemeConfig } from '@/types/theme';

export const scandiTheme: ThemeConfig = {
    id: 'scandi',
    label: 'Scandi',
    badgeClass: 'bg-slate-700 text-white',
    swatchColors: ['#FFFFFF', '#E8E8E8', '#2C3E50'],
    mapboxUrl: 'mapbox://styles/mapbox/outdoors-v12', // Placeholder
    layout: {
        paddingX: 'clamp(1rem, 6%, 3rem)',
        paddingY: 'clamp(1rem, 10%, 4rem)',
        mapBorder: '1px solid #E8E8E8',
        textPosition: 'outside-top',
        canvasBackground: '#F8F8F6',
        textColor: '#2C3E50',
        accentColor: '#B0B0B0',
    }
};
