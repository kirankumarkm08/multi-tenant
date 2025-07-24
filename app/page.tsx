'use client';

import { PublicLayout } from '@/components/layouts/public-layout';
import { HeroSection } from '@/components/public/hero-section';
import { FeaturesSection } from '@/components/public/features-section';
import { StatsSection } from '@/components/public/stats-section';
import { CTASection } from '@/components/public/cta-section';

export default function Home() {
  return (
    <PublicLayout>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
    </PublicLayout>
  );
}