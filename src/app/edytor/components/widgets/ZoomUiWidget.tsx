import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { usePosterStore } from '@/store/usePosterStore';
import { useMapbox } from '@/hooks/useMapbox'; // We need access to map instance, but useMapbox creates a new one. 
// We should probably share the map instance via store or context.
// However, looking at the request, the user provided HTML structure.
// Let's implement the UI first. The logic "useMapbox" hook currently initializes a map. 
// To control the map from here, we need the map instance.
// Since we don't have a global map context yet, and refactoring to context might be out of scope,
// I will check if usePosterStore has map reference or if I should add it.
// Checking store... `usePosterStore` has `zoomLevel`. But request says "use map.zoomIn()".
// So we need the map instance. 
// A common pattern without context is to store the map instance in the store (non-reactive part) or use an event bus.
// Let's look at `useMapbox.ts` again.

// Actually, `usePosterStore` has `zoomIn`, `zoomOut` actions that update `zoomLevel` state.
// And `MapCanvas` uses `zoomLevel` to scale the div `transform: scale(...)`.
// BUT the user request says: "Zoomowanie ma wpływać na skalę mapy wewnątrz kontenera (renderowanie wektorowe), a nie powiększać sam element <div>".
// So the previous `zoomLevel` logic in `MapCanvas` needs to change to use Mapbox native zoom.
// And `ZoomUiWidget` needs to trigger map methods.

// Let's create a specialized hook or store slice for Mapbox instance if possible, 
// or simpler: just use a global event or window object for this specific request if architecture allows,
// OR better: use the store to trigger effects in MapCanvas.
// Let's add `zoomAction` to store: 'in' | 'out' | 'reset' | null.
// MapCanvas listens to this and calls map.zoomIn().
// This keeps clean separation.

// Let's simple start with the UI structure as requested.

export default function ZoomUiWidget() {
    // changing name to match file import in page.tsx if needed, but page.tsx imports `ZoomControl`.
    // detailed request says: "Oprogramowanie widgetu Zoomowania ... W projekcie znajduje się widget HTML".
    // I will replace `ZoomControl` content with this new logic.

    // We need a way to communicate with Mapbox instance in MapCanvas.
    // I will add an ephemeral action to the store or use a custom event.
    // Let's usage a custom event for simplicity and decoupling, or update store.
    // Updating store is "React way".

    const setZoomAction = usePosterStore((s) => s.setZoomAction); // Need to add this
    const zoomLevel = usePosterStore((s) => s.zoomLevel); // Just for display 100%

    return (
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-vintage-border/50 p-1.5">
            <button
                onClick={() => setZoomAction('out')}
                className="p-2.5 rounded-xl hover:bg-vintage-bg text-vintage-text transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ZoomOut size={18} />
            </button>

            <button className="px-3 py-1 text-xs font-bold text-vintage-muted hover:text-vintage-primary transition-colors min-w-[3rem] text-center">
                {Math.round(zoomLevel)}%
            </button>

            <button
                onClick={() => setZoomAction('in')}
                className="p-2.5 rounded-xl hover:bg-vintage-bg text-vintage-text transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ZoomIn size={18} />
            </button>

            <div className="w-px h-6 bg-vintage-border mx-1"></div>

            <button
                onClick={() => setZoomAction('reset')}
                className="p-2.5 rounded-xl hover:bg-vintage-bg text-vintage-muted transition-all"
                title="Reset"
            >
                <RotateCcw size={16} />
            </button>
        </div>
    );
}
