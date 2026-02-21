export interface ProductDrawerItem {
    id: string;
    title: string;
    description: string;
    imagePng: string;
    bgHoverClass: string;
    editorUrl: string;
}

export const PRODUCTS_DATA: ProductDrawerItem[] = [
    {
        id: 'streetmap',
        title: 'StreetMap',
        description: 'Klasyczny układ ulic i budynków w skandynawskim stylu.',
        imagePng: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80', // Replace with transparent mockup PNG later
        bgHoverClass: 'bg-[#F2EFE9] text-vintage-text', // Warm vintage color
        editorUrl: '/edytor',
    },
    {
        id: 'celestialcity',
        title: 'CelestialCity',
        description: 'Układ gwiazd połączony ze zarysem Twojego miasta. Niezapomniana noc.',
        imagePng: 'https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&q=80',
        bgHoverClass: 'bg-[#121420] text-white', // Deep dark blue / night sky
        editorUrl: '/edytor',
    },
    {
        id: 'topoart',
        title: 'TopoArt',
        description: 'Imponująca, topograficzna rzeźba terenu 3D z użyciem cieniowania.',
        imagePng: 'https://images.unsplash.com/photo-1519681393798-3828fb4090bb?auto=format&fit=crop&q=80',
        bgHoverClass: 'bg-[#3A4E38] text-[#DCE6DA]', // Forest/Topo green
        editorUrl: '/edytor',
    },
    {
        id: 'love-story',
        title: 'LoveStory',
        description: 'Miejsca, które Was połączyły spięte linią na minimalistycznej mapie.',
        imagePng: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80',
        bgHoverClass: 'bg-[#FDF0F3] text-[#7A3E4D]', // Light romantic pinkish
        editorUrl: '/edytor',
    },
    {
        id: 'activepath',
        title: 'ActivePath',
        description: 'Ślad GPX z Twojego wyczynu sportowego zintegrowany z terenem.',
        imagePng: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80',
        bgHoverClass: 'bg-[#2B2D42] text-[#EDF2F4]', // Sporty dark tone
        editorUrl: '/edytor',
    },
    {
        id: 'luna-antique',
        title: 'Luna Antique',
        description: 'Plakat fazy księżyca w estetyce starożytnego pergaminu.',
        imagePng: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80',
        bgHoverClass: 'bg-[#C19A6B] text-[#2C1D11]', // Antique gold/brown
        editorUrl: '/edytor',
    },
    {
        id: 'artisan-sketch',
        title: 'Artisan Sketch',
        description: 'Ręcznie rysowany plan architektoniczny i blueprinty.',
        imagePng: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&q=80',
        bgHoverClass: 'bg-[#3C5A81] text-[#E0E7EE]', // Blueprint blue
        editorUrl: '/edytor',
    },
];
