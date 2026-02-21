'use client';

import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export const ProductPageCTA = () => {
    return (
        <Link href="/edytor" className="block">
            <Button
                variant="dark"
                fullWidth
                size="lg"
                icon={<ArrowRight size={20} />}
            >
                Zaprojektuj ten plakat
            </Button>
        </Link>
    );
};
