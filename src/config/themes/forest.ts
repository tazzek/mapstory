import { ThemeConfig } from '@/types/theme';

export const forestTheme: ThemeConfig = {
    id: 'forest',
    label: 'Forest',
    badgeClass: 'bg-green-900 text-green-100',
    swatchColors: ['#2D6A4F', '#40916C', '#D8F3DC'],
    mapboxUrl: 'mapbox://styles/mapbox/satellite-streets-v12', // Placeholder
    layout: {
        paddingX: 'clamp(1rem, 6%, 3rem)',
        paddingY: 'clamp(1rem, 4.5%, 3rem)',
        mapBorder: '1px solid #1B4332',
        textPosition: 'split-bottom',
        canvasBackground: '#D8F3DC',
        textColor: '#1B4332',
        accentColor: '#40916C',
    }
};
