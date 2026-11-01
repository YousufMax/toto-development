import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — TOTO Development | Engagement & IP Terms',
  description:
    'Commercial engagement terms, 100% intellectual property ownership transfer, sprint milestones, and SLA warranties governing TOTO Development services.',
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
