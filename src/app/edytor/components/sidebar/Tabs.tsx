import React from 'react';
import { Check } from 'lucide-react';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    step?: number;
    active?: boolean;
    completed?: boolean;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon,
    label,
    step,
    active,
    completed,
    onClick
}) => (
    <div className="relative pl-3 pr-0 mt-0 mb-[1.1rem]">
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-4 px-4 py-4 transition-all duration-300 group relative
        ${active
                    ? 'bg-white text-vintage-text rounded-l-xl z-30 -mr-[1px] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                    : 'bg-transparent hover:bg-white/20 rounded-l-lg'
                }
      `}
        >
            <div className="relative">
                <div className={`flex-shrink-0 w-[35px] h-[35px] rounded-full flex items-center justify-center transition-all duration-300 border-2
          ${active
                        ? 'bg-vintage-primary border-vintage-primary text-white shadow-md'
                        : 'bg-vintage-primary/10 border-transparent text-vintage-text/70 group-hover:bg-vintage-primary/20 group-hover:text-vintage-text'
                    }`}
                >
                    {React.cloneElement(icon as React.ReactElement<{ strokeWidth?: number; size?: number }>, { strokeWidth: 1.5, size: 18 })}
                </div>
            </div>

            <div className="flex flex-col items-start flex-1 text-left pl-1">
                {step && (
                    <span className={`text-[9px] uppercase tracking-[1.5px] font-bold mb-0.5 transition-colors ${active ? 'text-vintage-primary' : 'text-vintage-text/60 group-hover:text-vintage-text'}`}>
                        Krok {step}
                    </span>
                )}

                <span className={`font-serif text-[14px] tracking-tight transition-all leading-tight ${active ? 'text-black font-bold' : 'text-vintage-text/80 font-bold group-hover:text-vintage-text'}`}>
                    {label}
                </span>
            </div>

            {completed && (
                <div className="absolute top-4 right-6 text-vintage-primary animate-fade-in">
                    <Check size={14} strokeWidth={3} />
                </div>
            )}

            {active && (
                <div className="absolute -right-[1px] top-0 bottom-0 w-3 bg-white z-40"></div>
            )}
        </button>
    </div>
);

export default SidebarItem;
