'use client';

import { LuArrowRight } from 'react-icons/lu';
import Button from '@/components/ui/Button';
import { useProductDrawerStore } from '@/store/useProductDrawer';

export const CallToActionCTA = () => {
    const { openDrawer } = useProductDrawerStore();

    return (
        <Button
            variant="dark"
            size="lg"
            className="px-10 py-4 text-base shadow-xl border-none"
            icon={<LuArrowRight size={20} />}
            onClick={openDrawer}
        >
            Zacznij Tworzyć
        </Button>
    );
};
