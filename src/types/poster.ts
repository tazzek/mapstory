export type PosterSize = '30x40' | '40x50' | '50x70' | '70x100';
export type Material = 'poster' | 'canvas';
export type FrameStyle = 'none' | 'wood' | 'black' | 'white';

export type EditorTab = 'Lokalizacja' | 'Styl' | 'Tytuły' | 'Wydruk' | 'Dodatki';

export interface MarkerConfig {
    enabled: boolean;
    style: 'pin' | 'heart' | 'home';
    color: string;
}

export type MapStyle =
    | 'modern'
    | 'vintage'
    | 'noir'
    | 'scandi'
    | 'midnight'
    | 'forest'
    | 'ocean'
    | 'sunset';

export type MapMask = 'rectangle' | 'circle' | 'heart' | 'home';

export interface PosterConfig {
    location: string;
    lat: number;
    lng: number;
    title: string;
    subtitle: string;
    style: MapStyle;
    mask: MapMask;
    material: Material;
    frame: FrameStyle;
    size: PosterSize;
    orientation: 'portrait' | 'landscape';
    marker: MarkerConfig;
    showCoordinates: boolean;
    customCoordinates?: string;
    isDigital: boolean;
    fontFamily: 'serif' | 'sans' | 'handwritten';
    textAlign: 'left' | 'center' | 'right';
    subtitleMode: 'coordinates' | 'custom';
}
