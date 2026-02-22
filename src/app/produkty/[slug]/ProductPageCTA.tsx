'use client';

import { LuArrowRight } from 'react-icons/lu';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export const ProductPageCTA = () => {
    return (
        <Link href="/edytor" className="block">
            <Button
                variant="dark"
                fullWidth
                size="lg"
                icon={<LuArrowRight size={20} />}
            >
                Zaprojektuj ten plakat
            </Button>
        </Link>
    );
};
