import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transparent Pricing — TOTO Development | Predictable Investment Plans',
  description:
    'Predictable, fixed-scope investment tiers engineered for ambitious brands — from Digital Launch Suite to full Enterprise Architecture with 60-day warranty.',
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
