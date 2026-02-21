import { MapStyle } from '@/types/poster';
import { themes } from '@/config/themes';

/**
 * Zwraca dedykowany URL schematu Mapbox bezpośrednio
 * ze standardu konfiguracji motywów (Theme System).
 */
export const getMapboxStyle = (style: string): string => {
    const activeTheme = themes[style as MapStyle];
    return activeTheme ? activeTheme.mapboxUrl : themes.vintage.mapboxUrl;
};
