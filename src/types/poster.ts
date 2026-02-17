export type PosterSize = '30x40' | '50x70' | '70x100';

export type MapStyle = 'modern' | 'vintage' | 'noir' | 'scandi';

export interface MarkerConfig {
    enabled: boolean;
    style: 'pin' | 'heart' | 'home';
    color: string;
}

export interface PosterConfig {
    location: string;
    lat: number;
    lng: number;
    title: string;
    subtitle: string;
    style: MapStyle;
    size: PosterSize;
    orientation: 'portrait' | 'landscape';
    marker: MarkerConfig;
    showCoordinates: boolean;
    customCoordinates?: string;
    isDigital: boolean;
}

export interface NavItem {
    label: string;
    href: string;
    isActive?: boolean;
}

export type EditorTab = 'Lokalizacja' | 'Styl' | 'Typografia' | 'Wydruk' | 'Dodatki';
