import { MapStyle } from './poster';

export type TextPosition =
    | 'overlay-bottom' // Tekst na mapie (obecny stan standardowy)
    | 'outside-bottom' // Tekst pod mapą na białym/kolorowym tle (passe-partout)
    | 'outside-top'    // Tekst nad mapą
    | 'boxed-bottom'   // Tekst w półprzezroczystej etykiecie/ramce (muzealnej)
    | 'split-bottom';  // Tytuł z lewej, podtytuł z prawej (w jednej linii)

export interface ThemeLayout {
    padding: string;          // Margines wokół mapy tworzący fizyczną ramkę, np. 'clamp(1rem, 8%, 3rem)'
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
