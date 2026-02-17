import React from 'react';
import { Share2, Eye } from 'lucide-react';

interface ShareActionProps {
    showRoomView: boolean;
    onToggleRoomView: () => void;
}

export default function ShareAction({ showRoomView, onToggleRoomView }: ShareActionProps) {
    return (
        <div className="absolute top-10 right-10 z-30 flex items-center gap-4 animate-fade-in-up">
            <button title="Udostępnij projekt" className="w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-vintage-text hover:text-vintage-primary transition-all duration-300 hover:scale-110 border border-white/60 group">
                <Share2 size={22} className="group-hover:-rotate-12 transition-transform" />
            </button>

            <button
                title="Zobacz we wnętrzu"
                onClick={onToggleRoomView}
                className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 ${showRoomView ? 'bg-vintage-primary border-vintage-primary text-white' : 'bg-white border-white text-vintage-text hover:text-vintage-primary'}`}
            >
                <Eye size={24} />
            </button>
        </div>
    );
}
