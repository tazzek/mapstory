import { ThemeConfig } from '@/types/theme';

export const noirTheme: ThemeConfig = {
    id: 'noir',
    label: 'Noir',
    badgeClass: 'bg-yellow-600 text-black',
    swatchColors: ['#111111', '#222222', '#D4AF37'],
    mapboxUrl: 'mapbox://styles/mapbox/dark-v11', // Placeholder
    layout: {
        padding: 'clamp(1rem, 6%, 3rem)',
        mapBorder: '2px solid #D4AF37',
        textPosition: 'outside-bottom',
        canvasBackground: '#0f0f0f',
        textColor: '#D4AF37',
        accentColor: '#333333',
    }
};
