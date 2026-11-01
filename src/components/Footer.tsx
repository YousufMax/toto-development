'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { CinematicFooter } from '@/components/ui/motion-footer';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <CinematicFooter
      heading="Ready to grow your business with a trusted digital partner?"
      giantBackgroundText="TOTO"
      brandName="TOTO Development"
      copyrightText={`© ${new Date().getFullYear()} TOTO Development Group. All rights reserved.`}
      marqueeItems={[
        'Custom Software Development',
        'High-Performance Web Platforms',
        'Digital Marketing & Strategy',
        'Meta & Google Ads Management',
        'Video Editing & Motion Graphics',
        'Brand Visual Identity & 3D Packaging',
      ]}
      secondaryLinks={[
        { label: 'Services', href: '/services/' },
        { label: 'Projects', href: '/portfolio/' },
        { label: 'Pricing Plans', href: '/pricing/' },
        { label: 'About Company', href: '/about/' },
        { label: 'Contact', href: '/contact/' },
        { label: 'Privacy Policy', href: '/privacy/' },
        { label: 'Terms of Service', href: '/terms/' },
      ]}
    />
  );
};

export default Footer;
