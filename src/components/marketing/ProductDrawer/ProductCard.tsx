import Image from 'next/image';
import Link from 'next/link';
import { LuChevronRight } from 'react-icons/lu';
import { ProductDrawerItem } from './productsData';
import { useProductDrawerStore } from '@/store/useProductDrawer';

interface ProductCardProps {
    product: ProductDrawerItem;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const { setActiveBg, closeDrawer } = useProductDrawerStore();

    return (
        <Link
            href={product.editorUrl}
            onClick={closeDrawer}
            onMouseEnter={() => setActiveBg(product.bgHoverClass)}
            className="group relative flex flex-col items-center justify-end h-[500px] min-w-[320px] max-w-[380px] w-full mx-4 mb-10 transition-transform duration-700 hover:-translate-y-4"
        >
            {/* The transparent map PNG */}
            <div className="absolute -top-10 inset-x-0 z-10 w-full h-[380px] transform transition-transform duration-700 group-hover:scale-105 group-hover:drop-shadow-2xl">
                <Image
                    src={product.imagePng}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                />
            </div>

            {/* Subdued presentation card behind the map */}
            <div className="w-full bg-white/90 backdrop-blur-md rounded-xl p-8 pt-32 shadow-xl border border-white/50 relative z-0 transition-all duration-700 group-hover:shadow-2xl group-hover:border-vintage-border">
                <div className="text-center flex flex-col items-center justify-end h-full">
                    <h3 className="font-serif text-3xl font-bold text-vintage-text mb-2 group-hover:text-vintage-primary transition-colors">
                        {product.title}
                    </h3>
                    <p className="font-sans text-xs tracking-widest uppercase font-medium text-vintage-muted mb-6 line-clamp-2 min-h-[32px]">
                        {product.description}
                    </p>

                    <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#1A1A1A] group-hover:text-vintage-primary transition-colors">
                        Wybierz <LuChevronRight size={16} className="transform transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </Link>
    );
};
