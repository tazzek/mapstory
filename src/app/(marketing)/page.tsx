import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';
import TopRated from '@/components/marketing/TopRated';
import DetailedFeatures from '@/components/marketing/DetailedFeatures';
import StyleShowcase from '@/components/marketing/StyleShowcase';
import CallToAction from '@/components/marketing/CallToAction';

export default function HomePage() {
    return (
        <main>
            <Hero />
            <Features />
            <TopRated />
            <DetailedFeatures />
            <StyleShowcase />
            <CallToAction />
        </main>
    );
}
