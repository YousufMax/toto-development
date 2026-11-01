import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services — TOTO Development | Custom Software, AI & Web Platforms',
  description:
    'Full-service technology and digital growth agency designing and building custom software, AI automations, IoT telemetry, and high-performance Next.js web platforms.',
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
