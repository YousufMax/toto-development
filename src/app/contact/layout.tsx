import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start a Discovery Sprint — TOTO Development | Direct Architect Access',
  description:
    'Direct dialogue with principal solutions architects. Fixed-scope roadmap and technical proposal delivered within 48 hours.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
