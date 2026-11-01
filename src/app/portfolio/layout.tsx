import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies — TOTO Development | Proven Client Impact',
  description:
    'Explore our portfolio of high-concurrency platforms, real-time IoT fleet telemetry, and voice AI demo engines built for global industry leaders.',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
