import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — TOTO Development | Full-Service Digital Agency',
  description:
    'Founded on the conviction that digital solutions must directly compound commercial value. An integrated digital agency providing custom software, web platforms, marketing, ads, video reels, and brand design.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
