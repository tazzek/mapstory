import { MapStyle } from './poster';

export type TextPosition =
    | 'overlay-bottom' // Tekst na mapie (obecny stan standardowy)
    | 'outside-bottom' // Tekst pod mapą na białym/kolorowym tle (passe-partout)
    | 'outside-top'    // Tekst nad mapą
    | 'boxed-bottom'   // Tekst w półprzezroczystej etykiecie/ramce (muzealnej)
    | 'split-bottom';  // Tytuł z lewej, podtytuł z prawej (w jednej linii)

export interface ThemeLayout {
    paddingX: string;         // Margines w poziomie (odnosi się do szerokości okna)
    paddingY: string;         // Margines w pionie (odnosi się do wysokości okna - wartość % powinna być optycznie skompensowana do 3:4)
    mapBorder: string | null; // Opcjonalna ramka na samym brzegu zdjęcia/mapy np. '2px solid #000'
    textPosition: TextPosition;
    canvasBackground: string; // Kolor tła pliku (imitacja papieru/skóry)
    textColor: string;        // Tusz bazowy
    accentColor: string;      // Tusz zdobień (kreski dzielące, małe gwiazdy)
}

export interface ThemeConfig {
    id: MapStyle;
    label: string;
    badgeClass: string;       // Klasa odznaki z napisem stylu wyświetlana na rogu edytora
    swatchColors: string[];   // Paleta barw do kontrolki "StyleTab" w bocznym menu
    mapboxUrl: string;        // URL serwera map (np. vintage, dark, mtv-light)
    layout: ThemeLayout;
}
