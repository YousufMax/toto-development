import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — TOTO Development | Data Protection & Confidentiality',
  description:
    'Our commitment to enterprise data protection, mutual NDA standards, and transparent client privacy across all digital engagements.',
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
