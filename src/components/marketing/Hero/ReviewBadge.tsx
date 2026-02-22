import Image from 'next/image';
import { LuStar } from 'react-icons/lu';

export const ReviewBadge = () => (
    <div className="flex flex-wrap gap-4 items-center">
        <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-vintage-border">
            <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-vintage-secondary border-2 border-white overflow-hidden">
                        <Image src={`https://picsum.photos/50/50?random=${i}`} alt="User" width={24} height={24} className="object-cover opacity-80" />
                    </div>
                ))}
            </div>
            <span className="text-xs font-bold text-vintage-text tracking-wide uppercase">5000+ Opinii</span>
        </div>
        <div className="flex items-center text-vintage-primary">
            <LuStar size={14} fill="currentColor" />
            <LuStar size={14} fill="currentColor" />
            <LuStar size={14} fill="currentColor" />
            <LuStar size={14} fill="currentColor" />
            <LuStar size={14} fill="currentColor" />
        </div>
    </div>
);
