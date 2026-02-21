import { ThemeConfig } from '@/types/theme';

export const vintageTheme: ThemeConfig = {
    id: 'vintage',
    label: 'Vintage',
    badgeClass: 'bg-amber-800 text-amber-100',
    swatchColors: ['#F0E6D2', '#D9C5B2', '#8C7355'],
    mapboxUrl: 'mapbox://styles/tazek/cmlshwd1e001501sa094fexn3', // Custom Vintage Style
    layout: {
        padding: 'clamp(1rem, 8%, 3rem)',
        mapBorder: '1px solid #D9C5B2',
        textPosition: 'outside-bottom',
        canvasBackground: '#F0E6D2',
        textColor: '#8C7355',
        accentColor: '#D9C5B2',
    }
};
