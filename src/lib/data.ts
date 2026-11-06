export interface ServiceItem {
  id: string;
  number: string;
  categoryTag: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  tags: string[];
  category: 'development' | 'marketing' | 'creative' | 'engineering' | 'ai' | 'cloud' | 'growth' | 'all';
  features?: string[];
  deliverables?: string[];
  metrics?: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  number?: string;
  title: string;
  tagline: string;
  category: 'web' | 'software' | 'marketing' | 'ads' | 'video' | 'design' | 'ai' | 'brand' | 'cloud' | 'all';
  categoryLabel: string;
  description: string;
  highlights?: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  clientName?: string;
  region?: string;
  industry?: string;
  accentColor?: string;
  image?: string;
  liveUrl?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  subtitle?: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  period: string;
  description: string;
  featured?: boolean;
  badge?: string;
  highlightBadge?: string;
  savingsText?: string;
  ctaText: string;
  ctaLink: string;
  features: { name: string; included: boolean }[];
  timeline?: string;
  idealFor: string;
  delivery?: string;
  supportDuration?: string;
  revisionPolicy?: string;
  deliverableSummary?: string;
  category?: 'landing' | 'business-website' | 'ecommerce' | 'multivendor' | 'software' | 'marketing';
}

export interface MetricItem {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  highlightTag?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  projectHighlight?: string;
}

export const SITE_CONFIG = {
  name: 'TOTO Development',
  shortName: 'toto',
  brandSuffix: 'development',
  tagline: 'Integrated Digital Agency • Software, Web, Marketing & Creative Design',
  description:
    'We engineer custom software, high-speed web platforms, performance marketing campaigns, commercial video reels, and brand design systems for ambitious businesses.',
  url: 'https://totodevelopment.com',
  accentColor: '#00FC43',
  contactEmail: 'hello@totodevelopment.com',
  contactPhone: '+880 1410-003423',
  calendlyUrl: 'https://calendly.com/yousuf91013/30min',
  offices: [
    {
      city: 'Khulna (Headquarters)',
      region: 'Central Agency Headquarters & Production Studio',
      address: '256 Upper Road, Mou Market 3rd Floor, Sonadanga, Khulna - 9000, Bangladesh',
    },
  ],
  navLinks: [
    { name: 'About', href: '/about/' },
    { name: 'Services', href: '/services/' },
    { name: 'Portfolio', href: '/portfolio/' },
    { name: 'Pricing', href: '/pricing/' },
    { name: 'Contact', href: '/contact/' },
  ],
  clientLogos: [
    { name: 'Edvibe', tag: 'EdTech' },
    { name: 'HOLAGO', tag: 'Travel Tech' },
    { name: 'POC Academy', tag: 'Global Education' },
    { name: 'Urgent Fuel', tag: 'Energy Logistics' },
    { name: 'SEAQUA', tag: 'B2B Logistics' },
    { name: 'Tunibibi', tag: 'Creator Commerce' },
    { name: 'BestElectronics', tag: 'Retail Enterprise' },
    { name: 'OnNow', tag: 'Restaurant Tech' },
  ],
};

export const GLOBAL_METRICS: MetricItem[] = [
  {
    value: '500+',
    numericValue: 500,
    suffix: '+',
    label: 'Production Deliveries',
    sublabel: 'Software, Web & Creative Pods',
    highlightTag: 'Track Record',
  },
  {
    value: '50+',
    numericValue: 50,
    suffix: '+',
    label: 'International Markets',
    sublabel: 'Active Clients: BD, US, UK, UAE',
    highlightTag: 'Global Reach',
  },
  {
    value: '3.4×',
    numericValue: 3.4,
    suffix: '×',
    label: 'Average Client ROI',
    sublabel: 'Conversion-Engineered Platforms',
    highlightTag: 'Direct Impact',
  },
  {
    value: '98%',
    numericValue: 98,
    suffix: '%',
    label: 'On-Time Milestone Rate',
    sublabel: 'Zero Deployment Lag & Clean Code',
    highlightTag: 'Sprint Velocity',
  },
];

export const TECH_BENCHMARK_METRICS: MetricItem[] = [
  {
    value: '<200ms',
    numericValue: 185,
    prefix: '<',
    suffix: 'ms',
    label: 'Average Page Latency',
    sublabel: 'Sub-Second Edge Architecture',
    highlightTag: 'Edge Speed',
  },
  {
    value: '99.9%',
    numericValue: 99.9,
    suffix: '%',
    label: 'Cloud System Uptime',
    sublabel: 'High-Availability Infrastructure',
    highlightTag: 'Reliability',
  },
  {
    value: '5.2×',
    numericValue: 5.2,
    suffix: '×',
    label: 'Average Campaign ROAS',
    sublabel: 'Data-Driven Meta & Google Targeting',
    highlightTag: 'Growth Engine',
  },
  {
    value: '100%',
    numericValue: 100,
    suffix: '%',
    label: 'Source Code Ownership',
    sublabel: 'Zero Vendor Lock-In & Total Freedom',
    highlightTag: 'Engineering Integrity',
  },
];

export const SERVICES_PAGE_METRICS: MetricItem[] = [
  {
    value: '500+',
    numericValue: 500,
    suffix: '+',
    label: 'Production Deliveries',
    sublabel: 'Software, Web & Creative Pods',
    highlightTag: 'Track Record',
  },
  {
    value: '5.2×',
    numericValue: 5.2,
    suffix: '×',
    label: 'Average ROAS',
    sublabel: 'Generated across Meta & Google advertising campaigns',
    highlightTag: 'Measurable ROI',
  },
  {
    value: '99.4%',
    numericValue: 99.4,
    suffix: '%',
    label: 'Client Retention',
    sublabel: 'On-time milestone delivery and dedicated post-launch support',
    highlightTag: 'Client Satisfaction',
  },
  {
    value: '6',
    numericValue: 6,
    suffix: '',
    label: 'Core Verticals',
    sublabel: 'Software, Web, Marketing, Ads, Video & Brand Design',
    highlightTag: 'Full-Service Agency',
  },
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'custom-software',
    number: '01',
    categoryTag: 'CORE ENGINEERING',
    category: 'development',
    title: 'Custom Software Development',
    shortDesc:
      'Purpose-built digital solutions tailored to your operational workflows. We develop scalable management software, centralized ERPs, inventory engines, and automated backend systems.',
    fullDesc:
      'From complex business management platforms to distributed database architectures, our engineering team constructs bespoke digital platforms that scale alongside your operations.',
    tags: ['Custom ERP & CRM', 'Business Automation', 'Inventory Engines', 'PostgreSQL / Node.js'],
    features: [
      'Tailored business logic & automated daily workflows',
      'High-throughput REST and GraphQL endpoints',
      'Secure role-based access control (RBAC) & audit logging',
      'Centralized reporting, invoices, and analytics dashboards',
    ],
    deliverables: ['Production code repository', 'System architecture blueprint', 'Automated deployment pipelines', 'Comprehensive user documentation'],
    metrics: [
      { label: 'Operational Speed', value: '3.5×' },
      { label: 'Architecture Uptime', value: '99.99%' },
    ],
  },
  {
    id: 'web-development',
    number: '02',
    categoryTag: 'DIGITAL EXPERIENCE',
    category: 'development',
    title: 'Website Development',
    shortDesc:
      'Sub-second, conversion-engineered digital flagships and modern e-commerce storefronts. We fuse architectural speed, fluid GSAP micro-interactions, and conversion design.',
    fullDesc:
      'A slow website costs revenue. We build lightweight, statically pre-rendered Next.js flagships with fluid GSAP micro-interactions that captivate buyers and dominate search rankings.',
    tags: ['Next.js & React', 'High-Conversion UX', 'Sub-200ms Checkout', 'GSAP Animation'],
    features: [
      'Sub-second first contentful paint (LCP < 0.8s)',
      'Fluid GSAP dynamic scroll choreography',
      'Modern responsive layouts across all mobile and desktop devices',
      'Conversion-rate-optimized checkout pipelines',
    ],
    deliverables: ['Fully responsive production website', 'Lighthouse 98+ score audit', 'SEO schema metadata configuration', 'Motion interaction library'],
    metrics: [
      { label: 'Page Speed Score', value: '99/100' },
      { label: 'Conversion Lift', value: '+42%' },
    ],
  },
  {
    id: 'digital-marketing',
    number: '03',
    categoryTag: 'INBOUND & ACQUISITION',
    category: 'marketing',
    title: 'Digital Marketing & Content Strategy',
    shortDesc:
      'Strategic marketing solutions designed to strengthen brand authority. We connect your business with relevant audiences through targeted campaigns, engaging content, and data-informed distribution.',
    fullDesc:
      'An end-to-end inbound growth infrastructure combining search engine dominance (SEO), strategic social content calendars, omni-channel distribution, and automated customer qualification funnels.',
    tags: ['Content Strategy', 'Technical SEO', 'Omni-Channel Distribution', 'Audience Analytics'],
    features: [
      'Strategic multi-channel content roadmap',
      'Technical SEO audit & high-intent keyword ranking',
      'Social media distribution & engagement funnels',
      'Data-driven analytics dashboard & competitor tracking',
    ],
    deliverables: ['Monthly content strategy blueprint', 'Keyword ranking roadmap', 'Cross-platform copy library', 'Bi-weekly performance report'],
    metrics: [
      { label: 'Audience Reach', value: '+380%' },
      { label: 'Engagement Rate', value: '8.4%' },
    ],
  },
  {
    id: 'paid-ads',
    number: '04',
    categoryTag: 'PERFORMANCE MEDIA',
    category: 'marketing',
    title: 'Meta & Google Ads Management',
    shortDesc:
      'Less guesswork, smarter acquisition. Data-driven media buying, algorithmic targeting, high-converting ad creative testing, and relentless optimization that cut acquisition costs.',
    fullDesc:
      'Stop burning budget on unoptimized ads. We build high-ROAS acquisition funnels across Meta (Facebook & Instagram) and Google Ads (Search, YouTube, Performance Max) designed to maximize qualified inbound inquiries.',
    tags: ['Meta Ads (FB & IG)', 'Google Performance Max', 'Conversion API (CAPI)', 'Creative Testing'],
    features: [
      'Advanced audience segmentation & lookalike models',
      'High-converting ad creative variations & copywriting',
      'Server-side Conversion API (CAPI) & Pixel tracking',
      'Daily bid optimization & retargeting workflows',
    ],
    deliverables: ['Full campaign architecture setup', 'Ad creative variant assets', 'Real-time ROAS cockpit', 'Weekly optimization reports'],
    metrics: [
      { label: 'Average ROAS', value: '5.2×' },
      { label: 'CPA Reduction', value: '-48%' },
    ],
  },
  {
    id: 'video-motion',
    number: '05',
    categoryTag: 'CREATIVE MEDIA',
    category: 'creative',
    title: 'Video Editing & Motion Graphics',
    shortDesc:
      'Make your brand impossible to ignore. Engaging video content, viral short-form reels, 3D animated CGI product teasers, and commercial-grade editing built for high retention and social conversion.',
    fullDesc:
      'Video is the currency of modern attention. We produce scroll-stopping short-form reels, brand commercials, and dynamic motion graphics that capture immediate attention and convert viewers into loyal customers.',
    tags: ['Short-Form Reels', 'Motion Graphics', '3D CGI Commercials', 'Sound Design'],
    features: [
      'Dynamic pacing & retention-engineered storytelling',
      'Custom 3D kinetic typography & motion accents',
      'Cinematic color grading & professional sound design',
      'Vertical 9:16 and widescreen 16:9 multi-platform masters',
    ],
    deliverables: ['4K master video exports', 'Platform-specific aspect ratios', 'Custom audio mix & subtitle track', 'Raw footage archive'],
    metrics: [
      { label: 'Video Retention', value: '82%' },
      { label: 'Total Impressions', value: '12M+' },
    ],
  },
  {
    id: 'brand-design',
    number: '06',
    categoryTag: 'BRAND ARCHITECTURE',
    category: 'creative',
    title: 'Graphic Design & 3D Packaging',
    shortDesc:
      'Look different, stay memorable. Distinctive visual identities, commercial advertising creatives, and photorealistic 3D FMCG packaging renders that captivate retail buyers.',
    fullDesc:
      'Command premium pricing with a brand identity that exudes world-class authority. We craft cohesive visual vocabularies, typography scales, interactive design tokens, and photorealistic 3D commercial renders.',
    tags: ['Brand Identity Systems', '3D Packaging & CGI', 'Figma Design Tokens', 'Editorial Typography'],
    features: [
      'Comprehensive design system in Figma',
      'Photorealistic 3D packaging renders & retail mockups',
      'Editorial typography & chromatic palette rules',
      'Print-ready vector packaging production files',
    ],
    deliverables: ['Master Figma UI kit', '3D photorealistic packaging renders', 'Brand style guidelines PDF', 'Print-ready packaging files'],
    metrics: [
      { label: 'Brand Recognition Lift', value: '+260%' },
      { label: 'Design Consistency', value: '100%' },
    ],
  },
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'toto-elite-mart',
    categoryLabel: 'E-COMMERCE',
    category: 'web',
    title: 'TOTO Elite Mart',
    tagline: 'More Than a Store. A Smarter Business.',
    description: 'A modern e-commerce platform built for seamless shopping and smarter operations.',
    highlights: ['Order Tracking', 'Inventory Control', 'Sales Analytics'],
    tags: ['React', 'TypeScript', 'PostgreSQL'],
    metrics: [
      { label: 'Checkout Speed', value: '<200ms' },
      { label: 'Uptime', value: '99.9%' },
      { label: 'Conversion Lift', value: '+42%' },
    ],
    clientName: 'TOTO Elite Mart',
    region: 'Global',
    industry: 'Retail & E-Commerce',
    accentColor: '#00FC43',
    image: '/portfolio-3d/3d-5.png',
  },
  {
    id: 'business-management-system',
    categoryLabel: 'CUSTOM SOFTWARE',
    category: 'software',
    title: 'Business Management System',
    tagline: 'Run Your Business. Not the Paperwork.',
    description: 'A centralized system to manage daily operations and track business performance.',
    highlights: ['Sales Management', 'Expense Tracking', 'Role Control'],
    tags: ['React', 'TypeScript', 'PostgreSQL'],
    metrics: [
      { label: 'Operational Speed', value: '3.5×' },
      { label: 'Data Accuracy', value: '100%' },
      { label: 'Time Saved', value: '25 hrs/wk' },
    ],
    clientName: 'TOTO Enterprise Systems',
    region: 'Global',
    industry: 'Enterprise Management',
    accentColor: '#00FC43',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'digital-growth-campaign',
    categoryLabel: 'DIGITAL MARKETING',
    category: 'marketing',
    title: 'Digital Growth Campaign',
    tagline: 'Get Seen by the Right Audience.',
    description: 'Strategic content and social media marketing designed to strengthen brand presence.',
    highlights: ['Content Strategy', 'Social Media', 'Analytics'],
    tags: ['Content Strategy', 'Social Media', 'Analytics'],
    metrics: [
      { label: 'Audience Reach', value: '+380%' },
      { label: 'Engagement Rate', value: '8.4%' },
      { label: 'Inbound Inquiries', value: '4.2×' },
    ],
    clientName: 'Growth Partners International',
    region: 'Global',
    industry: 'Digital Marketing & Growth',
    accentColor: '#00FC43',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'paid-advertising-campaign',
    categoryLabel: 'META & GOOGLE ADS',
    category: 'ads',
    title: 'Paid Advertising Campaign',
    tagline: 'Less Guesswork. Smarter Ad Campaigns.',
    description: 'Targeted advertising built to reach relevant audiences and generate opportunities.',
    highlights: ['Audience Targeting', 'Ad Creatives', 'Optimization'],
    tags: ['Meta Ads', 'Google Ads'],
    metrics: [
      { label: 'Average ROAS', value: '5.2×' },
      { label: 'Cost Per Acquisition', value: '-48%' },
      { label: 'Qualified Leads', value: '+290%' },
    ],
    clientName: 'Performance Ads Network',
    region: 'Global',
    industry: 'Paid Media & Acquisition',
    accentColor: '#00FC43',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'motion-content-production',
    categoryLabel: 'VIDEO & MOTION',
    category: 'video',
    title: 'Motion Content Production',
    tagline: 'Make Your Brand Impossible to Ignore.',
    description: 'Engaging video content designed to capture attention and communicate your message.',
    highlights: ['Video Editing', 'Motion Graphics', 'Reels'],
    tags: ['Video Editing', 'Motion Graphics', 'Reels'],
    metrics: [
      { label: 'Video Retention', value: '82%' },
      { label: 'Total Impressions', value: '12M+' },
      { label: 'Click-Through Rate', value: '6.8%' },
    ],
    clientName: 'Motion Visual Studio',
    region: 'Global',
    industry: 'Creative Media & Production',
    accentColor: '#00FC43',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'brand-visual-identity',
    categoryLabel: 'GRAPHIC DESIGN',
    category: 'design',
    title: 'Brand Visual Identity',
    tagline: 'Look Different. Stay Memorable.',
    description: 'Distinctive visuals that help your brand stand out across digital platforms.',
    highlights: ['Brand Identity', 'Social Media Designs', 'Ad Creatives'],
    tags: ['Brand Identity', 'Social Media Designs', 'Ad Creatives'],
    metrics: [
      { label: 'Brand Recognition', value: '+260%' },
      { label: 'Assets Delivered', value: '150+' },
      { label: 'Design Consistency', value: '100%' },
    ],
    clientName: 'Visual Identity Group',
    region: 'Global',
    industry: 'Brand Architecture & Design',
    accentColor: '#00FC43',
    image: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: '3d-packaging-commercial-cgi',
    categoryLabel: '3D PACKAGING & CGI',
    category: 'design',
    title: '3D Packaging & Commercial CGI Showcase',
    tagline: 'Hyper-Realistic Product Visuals & High-Impact Ads.',
    description:
      'Commercial 3D packaging mockups, dynamic splash physics, and high-conversion advertising campaigns across FMCG, luxury skincare, organic foods, and consumer hardware.',
    highlights: ['3D Pouch & Jar Mockups', 'Fluid Splash Simulations', 'Commercial FMCG Advertising'],
    tags: ['3D CGI Renders', 'Product Packaging', 'FMCG Ads', 'Commercial Typography'],
    metrics: [
      { label: 'Click-Through Lift', value: '+54%' },
      { label: 'Mockup Fidelity', value: 'Photoreal' },
      { label: 'Conversion Impact', value: '3.8×' },
    ],
    clientName: 'Multi-Brand Showcase',
    region: 'Global & Regional',
    industry: 'FMCG & Consumer Goods',
    accentColor: '#00FC43',
    image: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m7.jpeg',
  },
];

export const BUSINESS_AD_PLANS: PricingPlan[] = [
  {
    id: 'protoy-ads',
    name: 'প্রত্যয় (Protoy)',
    subtitle: 'Start Your Brand Promotion',
    originalPrice: '৳৭,৫০০',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১,৫০০',
    price: '৳৬,০০০',
    period: 'মাস',
    delivery: 'সাপ্তাহিক শিডিউল ডেলিভারি',
    supportDuration: 'মাসব্যাপী অ্যাড সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '৩টি কাস্টম অ্যাড মোশন ভিডিও (৩০–৪০s) • কনসেপ্ট প্ল্যানিং',
    description: 'নতুন উদ্যোক্তা ও ছোট ব্যবসার প্রোডাক্ট এবং সার্ভিস প্রমোশনের জন্য।',
    ctaText: 'Get Started with প্রত্যয়',
    ctaLink: '/contact/?plan=protoy-ads',
    timeline: 'Monthly Retainer',
    idealFor: 'নতুন উদ্যোক্তা ও ছোট ব্যবসার প্রোডাক্ট এবং সার্ভিস প্রমোশনের জন্য।',
    features: [
      { name: '৩টি Custom Ads Motion Videos (30–40s Each)', included: true },
      { name: 'Basic Business & Product Analysis', included: true },
      { name: 'Creative Ad Concept Planning', included: true },
      { name: 'Professional Motion Graphics', included: true },
      { name: 'Engaging Opening Hook', included: true },
      { name: 'Product & Offer Highlight Animation', included: true },
      { name: 'Animated Text & Typography', included: true },
      { name: 'Brand Color & Logo Integration', included: true },
      { name: 'Background Music & Sound Effects', included: true },
      { name: 'Full HD Social Media Ready Export', included: true },
      { name: '২ রাউন্ড Revision', included: true },
    ],
  },
  {
    id: 'astha-ads',
    name: 'আস্থা (Astha)',
    subtitle: 'Make Your Brand Stand Out',
    featured: true,
    badge: 'MOST POPULAR',
    highlightBadge: 'সবচেয়ে বেশি জনপ্রিয় (Best Value)',
    originalPrice: '৳১২,৫০০',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳২,৫০০',
    price: '৳১০,০০০',
    period: 'মাস',
    delivery: 'পর্যায়ক্রমিক ক্যাম্পেইন ডেলিভারি',
    supportDuration: 'মাসব্যাপী প্রায়োরিটি সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '৫টি ক্রিয়েটিভ অ্যাড ভিডিও (৪টি ৩০–৪০s + ১টি ৬০s) • স্টোরিটেলিং',
    description: 'নিয়মিত বিজ্ঞাপন, কাস্টমার এনগেজমেন্ট এবং ব্র্যান্ড প্রমোশনের জন্য। প্রত্যয় প্যাকেজের সকল সুবিধাসহ:',
    ctaText: 'Scale with আস্থা',
    ctaLink: '/contact/?plan=astha-ads',
    timeline: 'Monthly Retainer',
    idealFor: 'নিয়মিত বিজ্ঞাপন, কাস্টমার এনগেজমেন্ট এবং ব্র্যান্ড প্রমোশনের জন্য।',
    features: [
      { name: 'মোট ৫টি Creative Ads Videos (৪টি 30–40s + ১টি Up to 60s)', included: true },
      { name: 'প্রত্যয় প্যাকেজের সকল সুবিধাসহ', included: true },
      { name: 'Detailed Business & Competitor Analysis', included: true },
      { name: 'Strategic Ad Content Planning', included: true },
      { name: 'Advanced Motion Graphics & Animation', included: true },
      { name: 'Customer Psychology-Based Ad Concepts', included: true },
      { name: 'Problem-Solution Based Video Storytelling', included: true },
      { name: 'Product Benefits & Offer Highlight', included: true },
      { name: 'Professional Sound Design', included: true },
      { name: 'Conversion-Focused CTA Animation', included: true },
      { name: 'Consistent Brand Visual Identity', included: true },
      { name: 'Facebook & Instagram Ads Ready Export', included: true },
      { name: '২ রাউন্ড Revision', included: true },
    ],
  },
  {
    id: 'gourob-ads',
    name: 'গৌরব (Gourob)',
    subtitle: 'Elevate Your Brand Advertising',
    originalPrice: '৳২১,২৫০',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৪,২৫০',
    price: '৳১৭,০০০',
    period: 'মাস',
    delivery: 'প্রায়োরিটি প্রোডাকশন শিডিউল',
    supportDuration: 'ডেডিকেটেড মোশন ডিরেক্টর',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: '১০টি প্রিমিয়াম অ্যাড ভিডিও (৮টি ৩০–৪০s + ২টি ৬০s) • হাই-এন্ড সাউন্ড',
    description: 'প্রিমিয়াম ব্র্যান্ডিং, নিয়মিত প্রোডাক্ট প্রমোশন এবং পরিকল্পিত বিজ্ঞাপন ক্যাম্পেইনের জন্য। আস্থা প্যাকেজের সকল সুবিধাসহ:',
    ctaText: 'Lead with গৌরব',
    ctaLink: '/contact/?plan=gourob-ads',
    timeline: 'Monthly Retainer',
    idealFor: 'প্রিমিয়াম ব্র্যান্ডিং, নিয়মিত প্রোডাক্ট প্রমোশন এবং পরিকল্পিত বিজ্ঞাপন ক্যাম্পেইনের জন্য।',
    features: [
      { name: 'মোট ১০টি Premium Creative Ads Videos (৮টি 30–40s + ২টি Up to 60s)', included: true },
      { name: 'আস্থা প্যাকেজের সকল সুবিধাসহ', included: true },
      { name: 'Advanced Brand & Competitor Research', included: true },
      { name: 'Monthly Creative Ads Strategy', included: true },
      { name: 'Premium Motion Graphics & Visual Effects', included: true },
      { name: 'Audience-Focused Advertising Concepts', included: true },
      { name: 'Advanced Product & Service Storytelling', included: true },
      { name: 'Seasonal & Special Offer Campaign Concepts', included: true },
      { name: 'Customer Trust-Building Visual Elements', included: true },
      { name: 'Sales-Oriented Creative Presentation', included: true },
      { name: 'Premium Sound Design & Audio Mixing', included: true },
      { name: 'Advanced CTA & End-Screen Animation', included: true },
      { name: 'Consistent Campaign Visual Identity', included: true },
      { name: 'Priority Editing Support', included: true },
      { name: 'Facebook, Instagram & YouTube Shorts Ready Export', included: true },
      { name: '৩ রাউন্ড Revision', included: true },
    ],
  },
];

export const COMBO_PLANS: PricingPlan[] = [
  {
    id: 'rupalika',
    name: 'রুপালীকা',
    subtitle: 'Design & Reels Combo',
    originalPrice: '৳১২,৪৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳২,৫০০',
    price: '৳৯,৯৯৯',
    period: 'মাস',
    delivery: '২৪–৪৮ ঘণ্টা প্রতি ব্যাচ',
    supportDuration: 'মাসব্যাপী ডেডিকেটেড সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '১৫টি ডিজাইন • ৩টি রিলস (২৫–৩০s) • ১৮টি ক্যাপশন',
    description: 'ছোট ও মাঝারি ব্যবসার কমপ্লিট সোশ্যাল মিডিয়া সমাধান—ক্রিয়েটিভ ডিজাইন এবং হাই-ইমপ্যাক্ট রিলস একসাথে।',
    ctaText: 'Get Started with রুপালীকা',
    ctaLink: '/contact/?plan=rupalika',
    timeline: 'Monthly Retainer',
    idealFor: 'Small businesses and growing brands that need consistent, professional design and reels combo.',
    features: [
      { name: '15 Premium Creative Designs', included: true },
      { name: '3 Reels (25–30s each)', included: true },
      { name: '18 Social Media Captions', included: true },
      { name: 'Business & Competitor Analysis', included: true },
      { name: 'Monthly Content Planning', included: true },
      { name: 'Monthly Performance Report', included: true },
      { name: '100% Human-Created Designs — No AI', included: true },
    ],
  },
  {
    id: 'sonalika',
    name: 'সোনালীকা',
    subtitle: 'Growth & Strategy Combo',
    featured: true,
    badge: 'MOST POPULAR',
    highlightBadge: 'সবচেয়ে জনপ্রিয় কম্বো (Best Value)',
    originalPrice: '৳১৫,৬২৪',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৩,১২৫',
    price: '৳১২,৪৯৯',
    period: 'মাস',
    delivery: '২৪–৪৮ ঘণ্টা প্রতি ব্যাচ',
    supportDuration: 'মাসব্যাপী প্রায়োরিটি সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '২০টি ডিজাইন • ৫টি রিলস (২৫–৪০s) • ২৫টি ক্যাপশন',
    description: 'দ্রুত বর্ধনশীল ব্র্যান্ডের জন্য ফুল-স্কেল ক্রিয়েটিভ ডিজাইন ও ভিডিও রিলস প্রডাকশন রিটেইনার।',
    ctaText: 'Scale with সোনালীকা',
    ctaLink: '/contact/?plan=sonalika',
    timeline: 'Monthly Retainer',
    idealFor: 'Established businesses seeking an active and consistent social media design & video presence.',
    features: [
      { name: '20 Premium Creative Designs', included: true },
      { name: '5 Reels (25–40s each)', included: true },
      { name: '25 Social Media Captions', included: true },
      { name: 'Business & Competitor Analysis', included: true },
      { name: 'Content Strategy & Calendar', included: true },
      { name: 'Monthly Performance Report', included: true },
      { name: '100% Human-Created Designs — No AI', included: true },
    ],
  },
  {
    id: 'agrojatra',
    name: 'অগ্রযাত্রা',
    subtitle: 'Full-Scale Brand Scale',
    originalPrice: '৳২২,৪৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৪,৫০০',
    price: '৳১৭,৯৯৯',
    period: 'মাস',
    delivery: '২৪ ঘণ্টা প্রায়োরিটি ব্যাচ',
    supportDuration: 'ভিআইপি অ্যাকাউন্ট ডিরেক্টর',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: '৩০টি ডিজাইন • ৪টি রিলস • ২টি এক্সটেন্ডেড ভিডিও',
    description: 'শীর্ষ ব্র্যান্ডের জন্য কমপ্রিহেন্সিভ ক্রিয়েটিভ গ্রোথ প্যাকেজ—ডিজাইন, রিলস ও এক্সটেন্ডেড ভিডিও প্রোডাকশন।',
    ctaText: 'Lead with অগ্রযাত্রা',
    ctaLink: '/contact/?plan=agrojatra',
    timeline: 'Monthly Retainer',
    idealFor: 'Brands that need a broader mix of creative designs, short-form videos, and strategic content.',
    features: [
      { name: '30 Premium Creative Designs', included: true },
      { name: '4 Reels (25–40s each)', included: true },
      { name: '2 Extended Videos (up to 60s each)', included: true },
      { name: '36 Social Media Captions', included: true },
      { name: 'Advanced Business & Competitor Research', included: true },
      { name: 'Monthly Content Strategy', included: true },
      { name: 'Monthly Performance Report', included: true },
      { name: '100% Human-Created Designs — No AI', included: true },
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = COMBO_PLANS;

export const GRAPHIC_DESIGN_PLANS: PricingPlan[] = [
  {
    id: 'tuli',
    name: 'তুলি',
    subtitle: 'Starter Presence',
    originalPrice: '৳২,৬২৪',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৫২৫',
    price: '৳২,০৯৯',
    period: 'মাস',
    delivery: '২৪–৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    supportDuration: 'মাসব্যাপী ডিজাইন সাপোর্ট',
    revisionPolicy: '১ রাউন্ড Revision',
    deliverableSummary: '৭টি কাস্টম ডিজাইন • ১০০% ইউনিক নো-এআই • ফেসবুক ও ইন্সটা রেডি',
    description: 'ছোট ব্যবসার সুন্দর ও প্রফেশনাল ডিজিটাল উপস্থিতি তৈরির জন্য।',
    ctaText: 'Get Started with তুলি',
    ctaLink: '/contact/?plan=tuli',
    timeline: 'Monthly Retainer',
    idealFor: 'ছোট ব্যবসা, ফেসবুক পেজ ও স্টার্টআপ যাদের নিয়মিত প্রফেশনাল ডিজাইন প্রয়োজন।',
    features: [
      { name: '৭টি Custom Creative Designs', included: true },
      { name: '100% Unique & No AI-Generated Designs', included: true },
      { name: 'Basic Business Analysis', included: true },
      { name: 'Competitor Design Research', included: true },
      { name: 'Brand Color & Typography Matching', included: true },
      { name: 'Professional Bengali & English Typography', included: true },
      { name: 'Facebook & Instagram Ready High-Resolution Designs', included: true },
      { name: '১ রাউন্ড Revision', included: true },
    ],
  },
  {
    id: 'noksha',
    name: 'নকশা',
    subtitle: 'Most Popular',
    featured: true,
    badge: 'MOST POPULAR',
    highlightBadge: 'সবচেয়ে বেশি লাভজনক (Best Value)',
    originalPrice: '৳৫,১২৪',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১,০২৫',
    price: '৳৪,০৯৯',
    period: 'মাস',
    delivery: '২৪–৪৮ ঘণ্টার মধ্যে ডেলিভারি',
    supportDuration: 'মাসব্যাপী ব্র্যান্ড সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '১৪টি প্রিমিয়াম ডিজাইন • কনটেন্ট প্ল্যানিং • সাইকোলজি ভিজ্যুয়াল',
    description: 'নিয়মিত ব্র্যান্ডিং ও কাস্টমার এনগেজমেন্টের জন্য। তুলি প্যাকেজের সকল সুবিধাসহ:',
    ctaText: 'Scale with নকশা',
    ctaLink: '/contact/?plan=noksha',
    timeline: 'Monthly Retainer',
    idealFor: 'মাঝারি প্রতিষ্ঠান ও দ্রুত বর্ধনশীল ব্র্যান্ড যাদের ব্র্যান্ড কনসিস্টেন্সি ও নিয়মিত এনগেজমেন্ট দরকার।',
    features: [
      { name: '১৪টি Premium Creative Designs (মোট)', included: true },
      { name: 'তুলি প্যাকেজের সকল সুবিধাসহ', included: true },
      { name: 'Detailed Business & Competitor Analysis', included: true },
      { name: 'Monthly Creative Content Planning', included: true },
      { name: 'Product & Promotional Post Concepts', included: true },
      { name: 'Customer Psychology-Based Design Approach', included: true },
      { name: 'Brand Consistency Management', included: true },
      { name: 'Campaign & Offer-Based Visuals', included: true },
      { name: '২ রাউন্ড Revision', included: true },
      { name: 'Monthly Creative Delivery Report', included: true },
    ],
  },
  {
    id: 'abhijatya',
    name: 'আভিজাত্য',
    subtitle: 'Full Strategy',
    originalPrice: '৳৭,৬২৪',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১,৫২৫',
    price: '৳৬,০৯৯',
    period: 'মাস',
    delivery: '২৪ ঘণ্টার প্রায়োরিটি ডেলিভারি',
    supportDuration: 'মাসব্যাপী ভিআইপি সাপোর্ট',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: '২১টি এক্সক্লুসিভ ডিজাইন • ফুল ক্যাম্পেইন স্ট্র্যাটেজি • প্রায়োরিটি সাপোর্ট',
    description: 'শক্তিশালী ব্র্যান্ডিং ও পরিকল্পিত মার্কেটিং ক্যাম্পেইনের জন্য। নকশা প্যাকেজের সকল সুবিধাসহ:',
    ctaText: 'Lead with আভিজাত্য',
    ctaLink: '/contact/?plan=abhijatya',
    timeline: 'Monthly Retainer',
    idealFor: 'শীর্ষস্থানীয় ব্র্যান্ড ও ই-কমার্স যাদের সেলস ও কনভার্সন ফোকাসড ভিজিউয়াল ক্যাম্পেইন প্রয়োজন।',
    features: [
      { name: '২১টি Exclusive Premium Creative Designs (মোট)', included: true },
      { name: 'নকশা প্যাকেজের সকল সুবিধাসহ', included: true },
      { name: 'Advanced Brand & Competitor Research', included: true },
      { name: 'Monthly Campaign Strategy', included: true },
      { name: 'Seasonal & Festival Campaign Planning', included: true },
      { name: 'Audience-Focused Creative Planning', included: true },
      { name: 'Sales & Conversion-Focused Visual Concepts', included: true },
      { name: 'Product Highlight & Special Offer Designs', included: true },
      { name: 'Priority Design Support', included: true },
      { name: '৩ রাউন্ড Revision', included: true },
      { name: 'Monthly Creative Performance Review*', included: true },
    ],
  },
];

export const GRAPHIC_DESIGN_COMPARISON_FEATURES = [
  {
    category: 'Creative Design & Visuals',
    items: [
      { feature: 'Creative Designs Volume', starter: '৭টি Designs', growth: '১৪টি Designs (মোট)', enterprise: '২১টি Designs (মোট)' },
      { feature: '100% Unique & No AI Designs', starter: 'Guaranteed', growth: 'Guaranteed', enterprise: 'Guaranteed' },
      { feature: 'Brand Color & Typography Matching', starter: 'Included', growth: 'Included', enterprise: 'Included' },
      { feature: 'Bengali & English Typography', starter: 'Professional', growth: 'Professional', enterprise: 'Custom Stylized' },
      { feature: 'Social Media Resolution Ready', starter: 'FB & IG Ready', growth: 'FB & IG Ready', enterprise: 'Multi-Platform Ready' },
      { feature: 'Product & Promotional Concepts', starter: 'Standard', growth: 'Included', enterprise: 'Sales & Conversion' },
      { feature: 'Campaign & Offer-Based Visuals', starter: '—', growth: 'Included', enterprise: 'Priority Included' },
    ],
  },
  {
    category: 'Strategy & Intelligence',
    items: [
      { feature: 'Business & Competitor Analysis', starter: 'Basic Analysis', growth: 'Detailed Research', enterprise: 'Advanced Deep Dive' },
      { feature: 'Monthly Creative Content Planning', starter: '—', growth: 'Included', enterprise: 'Strategic Direction' },
      { feature: 'Customer Psychology-Based Approach', starter: '—', growth: 'Included', enterprise: 'Full Psychological Approach' },
      { feature: 'Brand Consistency Management', starter: 'Standard', growth: 'Active Governance', enterprise: 'Comprehensive' },
      { feature: 'Seasonal & Festival Campaign Planning', starter: '—', growth: '—', enterprise: 'Priority Strategic Calendar' },
    ],
  },
  {
    category: 'Delivery, Revisions & Support',
    items: [
      { feature: 'Design Revisions', starter: '১ রাউন্ড Revision', growth: '২ রাউন্ড Revision', enterprise: '৩ রাউন্ড Revision' },
      { feature: 'Delivery Reporting', starter: '—', growth: 'Monthly Delivery Report', enterprise: 'Performance Review*' },
      { feature: 'Dedicated Support Level', starter: 'Standard Support', growth: 'Priority WhatsApp Channel', enterprise: 'Priority Design Support' },
    ],
  },
];

export const INCLUDED_IN_EVERY_PACKAGE = [
  { title: 'Strategic Content Planning', desc: 'Custom roadmaps aligned with your monthly goals and events.' },
  { title: 'Brand-Focused Creative Design', desc: 'Distinct visual styles tailored strictly to your brand identity.' },
  { title: 'Professional Video Editing', desc: 'Paced, polished short-form video & reels with audio mastering.' },
  { title: 'Business & Competitor Analysis', desc: 'Market intelligence to find what works best in your industry niche.' },
  { title: 'Monthly Content Planning', desc: 'Scheduled content calendars so your publishing never misses a beat.' },
  { title: 'Performance Reporting', desc: 'Actionable monthly metrics to measure reach, engagement, and growth.' },
];

export const COMPARISON_FEATURES = [
  {
    category: 'Video Production & Motion Graphics',
    items: [
      { feature: 'Creative Ads Motion Videos', starter: '৩টি Videos (30–40s Each)', growth: '৫টি Videos (৪টি 30–40s + ১টি 60s)', enterprise: '১০টি Videos (৮টি 30–40s + ২টি 60s)' },
      { feature: 'Motion Graphics & Animation', starter: 'Professional Motion Graphics', growth: 'Advanced Motion Graphics', enterprise: 'Premium Motion VFX & 3D' },
      { feature: 'Engaging Opening Hook', starter: 'Included', growth: 'Customer Psychology Hook', enterprise: 'Advanced Audience Hook' },
      { feature: 'Product & Offer Highlight', starter: 'Animation Included', growth: 'Problem-Solution Storytelling', enterprise: 'Sales-Oriented Presentation' },
      { feature: 'Sound Design & Audio', starter: 'BGM & Sound Effects', growth: 'Professional Sound Design', enterprise: 'Premium Sound Design & Audio Mixing' },
      { feature: 'Export Quality & Channels', starter: 'Full HD Social Media Ready', growth: 'Facebook & Instagram Ready', enterprise: 'FB, IG & YouTube Shorts Ready' },
    ],
  },
  {
    category: 'Strategy & Brand Identity',
    items: [
      { feature: 'Business & Competitor Research', starter: 'Basic Analysis', growth: 'Detailed Analysis', enterprise: 'Advanced In-Depth Research' },
      { feature: 'Creative Ad Concept Planning', starter: 'Concept Planning', growth: 'Strategic Content Planning', enterprise: 'Monthly Creative Ad Strategy' },
      { feature: 'Storytelling & Trust Building', starter: 'Standard Ad Flow', growth: 'Problem-Solution Approach', enterprise: 'Customer Trust-Building Story' },
      { feature: 'Seasonal & Offer Campaigns', starter: '—', growth: 'Included', enterprise: 'Seasonal & Special Offer Concepts' },
      { feature: 'CTA & End-Screen Animation', starter: 'Animated Text', growth: 'Conversion-Focused CTA', enterprise: 'Advanced CTA & End-Screen' },
      { feature: 'Brand Visual Identity', starter: 'Brand Color & Logo', growth: 'Consistent Brand Identity', enterprise: 'Consistent Campaign Identity' },
    ],
  },
  {
    category: 'Turnaround, Support & Revisions',
    items: [
      { feature: 'Revision Rounds', starter: '২ রাউন্ড Revision', growth: '২ রাউন্ড Revision', enterprise: '৩ রাউন্ড Revision' },
      { feature: 'Dedicated Support Channel', starter: 'Standard Support', growth: 'Priority WhatsApp Channel', enterprise: 'Priority Editing Support' },
      { feature: 'Monthly Billing Cycle', starter: 'Monthly Retainer', growth: 'Monthly Retainer', enterprise: 'Monthly Retainer' },
    ],
  },
];

export const WHY_CHOOSE_US_PILLARS = [
  {
    number: '01',
    title: 'Architectural Rigor',
    desc: 'No fragile templates or bloated themes. We author clean, maintainable TypeScript and Next.js platforms built to withstand millions of monthly requests.',
    highlight: 'Zero Technical Debt',
  },
  {
    number: '02',
    title: 'Direct Business Impact',
    desc: 'Code is useless if it does not grow revenue. Every interface, button, and animation is engineered with conversion ergonomics to drive quantifiable ROI.',
    highlight: '3× Average Client ROI',
  },
  {
    number: '03',
    title: 'Velocity Without Compromise',
    desc: 'Our sprint-based methodology delivers working software in weeks, not quarters. Transparent roadmaps with weekly staging builds you can test live.',
    highlight: '90% On-Time Delivery',
  },
  {
    number: '04',
    title: 'Dedicated Studio Pods',
    desc: 'Operating from our Khulna headquarters, we combine deep market mastery with international engineering standards, backed by dedicated direct WhatsApp communication.',
    highlight: 'Dedicated Pod Support',
  },
];

export const FAQS_LIST: FAQItem[] = [
  {
    id: 'engagement-timeline',
    question: 'How long does a typical engagement take?',
    answer:
      'For our Digital Launch Suite, typical production delivery is 3 to 4 weeks. Our Growth Engine engagements usually span 5 to 6 weeks, while enterprise custom software platforms are mapped out in 2-week milestone sprints across 8 to 12 weeks. We provide clear Gantt milestones before kickoff.',
  },
  {
    id: 'tech-stack',
    question: 'What is your primary technology stack?',
    answer:
      'We specialize in modern, high-performance web and cloud technologies: Next.js (React), TypeScript, Tailwind CSS, GSAP for animations, Node.js, Go, PostgreSQL, Redis, and Supabase. On the cloud side, we deploy on AWS, Vercel, and Cloudflare Edge networks.',
  },
  {
    id: 'system-integration',
    question: 'Can you integrate custom software into our existing business tools?',
    answer:
      'Yes. Many of our clients have existing accounting, inventory, or CRM platforms. We engineer bespoke API connectors, automated data pipelines, and custom dashboards that synchronize directly with your databases and operational tools without disrupting current operations.',
  },
  {
    id: 'post-launch-support',
    question: 'What happens after our website or platform is launched?',
    answer:
      'Every project includes a dedicated post-launch warranty period (30 to 60 days depending on the tier) where we monitor error logs, optimize performance metrics, and assist your team with handoff. We also offer ongoing monthly maintenance and SLA engineering pods for continuous iteration.',
  },
  {
    id: 'pricing-clarity',
    question: 'Are there any hidden fees or recurring charges from TOTO Development?',
    answer:
      'None. Our proposals are fixed-scope and transparently quoted. You own 100% of all intellectual property, source code, and design files upon final milestone delivery. Third-party hosting (e.g. AWS or Vercel) and SaaS domain costs are billed directly to your company accounts.',
  },
  {
    id: 'how-to-start',
    question: 'How do we get started with TOTO Development?',
    answer:
      'Simply click "Ask for a quote" or book a strategy call via our contact form. We conduct a 30-minute discovery session to understand your business objectives, timeline, and technical constraints, followed by a detailed written proposal within 48 hours.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'আমাদের ব্যবসার কাজগুলো এক জায়গায় ম্যানেজ করার জন্য CRM সফটওয়্যারটি নিয়েছিলাম। অর্ডার আর কাস্টমারের তথ্য গুছিয়ে রাখতে এখন অনেক সুবিধা হচ্ছে।',
    author: 'Mahmud Hasan',
    role: 'Founder',
    company: 'Greenora',
    rating: 5,
    avatar:
      'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Gemini_Generated_Image_bepiksbepiksbepi.jpeg',
    projectHighlight: 'CRM & Order Management',
  },
  {
    quote:
      'পোস্টের ডিজাইন আর ভিডিও দুটোই ভালো হয়েছে। আমাদের পেজে এখন কনটেন্টগুলো আগের চেয়ে অনেক বেশি গোছানো দেখায়।',
    author: 'Nusrat Jahan',
    role: 'Founder',
    company: 'Nivora Lifestyle',
    rating: 5,
    avatar:
      'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Gemini_Generated_Image_foyr7yfoyr7yfoyr.jpeg',
    projectHighlight: 'Creative Design & Video',
  },
  {
    quote:
      'মধুর ব্যবসার জন্য ওয়েবসাইটটি করিয়েছি। এখন কাস্টমারদের পণ্য দেখানো এবং অনলাইনে অর্ডার নেওয়া অনেক সহজ হয়েছে।',
    author: 'Maulana Abdullah Al Mamun',
    role: 'Founder',
    company: 'Sunnah Harvest',
    rating: 5,
    avatar:
      'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Gemini_Generated_Image_xc27ogxc27ogxc27.jpeg',
    projectHighlight: 'E-Commerce Storefront',
  },
];

export const BANGLADESHI_CIRCULAR_TESTIMONIALS = [
  {
    quote:
      'আমাদের ব্যবসার কাজগুলো এক জায়গায় ম্যানেজ করার জন্য CRM সফটওয়্যারটি নিয়েছিলাম। অর্ডার আর কাস্টমারের তথ্য গুছিয়ে রাখতে এখন অনেক সুবিধা হচ্ছে।',
    name: 'Mahmud Hasan',
    designation: 'Founder, Greenora',
    src: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Gemini_Generated_Image_bepiksbepiksbepi.jpeg',
  },
  {
    quote:
      'পোস্টের ডিজাইন আর ভিডিও দুটোই ভালো হয়েছে। আমাদের পেজে এখন কনটেন্টগুলো আগের চেয়ে অনেক বেশি গোছানো দেখায়।',
    name: 'Nusrat Jahan',
    designation: 'Founder, Nivora Lifestyle',
    src: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Gemini_Generated_Image_foyr7yfoyr7yfoyr.jpeg',
  },
  {
    quote:
      'মধুর ব্যবসার জন্য ওয়েবসাইটটি করিয়েছি। এখন কাস্টমারদের পণ্য দেখানো এবং অনলাইনে অর্ডার নেওয়া অনেক সহজ হয়েছে।',
    name: 'Maulana Abdullah Al Mamun',
    designation: 'Founder, Sunnah Harvest',
    src: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/Gemini_Generated_Image_xc27ogxc27ogxc27.jpeg',
  },
];

export const BRAND_DESIGN_SHOWCASE_CARDS = [
  {
    imgUrl: "/creative-design/k6.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/k6.jpeg",
    title: "Anua Heartleaf Cleansing Oil",
    category: "Korean Skincare Packaging",
    alt: "Anua Heartleaf Pore Control Cleansing Oil tube mockup with heartleaf foliage and golden swirl oil droplets",
  },
  {
    imgUrl: "/creative-design/k5.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/k5.jpeg",
    title: "Plum 15% Vitamin C Serum",
    category: "Luxury Cosmetics & Splash CGI",
    alt: "Plum Vitamin C 15% Glow Boost dropper bottle surrounded by dynamic golden citrus water splash physics and fresh orange slices",
  },
  {
    imgUrl: "/creative-design/k4.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/k4.jpeg",
    title: "Seven Plus Verbena Shampoo",
    category: "Botanical Haircare CGI",
    alt: "Seven Plus 01 Lemon Verbena Fragrance Shampoo bottle in a dynamic crown splash of lime water and citrus foliage",
  },
  {
    imgUrl: "/creative-design/k3.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/k3.jpeg",
    title: "del Valle Peach Nectar Can",
    category: "Beverage Packaging & 3D Render",
    alt: "del Valle Sabor Pêssego chilled aluminum beverage can with condensation droplets and floating fresh peach slices",
  },
  {
    imgUrl: "/creative-design/k1.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/k1.jpeg",
    title: "Skinova SPF50+ Sunscreen Gel",
    category: "Dermatological Skincare",
    alt: "Skinova Image SPF50+ Gel Sun Screen tube mockup on rustic driftwood with white jasmine blossoms and fresh orange",
  },
  {
    imgUrl: "/creative-design/k2.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/k2.jpeg",
    title: "Nisarga Cow Milk Ghee",
    category: "Dairy & Organic FMCG",
    alt: "Nisarga pure cow milk ghee jars with a wooden bowl of golden clarified butter against a dairy farm meadow with cows",
  },
  {
    imgUrl: "/creative-design/m7.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m7.jpeg",
    title: "Ultraceuticals Energising Mask",
    category: "Luxury Cosmetics CGI",
    alt: "Ultraceuticals Ultra Energising Mask facial cosmetic tube mockup with dynamic crown water splash and mint foliage on luxury podium",
  },
  {
    imgUrl: "/creative-design/m2.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m2.jpeg",
    title: "Nuut Roasted Mixed Nuts",
    category: "3D Packaging & CGI",
    alt: "Nuut Pure by Nature roasted mixed nuts pouch packaging mockup with flying 3D almonds, cashews, and walnuts",
  },
  {
    imgUrl: "/creative-design/m4.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m4.jpeg",
    title: "LUNA 15 Next-Gen Ultrabook",
    category: "Hardware & Tech Identity",
    alt: "LUNA 15 performance laptop hardware banner showcase with glowing neon circular halo ring and hardware specifications",
  },
  {
    imgUrl: "/creative-design/m5.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m5.jpeg",
    title: "LYO FRU Dragon Fruit",
    category: "Freeze-Dried Food Packaging",
    alt: "LYO FRU Dračí Ovoce freeze-dried dragon fruit stand-up pouch packaging mockup with floating fruit slices in magenta studio lighting",
  },
  {
    imgUrl: "/creative-design/m3.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m3.jpeg",
    title: "Ninja Fit High-Speed Blender",
    category: "Consumer Appliance Ad",
    alt: "Ninja Fit Compact personal blender commercial product advertisement with dynamic citrus splash physics, ice particles, and spec callouts",
  },
  {
    imgUrl: "/creative-design/m6.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m6.jpeg",
    title: "GROW It Green Pure Turmeric",
    category: "Organic Spice Packaging",
    alt: "GROW It Green powdered turmeric spice glass jar mockup with metallic lid, floating green leaves, and golden spice dust dispersion",
  },
  {
    imgUrl: "/creative-design/m8.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m8.jpeg",
    title: "BURAQ Nigella Herbal Relief",
    category: "Herbal Healthcare Packaging",
    alt: "BURAQ Nigella herbal massage oil cylindrical tube packaging wrapped in emerald ribbons and gold foil typography",
  },
  {
    imgUrl: "/creative-design/m1.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m1.jpeg",
    title: "Agrona Mustard Oil Campaign",
    category: "Commercial FMCG Poster",
    alt: "Agrona pure mustard oil commercial advertisement poster featuring mustard fields, traditional cooked Bengali curry dish, and brand typography",
  },
  {
    imgUrl: "/creative-design/m9.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m9.jpeg",
    title: "Ghrani Gourmet Olive Pickle",
    category: "Artisan Food Packaging",
    alt: "Ghrani gourmet olive pickle glass jar mockup set on desert sand dunes with rustic driftwood and fresh green olives",
  },
  {
    imgUrl: "/creative-design/m10.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m10.jpeg",
    title: "TEA Bazar BD Organic Blend",
    category: "Beverage & Tea Packaging",
    alt: "TEA Bazar BD zip pouch packaging encircled by heart-shaped fresh green tea branch foliage and a brewed cup of golden liquor",
  },
  {
    imgUrl: "/creative-design/m11.jpeg",
    cdnUrl: "https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/m11.jpeg",
    title: "Shader Bazar Royal Hilsa Pickle",
    category: "Heritage Culinary Branding",
    alt: "Shader Bazar authentic Hilsa fish pickle jar mockup on rustic wooden tabletop with fresh Hilsa fish, mustard seeds, and whole spices",
  },
];

/* =============================================================================
   08. WEBSITE, E-COMMERCE & CUSTOM SOFTWARE DEVELOPMENT ECOSYSTEM
   Shared Single-Source-of-Truth for TOTO Development Pricing & Packages
   ============================================================================= */

// -----------------------------------------------------------------------------
// 8.1 LANDING PAGE DEVELOPMENT PACKAGES
// -----------------------------------------------------------------------------
export const LANDING_PAGE_PLANS: PricingPlan[] = [
  {
    id: 'landing-essential',
    name: 'Landing Essential',
    subtitle: 'Single High-Impact Landing Page',
    originalPrice: '৳৯,৯৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳২,০০০',
    price: '৳৭,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৩–৫ কার্যদিবস',
    supportDuration: '১৫ দিন বাগ সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: 'আপ টু ৬টি সেকশন • মোবাইল ফার্স্ট • WhatsApp লিড ফ্লো',
    category: 'landing',
    idealFor: 'নতুন প্রোডাক্ট, অফার বা সিঙ্গেল ক্যাম্পেইনের জন্য হাই-স্পিড ও কনভার্সন-ফোকাসড সেলস পেজ।',
    description: 'নতুন উদ্যোক্তা ও ব্যবসার প্রোডাক্ট বা সার্ভিস প্রমোশনে বিজ্ঞাপন ক্যাম্পেইনের সর্বোচ্চ রিটার্ন পেতে অপটিমাইজড ল্যান্ডিং পেজ।',
    ctaText: 'Choose Landing Essential',
    ctaLink: '/contact/?plan=landing-essential',
    features: [
      { name: 'Single Landing Page (Up to 6 Sections)', included: true },
      { name: 'Professional Responsive Design (Mobile First)', included: true },
      { name: 'Product or Service Presentation Architecture', included: true },
      { name: 'WhatsApp & Direct Call Integration', included: true },
      { name: 'Basic Lead Capture Form', included: true },
      { name: 'Basic SEO Configuration & OpenGraph Tags', included: true },
      { name: 'SSL / HTTPS Security Configuration', included: true },
      { name: 'Form Validation & Anti-Spam Protection', included: true },
      { name: '২ রাউন্ড Revision Support', included: true },
      { name: '১৫ দিন Bug Support & Technical Handover', included: true },
    ],
  },
  {
    id: 'landing-conversion',
    name: 'Landing Conversion',
    subtitle: 'Campaign & Ads Optimized',
    featured: true,
    badge: 'MOST POPULAR',
    highlightBadge: 'পেইড বিজ্ঞাপন ক্যাম্পেইনের সেরা পছন্দ',
    originalPrice: '৳১৬,২৪৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৩,২৫০',
    price: '৳১২,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৫–৭ কার্যদিবস',
    supportDuration: '৩০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: '১০টি কনভার্সন সেকশন • থ্যাংক ইউ পেজ • Meta Pixel ও GA4',
    category: 'landing',
    idealFor: 'মেটা ও গুগল পেইড অ্যাডস ক্যাম্পেইনে কাস্টমার ড্রাইভ ও সর্বোচ্চ সেলস কনভার্সনের জন্য।',
    description: 'Essential প্যাকেজের সকল সুবিধাসহ উন্নত ইউআই, থ্যাংক ইউ পেজ, মেটা পিক্সেল ও জিএ৪ কনভার্সন ট্র্যাকিং সম্বলিত সেলস পাওয়ারহাউজ।',
    ctaText: 'Scale with Conversion',
    ctaLink: '/contact/?plan=landing-conversion',
    features: [
      { name: 'Everything in Essential Package', included: true },
      { name: 'Up to 10 Conversion-Focused Sections', included: true },
      { name: 'Customised Premium UI & Visual Polish', included: true },
      { name: 'Advanced Lead / Order Form with Custom Fields', included: true },
      { name: 'Dedicated Thank You Page for Tracking', included: true },
      { name: 'Meta Pixel Integration & Event Setup', included: true },
      { name: 'Google Analytics 4 (GA4) Analytics Sync', included: true },
      { name: 'Basic Conversion Event Tracking (Purchase/Lead)', included: true },
      { name: 'Improved CTA Structure & Sticky Mobile Trigger', included: true },
      { name: 'Performance Optimisation (<2s Load Speed)', included: true },
      { name: '৩ রাউন্ড Revision Support', included: true },
      { name: '৩০ দিন Bug Support & Handover Guide', included: true },
    ],
  },
  {
    id: 'landing-signature',
    name: 'Landing Signature',
    subtitle: 'High-Ticket Marketing Funnel',
    originalPrice: '৳২৪,৯৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৫,০০০',
    price: '৳১৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৭–১০ কার্যদিবস',
    supportDuration: '৪৫ দিন বাগ সাপোর্ট',
    revisionPolicy: '৪ রাউন্ড Revision',
    deliverableSummary: '১৫টি ফানেল সেকশন • A/B ভ্যারিয়েন্ট • CRM ইন্টিগ্রেশন',
    category: 'landing',
    idealFor: 'হাই-টিকেট অফার, এ/বি টেস্টিং এবং সিআরএম অটোমেশন সমৃদ্ধ পূর্ণাঙ্গ ডিজিটাল সেলস ফানেল।',
    description: 'মার্কেটিং-অরিয়েন্টেড ল্যান্ডিং পেজ সলিউশন—এ/বি টেস্টিং ভ্যারিয়েন্ট, সিআরএম ইন্টিগ্রেশন ও উন্নত সিকিউরিটি সমৃদ্ধ।',
    ctaText: 'Lead with Signature Funnel',
    ctaLink: '/contact/?plan=landing-signature',
    features: [
      { name: 'Everything in Conversion Package', included: true },
      { name: 'Up to 15 Strategic Funnel Sections', included: true },
      { name: 'Premium Custom UI/UX with Micro-Interactions', included: true },
      { name: 'Advanced Sales Funnel Architecture', included: true },
      { name: 'Two Landing Page Variants for A/B Testing', included: true },
      { name: 'UTM Campaign Attribution Tracking', included: true },
      { name: 'Advanced Conversion Event Configuration', included: true },
      { name: 'One Supported CRM / Email Marketing Integration', included: true },
      { name: 'Enhanced Security & Rate-Limit Hardening', included: true },
      { name: '৪ রাউন্ড Revision Support', included: true },
      { name: '৪৫ দিন Priority Bug Support', included: true },
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.2 BUSINESS & CORPORATE WEBSITE DEVELOPMENT PACKAGES
// -----------------------------------------------------------------------------
export const BUSINESS_WEBSITE_PLANS: PricingPlan[] = [
  {
    id: 'business-essential',
    name: 'Business Essential',
    subtitle: 'Starter Business Presence',
    originalPrice: '৳২১,২৪৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৪,২৫০',
    price: '৳১৬,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৭–১০ কার্যদিবস',
    supportDuration: '১৫ দিন বাগ সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '৫টি ইউনিক পেজ • রেসপনসিভ UI • অ্যান্টি-স্প্যাম লিড ফর্ম',
    category: 'business-website',
    idealFor: 'নতুন ব্যবসা, স্টার্টআপ ও প্রফেশনাল সার্ভিস প্রোভাইডারদের জন্য প্রাতিষ্ঠানিক পরিচিতি ও ব্র্যান্ড ট্রাস্ট।',
    description: '৫টি অনন্য পেজ সমৃদ্ধ আধুনিক ও রেসপনসিভ বিজনেস ওয়েবসাইট যা ক্লায়েন্টদের কাছে আপনার প্রতিষ্ঠানের নির্ভরযোগ্যতা নিশ্চিত করে।',
    ctaText: 'Choose Business Essential',
    ctaLink: '/contact/?plan=business-essential',
    features: [
      { name: 'Up to 5 Unique Pages (Home, About, Services, Portfolio, Contact)', included: true },
      { name: 'Professional Responsive UI (Mobile, Tablet, Desktop)', included: true },
      { name: 'Interactive Contact & Inquiry Form', included: true },
      { name: 'WhatsApp & Direct Call Integration', included: true },
      { name: 'Basic Technical SEO & Sitemap Setup', included: true },
      { name: 'SSL / HTTPS Security Configuration', included: true },
      { name: 'Secure Form Handling with Anti-Spam', included: true },
      { name: 'Basic Performance Optimisation', included: true },
      { name: '২ রাউন্ড Revision Support', included: true },
      { name: '১৫ দিন Bug Support & Basic Walkthrough', included: true },
    ],
  },
  {
    id: 'business-professional',
    name: 'Business Professional',
    subtitle: 'Dynamic Blog & CMS Engine',
    featured: true,
    badge: 'RECOMMENDED',
    highlightBadge: 'এসএমই ও বর্ধনশীল কোম্পানির জন্য সেরা',
    originalPrice: '৳৩৪,৯৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৭,০০০',
    price: '৳২৭,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '১০–১৫ কার্যদিবস',
    supportDuration: '৩০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: '১০টি পেজ • ডাইনামিক ব্লগ CMS • পোর্টফোলিও ম্যানেজমেন্ট',
    category: 'business-website',
    idealFor: 'প্রতিষ্ঠিত এসএমই ও গ্রোথ কোম্পানির জন্য যাদের নিয়মিত কনটেন্ট আপডেট ও লিড জেনারেশন দরকার।',
    description: '১০টি অনন্য পেজ, ডায়নামিক ব্লগ সিএমএস, পোর্টফোলিও ম্যানেজমেন্ট ও ব্যাকআপ কনফিগারেশন সমৃদ্ধ সম্পূর্ণ প্ল্যাটফর্ম।',
    ctaText: 'Build Business Professional',
    ctaLink: '/contact/?plan=business-professional',
    features: [
      { name: 'Up to 10 Unique Pages & Custom UI Architecture', included: true },
      { name: 'Enhanced Custom UI & Brand Styling', included: true },
      { name: 'Dynamic Blog CMS for In-House Publishing', included: true },
      { name: 'Individual Dedicated Service Pages', included: true },
      { name: 'Interactive Portfolio Management Showcase', included: true },
      { name: 'Multi-Step Lead Capture Forms', included: true },
      { name: 'Google Analytics 4 (GA4) Integration', included: true },
      { name: 'Technical SEO Foundation & Meta Architecture', included: true },
      { name: 'Security Hardening & Secret Protection', included: true },
      { name: 'Automated Backup Configuration', included: true },
      { name: 'Admin Training & Management Handover', included: true },
      { name: '৩ রাউন্ড Revision Support', included: true },
      { name: '৩০ দিন Bug Support', included: true },
    ],
  },
  {
    id: 'corporate-signature',
    name: 'Corporate Signature',
    subtitle: 'Enterprise Corporate Architecture',
    originalPrice: '৳৫৬,২৪৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১১,২৫০',
    price: '৳৪৪,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '১৫–২৫ কার্যদিবস',
    supportDuration: '৬০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৪ রাউন্ড Revision',
    deliverableSummary: '২০টি পেজ • এন্টারপ্রাইজ CMS • ক্যারিয়ার ও প্রেস পোর্টাল',
    category: 'business-website',
    idealFor: 'শীর্ষস্থানীয় প্রতিষ্ঠান, শিল্প গ্রুপ, বড় এজেন্সি ও করপোরেট ব্র্যান্ডের আন্তর্জাতিক মানের ডিজিটাল ক্রেডিবিলিটি।',
    description: '২০টি অনন্য পেজ, ক্যারিয়ার পোর্টাল, কেস স্টাডিজ, ক্লাউড ব্যাকআপ ও স্ট্রাকচার্ড ডাটা সমৃদ্ধ কর্পোরেট ফ্ল্যাগশিপ।',
    ctaText: 'Lead with Corporate Signature',
    ctaLink: '/contact/?plan=corporate-signature',
    features: [
      { name: 'Up to 20 Unique Pages & Bespoke Corporate Design', included: true },
      { name: 'Premium Corporate UI/UX with High-Trust Polish', included: true },
      { name: 'Advanced Content Management System (CMS)', included: true },
      { name: 'Team, Board & Leadership Directory System', included: true },
      { name: 'Comprehensive Service Catalog Management', included: true },
      { name: 'Blog, Newsroom & Press Release CMS', included: true },
      { name: 'In-Depth Case Study & Success Story Sections', included: true },
      { name: 'Careers & Job Inquiry Application System', included: true },
      { name: 'Conversion-Oriented Corporate Service Funnels', included: true },
      { name: 'Lead Source Attribution Configuration', included: true },
      { name: 'Structured Data (JSON-LD) for Rich Google Snippets', included: true },
      { name: 'Advanced Technical SEO Setup & OpenGraph', included: true },
      { name: 'Independent Performance Audit & Review', included: true },
      { name: 'Enhanced Security Hardening & Rate Limiting', included: true },
      { name: 'Cloud Backup Configuration & Strategy', included: true },
      { name: 'Executive Admin Training & Documentation', included: true },
      { name: '৪ রাউন্ড Revision Support', included: true },
      { name: '৬০ দিন Extended Bug Support', included: true },
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.3 CUSTOM E-COMMERCE DEVELOPMENT PACKAGES (NO WOOCOMMERCE)
// -----------------------------------------------------------------------------
export const ECOMMERCE_PLANS: PricingPlan[] = [
  {
    id: 'commerce-start',
    name: 'Commerce Start',
    subtitle: 'Fast Modern Storefront',
    originalPrice: '৳৩৭,৪৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৭,৫০০',
    price: '৳২৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '১৫–২০ কার্যদিবস',
    supportDuration: '৩০ দিন বাগ সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: 'Next.js কোর • ৬ ফ্রন্টএন্ড ভিউ • ৫০ প্রোডাক্ট আপলোড',
    category: 'ecommerce',
    idealFor: 'নতুন ই-কমার্স ব্র্যান্ড ও বুটিকের জন্য দ্রুততম ও বাগ-মুক্ত অনলাইন শপ।',
    description: 'কোনো স্লো ওয়ার্ডপ্রেস/উকমার্স নয়! আমাদের নিজস্ব নেক্সট.জেএস ও পোস্টগ্রেস কমার্স কোরে নির্মিত সাব-সেকেন্ড গতির স্টোরফ্রন্ট।',
    ctaText: 'Launch Commerce Start',
    ctaLink: '/contact/?plan=commerce-start',
    features: [
      { name: '6 Unique Frontend Templates (Shop, Detail, Cart, Checkout, Info)', included: true },
      { name: '5 Basic Admin Screens (Products, Orders, Stock, Settings)', included: true },
      { name: '50 Initial Product Entries by Our Team', included: true },
      { name: 'High-Speed Modern Storefront (Next.js & TypeScript)', included: true },
      { name: 'Product & Multi-Level Category Management', included: true },
      { name: 'Cart & Seamless 1-Page Checkout Flow', included: true },
      { name: 'Cash on Delivery (COD) Payment Flow', included: true },
      { name: 'Basic Order Management with Status Updates', included: true },
      { name: 'Basic Inventory & Out-of-Stock Badging', included: true },
      { name: 'WhatsApp Order Notification Integration', included: true },
      { name: 'Mobile-Optimised Touch Friendly UI', included: true },
      { name: 'SSL / HTTPS & Secure Authentication', included: true },
      { name: 'Strict Input Validation & Spam Protection', included: true },
      { name: 'Basic E-Commerce Product SEO Structure', included: true },
      { name: '৩০ দিন Bug Support & Admin Training', included: true },
    ],
  },
  {
    id: 'commerce-pro',
    name: 'Commerce Pro',
    subtitle: 'Gateway, Accounts & Cloud DB',
    featured: true,
    badge: 'MOST POPULAR',
    highlightBadge: 'ই-কমার্স ব্র্যান্ডের সবচেয়ে জনপ্রিয় পছন্দ',
    originalPrice: '৳৬২,৪৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১২,৫০০',
    price: '৳৪৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '২০–৩০ কার্যদিবস',
    supportDuration: '৪৫ দিন বাগ সাপোর্ট',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: 'পেমেন্ট গেটওয়ে • কাস্টমার একাউন্টস • PostgreSQL Neon DB',
    category: 'ecommerce',
    idealFor: 'বর্ধনশীল ডিটুসি (D2C) ও রিটেইল ব্র্যান্ড যাদের অনলাইন পেমেন্ট, অ্যাকাউন্টস ও সেপারেট ডাটাবেজ প্রয়োজন।',
    description: 'Start প্যাকেজের সকল সুবিধাসহ অনলাইন পেমেন্ট গেটওয়ে, কাস্টমার একাউন্টস, ভ্যারিয়েশন এবং সেপারেট ক্লাউড ডাটাবেজ।',
    ctaText: 'Scale with Commerce Pro',
    ctaLink: '/contact/?plan=commerce-pro',
    features: [
      { name: 'Everything in Commerce Start Package', included: true },
      { name: '10 Unique Frontend Templates (Account, Wishlist, Tracking)', included: true },
      { name: '8 Admin Screens with Advanced Operations', included: true },
      { name: '100 Initial Product Entries Configured', included: true },
      { name: 'Customer Accounts & Order History Dashboard', included: true },
      { name: 'Product Variations (Color, Size, Material, Custom SKU)', included: true },
      { name: 'Advanced Real-Time Order Tracking for Buyers', included: true },
      { name: 'One Payment Gateway (bKash/Nagad/SSLCommerz/AamarPay)', included: true },
      { name: 'Coupon, Promo Code & Discount Campaign Management', included: true },
      { name: 'Automated Low Stock Email/Admin Alerts', included: true },
      { name: 'Basic Financial Overview (Daily/Monthly Sales Ledger)', included: true },
      { name: 'Meta Pixel & GA4 E-Commerce Event Integration', included: true },
      { name: 'Separate Managed Cloud Database (PostgreSQL / Neon)', included: true },
      { name: 'Scheduled Automated Database Backup', included: true },
      { name: '৪৫ দিন Bug Support & Staff Onboarding', included: true },
    ],
  },
  {
    id: 'commerce-elite',
    name: 'Commerce Elite',
    subtitle: 'Full Commerce ERP Engine',
    originalPrice: '৳৯৯,৯৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳২০,০০০',
    price: '৳৭৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৩০–৪৫ কার্যদিবস',
    supportDuration: '৬০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৪ রাউন্ড Revision',
    deliverableSummary: 'ফুল কমার্স ERP • কুরিয়ার API • লয়্যালটি কয়েন • ১২ মডিউল',
    category: 'ecommerce',
    idealFor: 'বড় অনলাইন ব্র্যান্ড, ফ্যাশন হাউস ও হাই-ভলিউম রিটেইলার যাদের লয়্যালটি, বারকোড, কুরিয়ার এপিআই ও আরবিক্স প্রয়োজন।',
    description: 'আমাদের ফ্ল্যাগশিপ কমার্স প্ল্যাটফর্ম—১২টি প্রিমিয়াম মডিউল, ডুয়াল লেয়ার ক্লাউড আর্কিটেকচার ও স্বয়ংক্রিয় কুরিয়ার শিপিং।',
    ctaText: 'Dominate with Commerce Elite',
    ctaLink: '/contact/?plan=commerce-elite',
    features: [
      { name: 'Everything in Commerce Pro Package', included: true },
      { name: '15 Unique Frontend Templates (Loyalty, Custom Reviews, VIP)', included: true },
      { name: '12 Advanced Admin Operations Screens', included: true },
      { name: '200 Initial Product Entries Formatted & Uploaded', included: true },
      { name: 'Premium Customised UI/UX with High-Fashion Design System', included: true },
      { name: 'Centralised Advanced Commerce Dashboard', included: true },
      { name: 'Smart Order Lifecycle (Pending, Confirmed, Packed, Shipped, Delivered)', included: true },
      { name: 'Customer Loyalty Coin System (Configurable Spending Rules)', included: true },
      { name: 'Comprehensive Financial Dashboard (Sales, Expenses, Estimated Profit)', included: true },
      { name: 'Smart Inventory History & Stock Movements Ledger', included: true },
      { name: 'Printable Invoice & Barcode Courier Shipping Labels', included: true },
      { name: 'Granular Role-Based Staff Access (Admin, Manager, Dispatcher)', included: true },
      { name: 'One Courier Integration (Steadfast / Pathao / RedX API)', included: true },
      { name: 'Business Analytics & Cohort Performance Reporting', included: true },
      { name: 'Dual-Layer Application & Cloud Database Architecture', included: true },
      { name: 'Automated Backup & Disaster Recovery Protocol', included: true },
      { name: 'Enhanced Security & Fraud Order Detection', included: true },
      { name: '৬০ দিন Priority Bug Support & Live Staff Training', included: true },
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.4 MULTI-VENDOR MARKETPLACE DEVELOPMENT (SEPARATE CATEGORY)
// -----------------------------------------------------------------------------
export const MULTIVENDOR_PLANS: PricingPlan[] = [
  {
    id: 'multivendor-launch',
    name: 'Multi-Vendor Launch',
    subtitle: 'Marketplace Foundation',
    price: '৳১,৪৯,৯৯৯',
    period: 'Starting Price',
    timeline: 'Scope Based',
    delivery: '৪৫–৬০ কার্যদিবস',
    supportDuration: '৬০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: 'মাল্টি-ভেন্ডর কোর • ভেন্ডর ড্যাশবোর্ড • কমিশন ইঞ্জিন',
    category: 'multivendor',
    idealFor: 'নির্দিষ্ট নিশ বা সেক্টরের জন্য মাল্টি-ভেন্ডর প্ল্যাটফর্ম শুরু করার আর্কিটেকচারাল সমাধান।',
    description: 'গ্রাহকদের জন্য সেন্ট্রাল স্টোরফ্রন্ট, আলাদা ভেন্ডর পোর্টাল এবং এডমিনের জন্য সেন্ট্রাল কমিশন ম্যানেজমেন্ট সিস্টেম।',
    ctaText: 'Consult Multi-Vendor Launch',
    ctaLink: '/contact/?plan=multivendor-launch',
    features: [
      { name: 'Customer Facing Marketplace Storefront', included: true },
      { name: 'Vendor Self-Registration & Onboarding Workflow', included: true },
      { name: 'Central Admin Vendor Approval / Verification', included: true },
      { name: 'Independent Vendor Dashboard for Sellers', included: true },
      { name: 'Vendor Product Upload & Inventory Management', included: true },
      { name: 'Central Marketplace Admin Control Center', included: true },
      { name: 'Category & Global Commission Configuration', included: true },
      { name: 'Marketplace Multi-Item Order Splitting Logic', included: true },
      { name: 'Vendor Order Visibility & Status Updates', included: true },
      { name: 'Basic Vendor Sales & Payout Records', included: true },
      { name: 'Secure Authentication & Encryption', included: true },
      { name: 'Role-Based Access for Marketplace Operators', included: true },
      { name: 'Managed Cloud Database Architecture (PostgreSQL)', included: true },
      { name: '৬০ দিন Bug Support & Architecture Handover', included: true },
    ],
  },
  {
    id: 'multivendor-business',
    name: 'Multi-Vendor Business',
    subtitle: 'Advanced Payouts & Moderation',
    featured: true,
    badge: 'HIGH SCALE',
    highlightBadge: 'স্কেলড মার্কেটপ্লেসের নির্ভরযোগ্য প্ল্যাটফর্ম',
    price: '৳২,৪৯,৯৯৯',
    period: 'Starting Price',
    timeline: 'Scope Based',
    delivery: '৬০–৭৫ কার্যদিবস',
    supportDuration: '৯০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৪ রাউন্ড Revision',
    deliverableSummary: 'অ্যাডভান্সড ভেন্ডর পোর্টাল • মাল্টি-ওয়্যারেহাউস • কাস্টম পেআউট',
    category: 'multivendor',
    idealFor: 'বড় পরিসরে শত শত ভেন্ডর ও হাজার হাজার কাস্টমার হ্যান্ডেল করার জন্য বাণিজ্যিক মার্কেটপ্লেস।',
    description: 'Launch প্যাকেজের সকল সুবিধাসহ অ্যাডভান্সড ভেন্ডর সেটেলমেন্ট, প্রোডাক্ট মডারেশন ও ভেন্ডর অ্যানালিটিক্স।',
    ctaText: 'Build Multi-Vendor Business',
    ctaLink: '/contact/?plan=multivendor-business',
    features: [
      { name: 'Everything in Multi-Vendor Launch Package', included: true },
      { name: 'Advanced Vendor Operational Dashboard', included: true },
      { name: 'Dynamic Commission Rules by Vendor / Category', included: true },
      { name: 'Vendor Ledger, Payout Requests & Balance History', included: true },
      { name: 'Comprehensive Vendor Performance & Rating Reports', included: true },
      { name: 'Automated & Manual Product Moderation Workflow', included: true },
      { name: 'Verified Customer Reviews & Rating Moderation', included: true },
      { name: 'Marketplace & Vendor-Level Coupon Management', included: true },
      { name: 'Advanced Order Workflow & Dispute Handling', included: true },
      { name: 'Enhanced Central Admin Governance & Controls', included: true },
      { name: 'Detailed Marketplace Business Analytics', included: true },
      { name: 'Dual-Layer Scalable Cloud Infrastructure', included: true },
      { name: '৯০ দিন Dedicated Bug Support & Operational Training', included: true },
    ],
  },
  {
    id: 'multivendor-enterprise',
    name: 'Multi-Vendor Enterprise',
    subtitle: 'High-Availability Ecosystem',
    price: 'Custom Quotation',
    period: 'Bespoke Scope',
    timeline: 'Scope Based',
    delivery: 'Scope Defined',
    supportDuration: 'SLA Supported',
    revisionPolicy: 'Iterative Sprints',
    deliverableSummary: 'ফুল স্কেল মার্কেটপ্লেস ERP • ডেডিকেটেড টিম • কাস্টম SLA',
    category: 'multivendor',
    idealFor: 'লার্জ-স্কেল এন্টারপ্রাইজ মার্কেটপ্লেস যাদের মাল্টি-ওয়্যারহাউজ ও কাস্টম অটোমেটেড সেটেলমেন্ট প্রয়োজন।',
    description: 'সম্পূর্ণ কাস্টমাইজড সফটওয়্যার ইঞ্জিনিয়ারিং—উচ্চ ট্রাফিক সক্ষমতা, কাস্টম এপিআই ও এন্টারপ্রাইজ মনিটরিং।',
    ctaText: 'Request Enterprise Proposal',
    ctaLink: '/contact/?plan=multivendor-enterprise',
    features: [
      { name: 'Fully Bespoke Marketplace Software Architecture', included: true },
      { name: 'Custom Dynamic Commission & Tiered Bonus Rules', included: true },
      { name: 'Multi-Warehouse & Regional Inventory Routing', included: true },
      { name: 'Automated Vendor Settlement & Bank API Integration', included: true },
      { name: 'Third-Party ERP, Logistics & Tax API Integrations', included: true },
      { name: '24/7 Enterprise Health Monitoring & Alerts', included: true },
      { name: 'High-Availability Load-Balanced Cloud Infrastructure', included: true },
      { name: 'Custom Dispute, Refund & Legal Workflow Rules', included: true },
      { name: 'Full Source Code Ownership & Deployment CI/CD', included: true },
      { name: 'Dedicated Engineering Team & SLA Support', included: true },
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.5 CUSTOM SOFTWARE DEVELOPMENT PACKAGES
// -----------------------------------------------------------------------------
export const SOFTWARE_PACKAGES: PricingPlan[] = [
  {
    id: 'software-essential',
    name: 'Software Essential',
    subtitle: '2 Business Modules',
    originalPrice: '৳৪৯,৯৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১০,০০০',
    price: '৳৩৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '২০–৩০ কার্যদিবস',
    supportDuration: '৪৫ দিন বাগ সাপোর্ট',
    revisionPolicy: '২ রাউন্ড Revision',
    deliverableSummary: '২টি কোর বিজনেস মডিউল • ২ ইউজার রোল • PostgreSQL ডাটাবেজ',
    category: 'software',
    idealFor: 'ছোট ব্যবসা ও প্রতিষ্ঠানের জন্য নির্দিষ্ট দুটি মডিউলে অপারেশন অটোমেশন।',
    description: 'স্পেসিফিক দুটি বিজনেস মডিউল (যেমন ইনভেন্টরি ও সেলস বিলিং), স্ট্যান্ডার্ড ড্যাশবোর্ড ও দুটি ইউজার রোলের কার্যকরী সফটওয়্যার।',
    ctaText: 'Choose Software Essential',
    ctaLink: '/contact/?plan=software-essential',
    features: [
      { name: '2 Tailored Core Business Modules (e.g. Inventory + Billing)', included: true },
      { name: 'Up to 2 Granular User Roles (e.g. Admin, Staff)', included: true },
      { name: 'Clean Standard Metrics Dashboard', included: true },
      { name: 'Secure JWT / Session Authentication', included: true },
      { name: 'PostgreSQL Relational Database Integration', included: true },
      { name: 'Core CRUD Business Operations for All Entities', included: true },
      { name: 'Basic Tabular Reporting & Filtering', included: true },
      { name: 'Security Configuration & Input Sanitization', included: true },
      { name: 'Automated Database Backup Configuration', included: true },
      { name: '৪৫ দিন Bug Support & User Walkthrough Guide', included: true },
    ],
  },
  {
    id: 'software-professional',
    name: 'Software Professional',
    subtitle: 'Up to 4 Business Modules',
    featured: true,
    badge: 'RECOMMENDED',
    highlightBadge: 'মাঝারি প্রতিষ্ঠানের সর্বাধিক পছন্দের সফটওয়্যার',
    originalPrice: '৳৮৭,৪৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳১৭,৫০০',
    price: '৳৬৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৩০–৪৫ কার্যদিবস',
    supportDuration: '৬০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৩ রাউন্ড Revision',
    deliverableSummary: '৪টি বিজনেস মডিউল • RBAC রোলস • অডিট ট্রেইল ও PDF/CSV',
    category: 'software',
    idealFor: 'মাঝারি প্রতিষ্ঠানের অপারেশন, হিসাব ও টিম সমন্বয় এক প্ল্যাটফর্মে আনতে।',
    description: '৪টি সমন্বিত বিজনেস মডিউল, অ্যাডভান্সড ড্যাশবোর্ড, আরবিক্স পারমিশন, অডিট লগ এবং সিএসভি/পিডিএফ এক্সপোর্ট সমৃদ্ধ সফটওয়্যার।',
    ctaText: 'Build Software Professional',
    ctaLink: '/contact/?plan=software-professional',
    features: [
      { name: 'Up to 4 Integrated Business Modules (e.g. POS, Stock, HRM, CRM)', included: true },
      { name: 'Up to 4 Dedicated User Roles with RBAC Permissions', included: true },
      { name: 'Advanced Executive Dashboard with Visual KPIs', included: true },
      { name: 'Advanced Analytical Reporting Engine', included: true },
      { name: 'One-Click CSV & Formatted PDF Data Export', included: true },
      { name: 'Granular Role-Based Permission Matrix', included: true },
      { name: 'Basic Audit Logs (Track user actions & data changes)', included: true },
      { name: 'Enhanced Security & Token-Based Protection', included: true },
      { name: 'Cloud Backup & Disaster Recovery Setup', included: true },
      { name: 'Live Admin & Staff Training Session', included: true },
      { name: '৬০ দিন Bug Support & Operational Maintenance', included: true },
    ],
  },
  {
    id: 'software-advanced',
    name: 'Software Advanced',
    subtitle: 'Customized Enterprise Suite',
    originalPrice: '৳১,৪৯,৯৯৯',
    discountBadge: '20% OFF',
    savingsText: 'সাশ্রয়: ৳৩০,০০০',
    price: '৳১,১৯,৯৯৯',
    period: 'One-Time Cost',
    timeline: 'One-Time Development',
    delivery: '৪৫–৬০ কার্যদিবস',
    supportDuration: '৯০ দিন বাগ সাপোর্ট',
    revisionPolicy: '৪ রাউন্ড Revision',
    deliverableSummary: 'কাস্টম এসআরএস আর্কিটেকচার • এপিআই ইন্টিগ্রেশন • ডুয়াল-লেয়ার ক্লাউড',
    category: 'software',
    idealFor: 'বড় কোম্পানি ও ইন্ডাস্ট্রিয়াল প্রতিষ্ঠানের জটিল বিজনেস লজিক ও এপিআই নির্ভর প্ল্যাটফর্ম।',
    description: 'অনুমোদিত এসআরএস অনুযায়ী কাস্টমাইজড মডিউল, এপিআই ইন্টিগ্রেশন, ক্লাউড ডাটাবেজ আর্কিটেকচার ও পূর্ণাঙ্গ টেকনিক্যাল ডকুমেন্টেশন।',
    ctaText: 'Deploy Software Advanced',
    ctaLink: '/contact/?plan=software-advanced',
    features: [
      { name: 'Customised Business Modules within Approved SRS Scope', included: true },
      { name: 'Advanced Multi-Department Role & Permission Management', included: true },
      { name: 'Custom Interactive Dashboard with Real-Time Data', included: true },
      { name: 'Deep Multi-Dimensional Business Reporting Engine', included: true },
      { name: 'External API Integration Based on Approved SRS', included: true },
      { name: 'Advanced Audit Trail & System Security Logs', included: true },
      { name: 'Dual-Layer Scalable Cloud Database Architecture', included: true },
      { name: 'Enterprise-Grade Security Hardening & Secret Isolation', included: true },
      { name: 'Automated Offsite Backup & Disaster Recovery Strategy', included: true },
      { name: 'Comprehensive Technical Architecture Documentation', included: true },
      { name: 'Hands-on Admin & Operational Staff Training', included: true },
      { name: '৯০ দিন Priority Bug Support & Technical Advisory', included: true },
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.6 SOFTWARE SOLUTIONS CATALOGUE (STARTING PRICES)
// -----------------------------------------------------------------------------
export interface SoftwareSolutionItem {
  id: string;
  title: string;
  bengaliTitle: string;
  startingPrice: string;
  desc: string;
  iconName: string;
  modules: string[];
}

export const SOFTWARE_SOLUTIONS_CATALOGUE: SoftwareSolutionItem[] = [
  {
    id: 'inventory',
    title: 'Inventory Management',
    bengaliTitle: 'ইনভেন্টরি ও ওয়্যারহাউজ সফটওয়্যার',
    startingPrice: '৳৩৯,৯৯৯',
    desc: 'রিয়েল-টাইম স্টক ট্র্যাকিং, বারকোড স্ক্যানিং, মাল্টি-ওয়্যারহাউজ মুভমেন্ট এবং অটোমেটেড লো-স্টক অ্যালার্ট।',
    iconName: 'Boxes',
    modules: ['Stock Ledger', 'Barcode & QR', 'Low Stock Alert', 'Supplier Management'],
  },
  {
    id: 'pos',
    title: 'POS & Billing System',
    bengaliTitle: 'পয়েন্ট অব সেল (POS) ও বিলিং',
    startingPrice: '৳৩৯,৯৯৯',
    desc: 'রিটেইল ও চেইন শপের জন্য দ্রুততম থার্মাল প্রিন্টিং, বারকোড বিলিং, ক্যাশ ড্রয়ার ও অফলাইন ক্যাশিং।',
    iconName: 'Receipt',
    modules: ['Fast Checkout', 'Thermal Print', 'Cash/Digital Pay', 'Daily Z-Report'],
  },
  {
    id: 'crm',
    title: 'CRM Software',
    bengaliTitle: 'কাস্টমার রিলেশনশিপ ম্যানেজমেন্ট (CRM)',
    startingPrice: '৳৪৯,৯৯৯',
    desc: 'লিড ট্র্যাকিং, সেলস পাইপলাইন ভিজ্যুয়ালাইজেশন, ক্লায়েন্ট কমিউনিকেশন হিস্ট্রি এবং টিম পারফরম্যান্স।',
    iconName: 'Users',
    modules: ['Lead Pipeline', 'Follow-up Alerts', 'Client Timeline', 'Conversion Metrics'],
  },
  {
    id: 'order-management',
    title: 'Order Management System (OMS)',
    bengaliTitle: 'অর্ডার ম্যানেজমেন্ট সিস্টেম (OMS)',
    startingPrice: '৳৪৪,৯৯৯',
    desc: 'ওয়েবসাইট, ফেসবুক ও ফোন অর্ডারের সেন্ট্রাল প্রসেসিং, কুরিয়ার বুকিং এবং পার্সেল ট্র্যাকিং অটোমেশন।',
    iconName: 'PackageCheck',
    modules: ['Multi-Channel Orders', 'Courier Dispatch', 'Return Tracking', 'Status Automation'],
  },
  {
    id: 'hrm',
    title: 'HRM & Payroll Software',
    bengaliTitle: 'এইচআরএম ও পেরোল সফটওয়্যার',
    startingPrice: '৳৫৯,৯৯৯',
    desc: 'এমপ্লয়ি প্রোফাইল, ফিঙ্গারপ্রিন্ট/বায়োমেট্রিক অ্যাটেনডেন্স, ছুটি ম্যানেজমেন্ট ও স্বয়ংক্রিয় স্যালারি শিট।',
    iconName: 'UserCheck',
    modules: ['Attendance Sync', 'Leave Workflow', 'Salary Slip PDF', 'Staff Directory'],
  },
  {
    id: 'project-management',
    title: 'Project Management Platform',
    bengaliTitle: 'প্রজেক্ট ও টিম কোলাবোরেশন',
    startingPrice: '৳৪৯,৯৯৯',
    desc: 'টাস্ক অ্যাসাইনমেন্ট, মাইলস্টোন ট্র্যাকিং, ক্লায়েন্ট প্রগ্রেস পোর্টাল এবং কাজের সময় মনিটরিং।',
    iconName: 'Kanban',
    modules: ['Task Boards', 'Milestones', 'Time Tracking', 'Document Vault'],
  },
  {
    id: 'restaurant',
    title: 'Restaurant Management System',
    bengaliTitle: 'রেস্তোরাঁ ও ক্যাফে ম্যানেজমেন্ট',
    startingPrice: '৳৬৯,৯৯৯',
    desc: 'কিচেন অর্ডার টিকিট (KOT), টেবিল বুকিং, ডাইন-ইন/টেকঅ্যাওয়ে বিলিং এবং রেসিপি ইনভেন্টরি ম্যানেজমেন্ট।',
    iconName: 'Utensils',
    modules: ['Kitchen KOT', 'Table Layout', 'Ingredient Stock', 'VAT Invoice'],
  },
  {
    id: 'school',
    title: 'School / Institute Management',
    bengaliTitle: 'স্কুল ও ইনস্টিটিউট ম্যানেজমেন্ট',
    startingPrice: '৳৭৯,৯৯৯',
    desc: 'স্টুডেন্ট ডাটাবেজ, অনলাইন ফি কালেকশন, রেজাল্ট শিট জেনারেশন, এসএমএস নোটিফিকেশন ও পেরেন্ট পোর্টাল।',
    iconName: 'GraduationCap',
    modules: ['Student Records', 'Fee Collection', 'Exam Results', 'SMS Gateway'],
  },
  {
    id: 'erp',
    title: 'ERP & Enterprise Platform',
    bengaliTitle: 'এন্টারপ্রাইজ ইআরপি (ERP) সিস্টেম',
    startingPrice: '৳১,৪৯,৯৯৯+',
    desc: 'উত্পাদন, সাপ্লাই চেইন, অ্যাকাউন্টিং এবং একাধিক ডিপার্টমেন্টের জন্য সম্পূর্ণ সমন্বিত এন্টারপ্রাইজ সিস্টেম।',
    iconName: 'Building2',
    modules: ['Multi-Branch Sync', 'Financial Ledger', 'Supply Chain', 'Custom API'],
  },
];

// -----------------------------------------------------------------------------
// 8.7 COMMERCE ELITE — 12 PREMIUM FEATURES SHOWCASE
// -----------------------------------------------------------------------------
export interface CommerceEliteFeature {
  id: number;
  title: string;
  bengaliTitle: string;
  benefit: string;
  technicalAdvantage: string;
}

export const COMMERCE_ELITE_12_FEATURES: CommerceEliteFeature[] = [
  {
    id: 1,
    title: 'Advanced Admin Dashboard',
    bengaliTitle: 'সেন্ট্রালাইজড বিজনেস ড্যাশবোর্ড',
    benefit: 'এক নজরে মোট বিক্রি, মুলতুবি অর্ডার, রিটার্ন রেট ও গ্রাহক প্রবৃদ্ধির স্বচ্ছ ব্যবসায়িক চিত্র পান।',
    technicalAdvantage: 'হাই-স্পিড নেক্সট.জেএস সার্ভার কম্পোনেন্টস ও ক্যাশিংয়ের মাধ্যমে রিয়েল-টাইম বিজনেস মেট্রিক্স।',
  },
  {
    id: 2,
    title: 'Smart Order Lifecycle',
    bengaliTitle: 'স্মার্ট অর্ডার লাইফসাইকেল ম্যানেজমেন্ট',
    benefit: 'পেন্ডিং, কনফার্মড, প্যাকড, শিপড ও ডেলিভারড—প্রতিটি ধাপ নির্ভুলভাবে ট্র্যাক করে ভুলের ঝুঁকি দূর করে।',
    technicalAdvantage: 'অটোমেটিক স্ট্যাটাস ট্রানজিশন স্টেট মেশিন যা অর্ডার প্রসেসিংয়ের সময় স্টাফদের ভুলের অবকাশ দেয় না।',
  },
  {
    id: 3,
    title: 'Loyalty Coin System',
    bengaliTitle: 'কাস্টমার লয়্যালটি কয়েন সিস্টেম',
    benefit: 'প্রতি ৳১০০ কেনাকাটায় ১টি লয়্যালটি কয়েন—যা পরবর্তীতে কেনাকাটায় রিডিম করে কাস্টমার রিটেনশন ৫০% বৃদ্ধি করে।',
    technicalAdvantage: 'কনফিগারেবল রিডেম্পশন রুলস ও লেজার-বেসড পয়েন্ট ব্যালেন্স ট্র্যাকিং সিস্টেম।',
  },
  {
    id: 4,
    title: 'Financial Dashboard',
    bengaliTitle: 'ফাইন্যান্সিয়াল অ্যান্ড প্রফিট ড্যাশবোর্ড',
    benefit: 'বিক্রি, পণ্যের খরচ (COGS), কুরিয়ার চার্জ এবং আনুমানিক প্রকৃত লাভ ক্যালকুলেট করে সঠিক সিদ্ধান্ত নিন।',
    technicalAdvantage: 'অটোমেটেড লেজার অ্যাকাউন্টিং ক্যালকুলেশন যা ক্যাশ ফ্লো ও নেট মার্জিন রিয়েল-টাইমে রেন্ডার করে।',
  },
  {
    id: 5,
    title: 'Smart Inventory Management',
    bengaliTitle: 'স্মার্ট ইনভেন্টরি ও স্টক হিস্ট্রি',
    benefit: 'প্রতিটি পণ্য কখন ইন হলো বা আউট হলো তার পুঙ্খানুপুঙ্খ অডিট ট্রেল রাখুন, কোনো পণ্য হারিয়ে যাওয়া অসম্ভব।',
    technicalAdvantage: 'অ্যাটমিক ডাটাবেজ ট্রানজ্যাকশন যার ফলে একই সাথে একাধিক অর্ডারেও কখনো ওভার-সেলিং হয় না।',
  },
  {
    id: 6,
    title: 'Automated Low Stock Alerts',
    bengaliTitle: 'স্বয়ংক্রিয় লো-স্টক নোটিফিকেশন',
    benefit: 'নির্দিষ্ট থ্রেশহোল্ডে পণ্য নেমে আসলেই সাথে সাথে এডমিনকে অ্যালার্ট করে, যাতে হট-সেলিং প্রোডাক্ট কখনো স্টকআউট না হয়।',
    technicalAdvantage: 'ব্যাকগ্রাউন্ড ওয়ার্কার সার্ভিস যা নিয়মিত স্টক থ্রেশহোল্ড চেক করে অ্যালার্ট পুশ করে।',
  },
  {
    id: 7,
    title: 'Invoice & Barcode Courier Label',
    bengaliTitle: 'প্রফেশনাল ইনভয়েস ও বারকোড লেবেল',
    benefit: 'এক ক্লিকেই প্রিন্টযোগ্য কাস্টমার ইনভয়েস ও কুরিয়ার পার্সেল বারকোড স্টিকার প্রিন্ট করে প্যাকেজিং দ্রুত করুন।',
    technicalAdvantage: 'সার্ভার-সাইড ভেক্টর পিডিএফ ও বারকোড জেনারেশন যা যেকোনো থার্মাল ও লেজার প্রিন্টারে ক্রিস্প প্রিন্ট দেয়।',
  },
  {
    id: 8,
    title: 'Customer Management & Profiles',
    bengaliTitle: 'গ্রাহক প্রোফাইল ও অর্ডার হিস্ট্রি',
    benefit: 'নিয়মিত ক্রেতাদের চিহ্নিত করুন, তাদের কেনাকাটার পরিমাণ জানুন এবং পার্সোনালাইজড সাপোর্ট দিন।',
    technicalAdvantage: 'কম্প্রিহেন্সিভ কাস্টমার ডাটা মডেল যা ফোন নম্বর বা ইমেইলে সমস্ত পূর্ববর্তী অর্ডার সংযুক্ত রাখে।',
  },
  {
    id: 9,
    title: 'Coupon & Discount Engine',
    bengaliTitle: 'কুপন ও ক্যাম্পেইন ডিসকাউন্ট ইঞ্জিন',
    benefit: 'ফ্ল্যাট ছাড়, শতকরা ডিসকাউন্ট বা ফ্রি ডেলিভারি অফার দিন নির্দিষ্ট তারিখ ও ব্যবহারের সীমা নির্ধারণ করে।',
    technicalAdvantage: 'অ্যাডভান্সড ভ্যালিডেশন ইঞ্জিন যা কার্ট লেভেলে একাধিক শর্ত (মিনিমাম খরচ, ক্যাটাগরি) যাচাই করে।',
  },
  {
    id: 10,
    title: 'Role-Based Staff Access (RBAC)',
    bengaliTitle: 'কর্মীদের রোল-ভিত্তিক অনুমতি নিয়ন্ত্রণ',
    benefit: 'অর্ডার প্যাকেজিং কর্মীরা শুধু অর্ডার দেখতে পারবে, ফাইন্যান্সিয়াল লাভ বা পণ্য পরিবর্তনের পারমিশন তাদের থাকবে না।',
    technicalAdvantage: 'গ্র্যানুলার পারমিশন গার্ড যা এডমিন ছাড়া কোনো স্টাফকে সংবেদনশীল ব্যবসায়িক তথ্য দেখতে দেয় না।',
  },
  {
    id: 11,
    title: 'Business Analytics & Reporting',
    bengaliTitle: 'ব্যবসায়িক অ্যানালিটিক্স ও রিপোর্টস',
    benefit: 'কোন পণ্য সবচেয়ে বেশি বিক্রি হচ্ছে এবং কোন অঞ্চলের কাস্টমার বেশি তা চার্ট ও গ্রাফের মাধ্যমে বিশ্লেষণ করুন।',
    technicalAdvantage: 'অপ্টিমাইজড এসকিউএল অ্যাগ্রিগেশন ও ক্যাশড অ্যানালিটিক্স যা ডাটাবেজ স্লোডাউন ছাড়াই দ্রুত রিপোর্ট দেখায়।',
  },
  {
    id: 12,
    title: 'Dual-Layer Server & Cloud DB Architecture',
    bengaliTitle: 'ডুয়াল-লেয়ার ক্লাউড ডাটাবেজ আর্কিটেকচার',
    benefit: 'অ্যাপ্লিকেশন ও ডাটাবেজ আলাদা সার্ভারে থাকায় ট্রাফিক বাড়লেও ওয়েবসাইট ক্র্যাশ করে না এবং ডাটা সুরক্ষিত থাকে।',
    technicalAdvantage: 'ম্যানেজড PostgreSQL (Neon) ক্লাউড ক্লাস্টার এবং অটোমেটিক পয়েন্ট-ইন-টাইম রিকভারি ব্যাকআপ পলিসি।',
  },
];

// -----------------------------------------------------------------------------
// 8.8 SECURITY AS A CORE SELLING POINT
// "আপনার ব্যবসার তথ্য, আমাদের দায়িত্বশীল প্রযুক্তি।"
// -----------------------------------------------------------------------------
export interface SecurityTier {
  id: string;
  name: string;
  bengaliName: string;
  badge: string;
  description: string;
  items: string[];
}

export const SECURITY_TIERS: SecurityTier[] = [
  {
    id: 'essential-sec',
    name: 'Essential Security',
    bengaliName: 'এসেনশিয়াল সিকিউরিটি',
    badge: 'সকল প্যাকেজে অন্তর্ভুক্ত',
    description: 'বেসিক ওয়েবসাইট ও ল্যান্ডিং পেজের জন্য স্ট্যান্ডার্ড ডাটা সুরক্ষা ও এনক্রিপশন।',
    items: [
      'SSL / HTTPS বাধ্যতামূলক এনক্রিপশন কনফিগারেশন',
      'প্রযোজ্য ক্ষেত্রে সুরক্ষিত পাসওয়ার্ড হ্যাশিং ও অথেনটিকেশন',
      'কঠোর ফর্ম ইনপুট ভ্যালিডেশন ও এক্সএসএস (XSS) প্রতিরোধ',
      'স্প্যাম ও বট অ্যাটাক প্রতিরোধে সিকিউর ফর্ম হ্যান্ডলিং',
      'বেসিক আইপি অ্যাক্সেস প্রটেকশন ও হেডার সিকিউরিটি',
      'এনভায়রনমেন্ট সিক্রেট ও এপিআই কি আইসোলেশন',
    ],
  },
  {
    id: 'professional-sec',
    name: 'Professional Security',
    bengaliName: 'প্রফেশনাল সিকিউরিটি',
    badge: 'প্রো ও কমার্স প্যাকেজে অন্তর্ভুক্ত',
    description: 'গ্রোথ বিজনেস ও ই-কমার্স স্টোরের জন্য শক্তিশালী একাউন্ট সুরক্ষা ও ডাটাবেজ গার্ড।',
    items: [
      'এসেনশিয়াল সিকিউরিটির সকল সুবিধাসমূহ',
      'এনহ্যান্সড অথেনটিকেশন কন্ট্রোল ও রেট লিমিটিং (DDoS প্রতিরোধ)',
      'গ্র্যানুলার রোল-বেসড পারমিশনস (RBAC)',
      'সার্ভার-লেভেল সিকিউরিটি হার্ডেনিং ও সিআরএফ (CSRF) প্রটেকশন',
      'ডাটাবেজ ডিরেক্ট অ্যাক্সেস প্রটেকশন ও সিকিউর কানেকশন পুল',
      'অটোমেটেড ডাটাবেজ ব্যাকআপ কনফিগারেশন',
      'সার্ভার এরর ও এক্সেপশন মনিটরিং কনফিগারেশন',
    ],
  },
  {
    id: 'premium-sec',
    name: 'Premium Security',
    bengaliName: 'প্রিমিয়াম এন্টারপ্রাইজ সিকিউরিটি',
    badge: 'এলিট ও কাস্টম সফটওয়্যারে অন্তর্ভুক্ত',
    description: 'শীর্ষস্থানীয় কর্পোরেট ও এন্টারপ্রাইজ সিস্টেমের জন্য অডিট ট্রেইল ও ক্লাউড আইসোলেশন।',
    items: [
      'প্রফেশনাল সিকিউরিটির সকল সুবিধাসমূহ',
      'উন্নত অডিট লগিং (কে কখন কোন ডাটা পরিবর্তন বা ডিলিট করেছে)',
      'অ্যাডভান্সড অ্যাক্সেস কন্ট্রোল ও সেশন ইনভ্যালিডেশন গার্ড',
      'অ্যাপ্লিকেশন ও ডাটাবেজ সার্ভারের সম্পূর্ণ ক্লাউড আইসোলেশন',
      'পয়েন্ট-ইন-টাইম রিকভারি ও অফসাইট ক্লাউড ব্যাকআপ স্ট্র্যাটেজি',
      'ইন্ডিপেনডেন্ট সিকিউরিটি কনফিগারেশন রিভিউ ও ভালনারেবিলিটি চেক',
      'রিয়েল-টাইম পারফরম্যান্স ও ট্রাফিক হেলথ মনিটরিং',
      'কম্প্রিহেন্সিভ ডিজাস্টার রিকভারি ডকুমেন্টেশন ও প্রটোকল',
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.9 PREMIUM CLOUD INFRASTRUCTURE COMPARISON
// -----------------------------------------------------------------------------
export interface InfrastructureOption {
  id: string;
  title: string;
  bengaliTitle: string;
  bestFor: string;
  description: string;
  specs: string[];
}

export const INFRASTRUCTURE_COMPARISON: InfrastructureOption[] = [
  {
    id: 'standard-hosting',
    title: 'A. Standard Single-Server Hosting',
    bengaliTitle: 'স্ট্যান্ডার্ড সিঙ্গেল-সার্ভার হোস্টিং',
    bestFor: 'বেসিক ল্যান্ডিং পেজ ও সাধারণ তথ্যবহুল বিজনেস ওয়েবসাইট।',
    description: 'অ্যাপ্লিকেশন কোড এবং ডাটাবেজ একই সার্ভারে চলে। সীমিত ট্রাফিকের জন্য সাশ্রয়ী তবে ভারী ট্রাফিকে চাপ সৃষ্টি হতে পারে।',
    specs: [
      'Next.js অ্যাপ্লিকেশন ও লোকাল ডাটাবেজ সিঙ্গেল নোডে',
      'সীমিত ট্রাফিকে দ্রুত ও নির্ভরযোগ্য পারফরম্যান্স',
      'বেসিক মেমরি ও স্টোরেজ অপটিমাইজেশন',
      'ডেইলি শিডিউলড ব্যাকআপ',
    ],
  },
  {
    id: 'separate-app-db',
    title: 'B. Separate App & Cloud DB Architecture',
    bengaliTitle: 'সেপারেট অ্যাপ্লিকেশন ও ক্লাউড ডাটাবেজ',
    bestFor: 'গ্রোইং ই-কমার্স স্টোর, কাস্টম সফটওয়্যার ও প্রফেশনাল প্ল্যাটফর্ম।',
    description: 'ফ্রন্টএন্ড অ্যাপ্লিকেশন চলে হাই-স্পিড এজ নোডে এবং ডাটাবেজ চলে স্বতন্ত্র ক্লাউড ক্লাস্টারে (Managed PostgreSQL / Neon)। ফলে ট্রাফিক স্পাইকে ডাটা সুরক্ষিত থাকে।',
    specs: [
      'স্বাধীন অ্যাপ্লিকেশন নোড ও ডেডিকেটেড ক্লাউড PostgreSQL',
      'ডাটাবেজ ওভারলোড ও সার্ভার ক্র্যাশ হওয়ার ঝুঁকি শূন্যের কোঠায়',
      'স্বয়ংক্রিয় পয়েন্ট-ইন-টাইম রিকভারি ব্যাকআপ ব্যবস্থা',
      'জিরো-ডাউনটাইম ফ্রন্টএন্ড ডিপ্লয়মেন্ট সুবিধা',
    ],
  },
  {
    id: 'enterprise-ha',
    title: 'C. Enterprise High Availability (HA)',
    bengaliTitle: 'এন্টারপ্রাইজ হাই-অ্যাভেইল্যাবিলিটি ক্লাস্টার',
    bestFor: 'হাই-ভলিউম মার্কেটপ্লেস, ব্যাংক, ফিনটেক ও জাতীয় পর্যায়ের কর্পোরেট পোর্টাল।',
    description: 'একাধিক সার্ভার নোড, ক্লাউড লোড ব্যালেন্সার এবং অটোমেটেড ফেইলওভার আর্কিটেকচার যা লাখ লাখ ব্যবহারকারীর চাপ একসাথে সামলাতে সক্ষম।',
    specs: [
      'মাল্টিপল অ্যাপ্লিকেশন ইনস্ট্যান্স ও ক্লাউড লোড ব্যালেন্সার',
      'অটোমেটেড হেলথ চেক ও ইনস্ট্যান্ট ফেইলওভার প্রটোকল',
      'ডাটাবেজ রিড-রেপ্লিকা ও হাই-থ্রুপুট কানেকশন পুলিং',
      'গ্লোবাল সিডিএন ক্যাশিং, স্ট্রেস লোড টেস্টিং ও ২৪/৭ মনিটরিং',
    ],
  },
];

// -----------------------------------------------------------------------------
// 8.10 EDUCATIONAL COMPARISON: BASIC WEBSITE VS TOTO PROFESSIONAL
// 10 Criteria: UI/UX, Workflow, Database, Security, Backup, Testing, Admin, Upgrade, Docs, Support
// -----------------------------------------------------------------------------
export interface ComparisonCriteria {
  criteria: string;
  bengaliCriteria: string;
  basicOffering: string;
  totoProfessional: string;
}

export const BASIC_VS_TOTO_COMPARISON: ComparisonCriteria[] = [
  {
    criteria: 'UI/UX Quality',
    bengaliCriteria: 'ডিজাইন ও ইউজার এক্সপেরিয়েন্স',
    basicOffering: 'ফ্রি ওয়ার্ডপ্রেস থিম বা পাইরেটেড টেমপ্লেট কপি। স্লো ও জেনেরিক লুক।',
    totoProfessional: 'কাস্টম ফিগমা আর্কিটেকচার ও মবিন-গ্রেড আধুনিক ইন্টারফেস। সুনির্দিষ্ট ব্র্যান্ড আইডেন্টিটি।',
  },
  {
    criteria: 'Business Workflow',
    bengaliCriteria: 'ব্যবসায়িক কার্যপদ্ধতি ও লজিক',
    basicOffering: 'থিমের ডিফল্ট অপশন যা আপনার ব্যবসার আসল মডেলের সাথে মেলে না।',
    totoProfessional: 'আপনার নিজস্ব অর্ডার ফ্লো, লয়্যালটি রুলস ও ইনভেন্টরি চাহিদামতো টেলর-মেড ইঞ্জিনিয়ারিং।',
  },
  {
    criteria: 'Database Architecture',
    bengaliCriteria: 'ডাটাবেজ ও পারফরম্যান্স',
    basicOffering: 'ওয়ার্ডপ্রেসের ভারী মেমোরি কনজিউমিং সিঙ্গেল টেবিল স্কিমা, যা অল্প প্রোডাক্টেই স্লো হয়ে যায়।',
    totoProfessional: 'হাই-কনকারেন্সি রিল্যাশনাল PostgreSQL ক্লাস্টার যা লাখ লাখ ডাটা রো দ্রুত হ্যান্ডেল করে।',
  },
  {
    criteria: 'Security Controls',
    bengaliCriteria: 'নিরাপত্তা ও ডাটা প্রটেকশন',
    basicOffering: 'প্লাগইন নির্ভর সিকিউরিটি যা প্রায়ই হ্যাক ও ডেটা ফাঁসের ঝুঁকিতে পড়ে।',
    totoProfessional: 'কোড-লেভেল ইনপুট স্যানিটাইজেশন, রেট-লিমিটিং, সিক্রেট আইসোলেশন ও গ্র্যানুলার আরবিক্স।',
  },
  {
    criteria: 'Backup Strategy',
    bengaliCriteria: 'ব্যাকআপ ও রিকভারি',
    basicOffering: 'কোনো স্বয়ংক্রিয় ব্যাকআপ নেই বা লোকাল সার্ভারেই ব্যাকআপ থাকে যা ক্র্যাশে নষ্ট হয়।',
    totoProfessional: 'ক্লাউড আইসোলেটেড শিডিউলড ব্যাকআপ এবং পয়েন্ট-ইন-টাইম ডিজাস্টার রিকভারি প্রটোকল।',
  },
  {
    criteria: 'Performance Testing',
    bengaliCriteria: 'স্পিড ও লোড টেস্টিং',
    basicOffering: 'লাইটহাউস স্কোর ৩০–৫০, প্রচুর থার্ড-পার্টি স্ক্রিপ্টে মোবাইল ব্রাউজারে ৩-৫ সেকেন্ড লেটেন্সি।',
    totoProfessional: 'নেক্সট.জেএস প্রি-রেন্ডারিং, অপ্টিমাইজড ইমেজ ও লাইটহাউস ৯০+ স্কোর (<১.৮ সেকেন্ড লোড)।',
  },
  {
    criteria: 'Admin Management',
    bengaliCriteria: 'এডমিন কন্ট্রোল ও ড্যাশবোর্ড',
    basicOffering: 'অপ্রয়োজনীয় জটিল প্লাগইন সেটিংস যুক্ত ইন্টারফেস যা চালাতে স্টাফদের বেগ পেতে হয়।',
    totoProfessional: 'ক্লিন, মিনিমালিস্ট ও দ্রুতগতির কাস্টম এডমিন প্যানেল যা যেকোনো নতুন স্টাফ ৫ মিনিটে শিখতে পারে।',
  },
  {
    criteria: 'Upgrade Flexibility',
    bengaliCriteria: 'ভবিষ্যৎ সম্প্রসারণ সুবিধা',
    basicOffering: 'নতুন ফিচার যোগ করতে গেলে পুরো ওয়েবসাইট ভেঙে যাওয়ার ঝুঁকি থাকে।',
    totoProfessional: 'মডুলার কম্পোনেন্ট আর্কিটেকচার—যেকোনো সময় নতুন ফিচার বা এপিআই সহজে ইন্টিগ্রেট করা যায়।',
  },
  {
    criteria: 'Documentation',
    bengaliCriteria: 'ডকুমেন্টেশন ও সোর্স কোড',
    basicOffering: 'কোনো ডকুমেন্টেশন নেই, কোডের আসল সোর্স বা গিটলগ হ্যান্ডওভার করা হয় না।',
    totoProfessional: 'স্বচ্ছ গিট রিপোজিটরি এক্সেস, আর্কিটেকচার ওভারভিউ এবং প্রয়োজনীয় ভিডিও হ্যান্ডওভার।',
  },
  {
    criteria: 'Technical Support',
    bengaliCriteria: 'ডেলিভারি পরবর্তী সাপোর্ট',
    basicOffering: 'ডেলিভারির পর যোগাযোগ বন্ধ অথবা সামান্য পরিবর্তনের জন্যও অতিরিক্ত চার্জ দাবি।',
    totoProfessional: 'নির্দিষ্ট মেয়াদের প্রতিশ্রুত বাগ সাপোর্ট (১৫–৯০ দিন), ডেডিকেটেড হোয়াটসঅ্যাপ চ্যানেল ও প্রফেশনাল দায়বদ্ধতা।',
  },
];

// -----------------------------------------------------------------------------
// 8.11 DEVELOPMENT ADD-ON FEATURES (TRANSPARENT OPTIONAL EXTRAS)
// -----------------------------------------------------------------------------
export interface DevelopmentAddon {
  id: string;
  name: string;
  bengaliName: string;
  price: string;
  desc: string;
}

export const DEVELOPMENT_ADDONS: DevelopmentAddon[] = [
  {
    id: 'addon-extra-page',
    name: 'Additional Custom Page',
    bengaliName: 'অতিরিক্ত কাস্টম পেজ ডিজাইন',
    price: '৳২,৪৯৯ / পেজ',
    desc: 'প্যাকেজের অতিরিক্ত যেকোনো ইউনিক পেজ ডিজাইন, রেসপনসিভ লেআউট ও কনটেন্ট ফরম্যাটিং।',
  },
  {
    id: 'addon-payment-gateway',
    name: 'Extra Payment Gateway Integration',
    bengaliName: 'অতিরিক্ত অনলাইন পেমেন্ট গেটওয়ে',
    price: '৳৫,০০০ / গেটওয়ে',
    desc: 'bKash, Nagad, SSLCommerz, Shurjopay বা আন্তর্জাতিক Stripe গেটওয়ে সংযোগ ও সিকিউর টেস্ট।',
  },
  {
    id: 'addon-courier-api',
    name: 'Automated Courier API Integration',
    bengaliName: 'কুরিয়ার এপিআই অটোমেশন',
    price: '৳৬,০০০ / কুরিয়ার',
    desc: 'Steadfast, Pathao বা RedX কুরিয়ারে অটোমেটিক পার্সেল বুকিং, ট্র্যাকিং কোড ও স্ট্যাটাস সিঙ্ক।',
  },
  {
    id: 'addon-loyalty-system',
    name: 'Customer Loyalty Coin Engine',
    bengaliName: 'কাস্টমার লয়্যালটি কয়েন সিস্টেম',
    price: '৳৮,০০০',
    desc: 'কেনাকাটায় গ্রাহকদের রিওয়ার্ড কয়েন অর্জন ও পরবর্তী কেনাকাটায় কয়েন ব্যবহারের সম্পূর্ণ মডিউল।',
  },
  {
    id: 'addon-staff-roles',
    name: 'Additional RBAC Staff Roles',
    bengaliName: 'অতিরিক্ত স্টাফ রোলস ও পারমিশন',
    price: '৳৪,০০০ / রোল',
    desc: 'ডেসপ্যাচার, ম্যানেজার, অ্যাকাউন্ট্যান্ট বা কাস্টমার সাপোর্ট কর্মীদের জন্য নির্দিষ্ট স্ক্রিন অ্যাক্সেস।',
  },
  {
    id: 'addon-advanced-reporting',
    name: 'Advanced Financial & Sales Reporting',
    bengaliName: 'অ্যাডভান্সড ফাইন্যান্সিয়াল রিপোর্টিং',
    price: '৳৭,৫০০',
    desc: 'প্রফিট/লস এনালাইসিস, ইনভেন্টরি ভ্যালুয়েশন ও কাস্টম ডেট রেঞ্জে পিডিএফ/সিএসভি এক্সপোর্ট।',
  },
  {
    id: 'addon-multi-language',
    name: 'Bilingual (Bangla + English) Switcher',
    bengaliName: 'দ্বিভাষিক (বাংলা + ইংরেজি) সিস্টেম',
    price: '৳৬,০০০',
    desc: 'পুরো ওয়েবসাইট বা স্টোরে বাংলা ও ইংরেজি ভাষার এক-ক্লিক পরিবর্তন ব্যবস্থা।',
  },
  {
    id: 'addon-custom-crm-sync',
    name: 'CRM / ERP Third-Party API Sync',
    bengaliName: 'সিআরএম / ইআরপি থার্ড-পার্টি এপিআই সিঙ্ক',
    price: '৳১০,০০০ থেকে',
    desc: 'আপনার চলমান বাহ্যিক সফটওয়্যার বা ডাটাবেজের সাথে ওয়েবসাইট লিড বা অর্ডার রিয়েল-টাইম সিঙ্ক।',
  },
  {
    id: 'addon-enterprise-infra',
    name: 'Enterprise High-Availability Deployment',
    bengaliName: 'এন্টারপ্রাইজ হাই-অ্যাভেইল্যাবিলিটি ক্লাউড',
    price: 'কাস্টম কোটেশন',
    desc: 'লোড ব্যালেন্সার, মাল্টি-ইনস্ট্যান্স রিডানড্যান্সি, অটো-ফেইলওভার ও গ্লোবাল ক্লাউড সিডিএন সেটআপ।',
  },
];

// -----------------------------------------------------------------------------
// 8.12 COMPREHENSIVE PRICING & DEVELOPMENT FAQS
// -----------------------------------------------------------------------------
export const DEV_PRICING_FAQS: FAQItem[] = [
  {
    id: 'dev-faq-1',
    question: 'প্যাকেজের মূল্যের বাইরে ডোমেইন ও হোস্টিংয়ের খরচ কি অন্তর্ভুক্ত?',
    answer: 'প্যাকেজের মূল্যটি হলো ওয়ান-টাইম (এককালীন) সফটওয়্যার ইঞ্জিনিয়ারিং ও ওয়েবসাইট ডেভেলপমেন্ট ফি। ডোমেইন ও ক্লাউড হোস্টিং সরাসরি আপনার নিজের নামে বা প্রতিষ্ঠানের ক্লাউড একাউন্টে থাকবে, যাতে ডাটার শতভাগ মালিকানা আপনার থাকে। আপনার প্রয়োজন অনুযায়ী উপযুক্ত ডোমেইন ও বাজেট-ফ্রেন্ডলি ক্লাউড হোস্টিং সেটআপে আমাদের টিম সম্পূর্ণ বিনামূল্যে কারিগরি সহায়তা দেবে।',
  },
  {
    id: 'dev-faq-2',
    question: 'এটি কি এককালীন খরচ নাকি প্রতি মাসে কোনো চার্জ দিতে হবে?',
    answer: 'আমাদের সকল ওয়েবসাইট ও সফটওয়্যার ডেভেলপমেন্ট প্যাকেজ এককালীন (One-Time Development Cost)। কোনো প্রকার মাসিক লুকানো চার্জ নেই। ওয়েবসাইট তৈরি সম্পন্ন হওয়ার পর ওয়েবসাইট বা সফটওয়্যারের মালিকানা সম্পূর্ণ আপনার। শুধুমাত্র তৃতীয় পক্ষের যেসকল রিকারিং সার্ভিস (যেমন বাৎসরিক ডোমেইন রিনিউয়াল বা ক্লাউড সার্ভার বিল) সেগুলো আপনি সরাসরি প্রোভাইডারকে পরিশোধ করবেন।',
  },
  {
    id: 'dev-faq-3',
    question: 'সোর্স কোডের মালিকানা কার থাকবে?',
    answer: 'সম্পূর্ণ সোর্স কোড ও ডাটাবেজের পূর্ণ মালিকানা শতভাগ আপনার! প্রজেক্ট ডেলিভারির সাথে সাথে আমরা আপনার নিজস্ব গিটল্যাব/গিটহাব রিপোজিটরিতে সম্পূর্ণ ক্লিন, কমেন্টেড ও প্রোডাকশন-রেডি সোর্স কোড পুশ করে হস্তান্তর করি। কোনো ভেন্ডর-লকইন নেই।',
  },
  {
    id: 'dev-faq-4',
    question: 'পেমেন্ট টার্মস বা কিস্তি কীভাবে কাজ করে?',
    answer: 'আমাদের স্ট্যান্ডার্ড পেমেন্ট পলিসি হলো মাইন্ডস্টোন ভিত্তিক: প্রজেক্ট শুরু এবং রিকোয়ারমেন্টস চূড়ান্তকরণের সময় ৫০% অগ্রিম, প্রজেক্ট ডেভেলপমেন্ট ও টেস্ট সার্ভারে লাইভ প্রিভিউ প্রদর্শনের পর ৩০%, এবং সম্পূর্ণ ফাইনাল ডেলিভারি ও আপনার ডোমেইনে সফল লাইভ লঞ্চের পর বাকি ২০%। বড় এন্টারপ্রাইজ প্রজেক্টে মাইলস্টোন অনুযায়ী কিস্তি নির্ধারণ করা হয়।',
  },
  {
    id: 'dev-faq-5',
    question: 'ডেলিভারি টাইমলাইন কতদিন এবং সময়মতো ডেলিভারি নিশ্চিত করেন কীভাবে?',
    answer: 'ল্যান্ডিং পেজ ৩–৭ কার্যদিবস, বিজনেস ওয়েবসাইট ৭–১৫ কার্যদিবস, ই-কমার্স ১৫–৩০ কার্যদিবস এবং কাস্টম সফটওয়্যার ২০–৬০ কার্যদিবস প্রয়োজন হয়। প্রজেক্টের শুরুতে আমরা একটি সুনির্দিষ্ট টাইমলাইন ও ডেলিভারি রোডম্যাপ সরবরাহ করি এবং প্রতি সপ্তাহে লাইভ প্রগ্রেস আপডেট নিশ্চিত করি।',
  },
  {
    id: 'dev-faq-6',
    question: 'রিভিশন বা পরিবর্তনের নিয়ম কী?',
    answer: 'প্রতিটি প্যাকেজে ২ থেকে ৪ রাউন্ড পর্যন্ত রিভিশন অন্তর্ভুক্ত থাকে। অনুমোদিত প্রাথমিক ডিজাইন ও স্কোপের ওপর ভিত্তি করে এই রিভিশনগুলো সম্পন্ন করা হয়। রিভিশন পর্বে রঙ, লেআউট, টাইপোগ্রাফি ও কনটেন্ট বিন্যাস নিখুঁতভাবে সমন্বয় করা হয়।',
  },
  {
    id: 'dev-faq-7',
    question: 'ডেলিভারির পর বাগ বা সমস্যা দেখা দিলে কি সাপোর্ট পাব?',
    answer: 'অবশ্যই! আমাদের প্রতিটি প্যাকেজে ১৫ দিন থেকে সর্বোচ্চ ৯০ দিন পর্যন্ত ফ্রি টেকনিক্যাল বাগ সাপোর্ট অন্তর্ভুক্ত থাকে। ডেলিভারির পর যদি কোডে কোনো এরর বা ত্রুটি ধরা পড়ে, আমাদের টিম সর্বোচ্চ অগ্রাধিকার ভিত্তিতে তা সম্পূর্ণ বিনামূল্যে সমাধান করবে। এছাড়াও সাপোর্ট পিরিয়ড শেষ হলেও আমাদের অন-ডিমান্ড ও অ্যানুয়াল মেইনটেন্যান্স সাপোর্ট নেওয়ার সুযোগ রয়েছে।',
  },
  {
    id: 'dev-faq-8',
    question: 'আপনারা কি ওয়ার্ডপ্রেস/উকমার্স ব্যবহার করেন নাকি কাস্টম কোডিং?',
    answer: 'আমরা কোনো স্লো ওয়ার্ডপ্রেস বা রেডিমেড ক্র্যাকড থিম ব্যবহার করি না! আমাদের ই-কমার্স ও ওয়েব প্ল্যাটফর্মগুলো আমাদের নিজস্ব তৈরি “TOTO Commerce Core” আর্কিটেকচারে নির্মিত—যা আধুনিক Next.js, React, TypeScript, Tailwind CSS এবং শক্তিশালী PostgreSQL ডাটাবেজে চলে। এটি সাব-সেকেন্ড গতির লোডিং, অত্যন্ত নিরাপদ এবং যেকোনো ভবিষ্যতে স্কেল করতে সক্ষম।',
  },
  {
    id: 'dev-faq-9',
    question: 'ভবিষ্যতে প্রয়োজন হলে কি প্যাকেজ আপগ্রেড করা সম্ভব?',
    answer: 'হ্যাঁ, শতভাগ সম্ভব! যেহেতু আমাদের কোড মডুলার আর্কিটেকচারে তৈরি, আপনি যেকোনো সময় Commerce Start থেকে Commerce Pro বা Elite-এ আপগ্রেড করতে পারবেন। পুরো সিস্টেম নতুন করে তৈরি করতে হবে না—শুধু নতুন মডিউল ও ফিচারের অতিরিক্ত পার্থক্যটুকু যুক্ত করলেই আপগ্রেড সম্পন্ন হবে।',
  },
  {
    id: 'dev-faq-10',
    question: 'আমাদের কাস্টম রিকোয়ারমেন্ট থাকলে কীভাবে কোটেশন পাব?',
    answer: 'যদি আপনার প্রজেক্টের রিকোয়ারমেন্টস ফিক্সড প্যাকেজের চেয়ে বড় বা আলাদা হয়, আপনি আমাদের “Request a Custom Quote” বাটন ক্লিক করে অথবা আমাদের হোয়াটসঅ্যাপে আপনার রিকোয়ারমেন্টস পাঠাতে পারেন। আমাদের টেকনিক্যাল টিম আপনার সাথে বিনামূল্যে ডিসকভারি কল করে নিখুঁত এসআরএস (SRS) ও বাজেট এস্টিমেট সরবরাহ করবে।',
  },
];

// -----------------------------------------------------------------------------
// SERVICE-SPECIFIC OBJECTION-KILLER FAQS
// -----------------------------------------------------------------------------
export const BRAND_DESIGN_FAQS: FAQItem[] = [
  {
    id: 'brand-faq-1',
    question: 'ডিজাইন পছন্দ না হলে রিভিশন পলিসি কী এবং কতবার পরিবর্তন করতে পারব?',
    answer: 'আপনার সম্পূর্ণ সন্তুষ্টি নিশ্চিত না হওয়া পর্যন্ত আমরা কাজ করি। প্যাকেজ অনুযায়ী একাধিক ডেডিকেটেড রিভিশন রাউন্ড অন্তর্ভুক্ত থাকে। এমনকি ফাইনাল কনসেপ্ট চূড়ান্ত করার পরও যেকোনো মাইনর টেক্সট বা কালার পরিবর্তন সম্পূর্ণ বিনামূল্যে দ্রুত সমন্বয় করা হয়।',
  },
  {
    id: 'brand-faq-2',
    question: 'আমি কি প্রিন্ট-রেডি CMYK ফাইল এবং 3D সোর্স ফাইল পাব?',
    answer: 'হ্যাঁ, শতভাগ! প্রতিটি প্যাকেজে আমরা সম্পূর্ণ প্রিন্ট-রেডি ভেক্টর ফাইল (AI, EPS, PDF, SVG), ডিজিটাল ফরম্যাট (PNG, JPG) এবং 3D প্যাকেজিং মকআপের হাই-রেজোলিউশন রেন্ডার সরবরাহ করি। এই ফাইলগুলো সরাসরি প্রেস বা কমার্শিয়াল প্রিন্টারে প্রিন্ট করার উপযোগী।',
  },
  {
    id: 'brand-faq-3',
    question: 'মাসিক ক্রিয়েটিভ প্যাকেজে কি কোনো দীর্ঘমেয়াদি চুক্তি বা লক-ইন আছে?',
    answer: 'না, কোনো প্রকার দীর্ঘমেয়াদি চুক্তি নেই! আপনি প্রতি মাসে রিনিউ করতে পারেন এবং যেকোনো সময় কোনো অতিরিক্ত চার্জ বা পেনাল্টি ছাড়াই বাতিল বা বিরতি নিতে পারেন। সম্পূর্ণ ফ্লেক্সিবল ও স্বচ্ছ রিটেইনার ব্যবস্থা।',
  },
  {
    id: 'brand-faq-4',
    question: '3D FMCG জার, পাউচ ও বোতল মকআপ কি ফেসবুক/ইনস্টাগ্রাম অ্যাডে ব্যবহার করা যাবে?',
    answer: 'অবশ্যই! আমাদের 3D রেন্ডারগুলো আল্ট্রা-রিয়ালিস্টিক 4K রেজোলিউশনে তৈরি করা হয়। এগুলো দিয়ে সরাসরি মেটা অ্যাড, গুগল ডিসপ্লে অ্যাড, ই-কমার্স প্রোডাক্ট পেজ এবং ক্যাটালগ তৈরি করতে পারবেন। এতে বাস্তব প্রোডাক্টের শুটিং ছাড়াই ব্র্যান্ড প্রিমিয়াম দেখায়।',
  },
  {
    id: 'brand-faq-5',
    question: 'কাজ শুরু করার প্রক্রিয়া কী এবং পেমেন্ট কীভাবে সম্পন্ন করতে হবে?',
    answer: 'প্যাকেজের “Get This Package” বা “Discuss on WhatsApp” বাটনে ক্লিক করলেই আমাদের টিম তাৎক্ষণিক রেসপন্স করবে। বিকাশ, নগদ, ব্যাংক ডিপোজিট বা কার্ডে পেমেন্টের সুবিধা রয়েছে। পেমেন্ট কনফার্মেশনের পর একই দিনে আপনার ডেডিকেটেড ক্রিয়েটিভ টিম কাজ শুরু করবে।',
  },
];

export const VIDEO_MOTION_FAQS: FAQItem[] = [
  {
    id: 'video-faq-1',
    question: 'রিলস ও ভিডিওর জন্য স্ক্রিপ্ট কি আপনারা তৈরি করেন নাকি আমাদের দিতে হবে?',
    answer: 'আমাদের টিম সম্পূর্ণ হাই-হুক সোশ্যাল মিডিয়া স্ক্রিপ্টিং সাপোর্ট দেয়! আপনার প্রোডাক্ট বা অফারের বিবরণ দিলে আমাদের কনটেন্ট স্ট্র্যাটেজিস্টরা প্রথম ৩ সেকেন্ডের ভাইরাল হুক ও কল-টু-অ্যাকশনসহ সম্পূর্ণ স্ক্রিপ্ট ড্রাফট করে আপনাকে রিভিউ করাবে।',
  },
  {
    id: 'video-faq-2',
    question: 'ভিডিও ফুটেজ বা প্রোডাক্ট শট কি আপনাদের ঠিকানায় পাঠাতে হবে?',
    answer: 'আপনার কাছে যদি র প্রোডাক্টের ভিডিও ফুটেজ বা ছবি থাকে, তা গুগল ড্রাইভে শেয়ার করলেই চলবে। এছাড়াও প্রডাক্টের ফিজিক্যাল স্যাম্পল আমাদের খুলনা অফিসে কুরিয়ার করে পাঠালে আমরা আমাদের ইন-হাউস স্টুডিও লাইটিং ও ক্যামেরায় কমার্শিয়াল শট গ্রহণ করতে পারি।',
  },
  {
    id: 'video-faq-3',
    question: 'ব্যাকগ্রাউন্ড মিউজিক এবং ভয়েসওভারে কি কোনো কপিরাইট সমস্যা হবে?',
    answer: 'কখনোই না! আমরা শুধুমাত্র ১০০% লাইসেন্সপ্রাপ্ত ও কমার্শিয়ালি ক্লিয়ার্ড অডিও লাইব্রেরি ব্যবহার করি। আপনার ফেসবুক পেজ, ইনস্টাগ্রাম বা ইউটিউব চ্যানেলে কোনোদিন মিউজিক কপিরাইট স্ট্রাইক বা সাউন্ড মিউট হওয়ার ঝুঁকি থাকবে না।',
  },
  {
    id: 'video-faq-4',
    question: 'ডেলিভারি ফরম্যাট ও রেজোলিউশন কী থাকে?',
    answer: 'আমরা সোশ্যাল মিডিয়ার পারফেক্ট সাইজ 9:16 (Vertical Reels/Shorts/TikTok) এবং 16:9 (Landscape YouTube/Website) উভয় ফরম্যাটেই ক্রিস্টাল ক্লিয়ার 1080p ও 4K রেজোলিউশনে এক্সপোর্ট ফাইল সরবরাহ করি।',
  },
  {
    id: 'video-faq-5',
    question: 'মাসিক রিটেইনারে প্রতি সপ্তাহে কয়টি করে ভিডিও ডেলিভারি পাব?',
    answer: 'প্যাকেজ অনুযায়ী প্রতি সপ্তাহে ২ থেকে ৪টি করে ভিডিও নিয়মিত শিডিউলে ডেলিভারি দেওয়া হয়, যাতে আপনার সোশ্যাল মিডিয়া পেজে কনটেন্টের ধারাবাহিকতা বজায় থাকে এবং মেটা অ্যালগরিদমে অর্গানিক রিচ বৃদ্ধি পায়।',
  },
];

export const CUSTOM_SOFTWARE_FAQS: FAQItem[] = [
  {
    id: 'software-faq-1',
    question: 'সফটওয়্যারটির সম্পূর্ণ সোর্স কোড ও ডাটাবেজের মালিকানা কার থাকবে?',
    answer: 'সম্পূর্ণ সোর্স কোড ও ডাটাবেজের ১০০% নিরঙ্কুশ মালিকানা আপনার প্রতিষ্ঠানের! কোনো ভেন্ডর-লকইন নেই। প্রজেক্ট ডেলিভারির সাথে সাথে আমরা আপনার নিজস্ব গিটল্যাব/গিটহাবে সম্পূর্ণ সোর্স কোড পুশ করে হ্যান্ডওভার করি।',
  },
  {
    id: 'software-faq-2',
    question: 'আমাদের পুরাতন এক্সেল শীট বা পূর্ববর্তী সফটওয়্যারের ডাটা কি ট্রান্সফার করা যাবে?',
    answer: 'হ্যাঁ, আমাদের সিনিয়র ডাটাবেজ আর্কিটেক্টরা আপনার যেকোনো এক্সেল শীট, সিএসভি বা ওল্ড ডাটাবেজ থেকে সম্পূর্ণ ডাটা ক্লিন করে নতুন রিলেশনাল PostgreSQL ডাটাবেজে ১০০% নির্ভুলভাবে মাইগ্রেশন করে দেবে।',
  },
  {
    id: 'software-faq-3',
    question: 'আমাদের স্টাফ ও সেলস টিমের জন্য কি ট্রেনিং সেশন নেওয়া হবে?',
    answer: 'অবশ্যই! সফটওয়্যার লাইভ হওয়ার পর আপনার অ্যাডমিন ও ফিল্ড স্টাফদের জন্য স্ক্রিন-শেয়ারিং লাইভ ট্রেনিং সেশন নেওয়া হয় এবং প্রতিটি ফিচারের জন্য স্পষ্ট স্ক্রিনশটসহ বাংলা ইউজার ম্যানুয়াল গাইড সরবরাহ করা হয়।',
  },
  {
    id: 'software-faq-4',
    question: 'ডেলিভারির পর কোনো বাগ বা কারিগরি ত্রুটি দেখা দিলে সমাধান কীভাবে হবে?',
    answer: 'আমাদের প্রতিটি কাস্টম সফটওয়্যারে ৯০ দিনের ফ্রি প্রোডাকশন বাগ ওয়ারেন্টি অন্তর্ভুক্ত। লাইভ সার্ভারে কোনো প্রকার ত্রুটি দেখা দিলে আমাদের ইঞ্জিনিয়াররা সর্বোচ্চ অগ্রাধিকার ভিত্তিতে ইনস্ট্যান্ট তা ফিক্স করে দেয়।',
  },
  {
    id: 'software-faq-5',
    question: 'সফটওয়্যার তৈরিতে কত দিন সময় লাগে এবং পেমেন্ট মাইলস্টোন কীভাবে কাজ করে?',
    answer: 'ফিচার ও মডিউলের ওপর ভিত্তি করে ২০ থেকে ৪৫ কার্যদিবস সময় লাগে। পেমেন্ট সম্পূর্ণ নিরাপদ ৩-ধাপের মাইলস্টোনে বিভক্ত: শুরুতে ৫০% অগ্রিম, টেস্ট সার্ভারে ৮০% কমপ্লিট ডেমো দেখার পর ৩০%, এবং ফাইনাল ক্লাউড ডেপ্লয়মেন্টের পর বাকি ২০%।',
  },
];

export const WEB_DEVELOPMENT_FAQS: FAQItem[] = [
  {
    id: 'web-faq-1',
    question: 'আমার ওয়েবসাইটে কি বিকাশ, নগদ ও ভিসা কার্ডের অটোমেটিক পেমেন্ট গেটওয়ে থাকবে?',
    answer: 'হ্যাঁ, শতভাগ! গ্রাহক ওয়েবসাইটে এসে প্রোডাক্ট সিলেক্ট করে সরাসরি বিকাশ, নগদ, রকেট বা ভিসা/মাস্টারকার্ডের মাধ্যমে পেমেন্ট করবে। পেমেন্ট হওয়া মাত্রই অর্ডার কনফার্ম হবে এবং টাকা সরাসরি আপনার মার্চেন্ট একাউন্টে জমা হবে।',
  },
  {
    id: 'web-faq-2',
    question: 'অর্ডার আসার পর কি স্বয়ংক্রিয়ভাবে পাঠাও বা স্টেডফাস্ট কুরিয়ারে বুকিং হবে?',
    answer: 'হ্যাঁ! আমাদের TOTO Commerce Core প্ল্যাটফর্মে Pathao ও Steadfast Courier API সরাসরি ইন্টিগ্রেটেড থাকে। অ্যাডমিন প্যানেল থেকে ১-ক্লিকেই কুরিয়ার বুকিং, বারকোডযুক্ত প্যাকিং স্লিপ প্রিন্ট এবং রিয়েল-টাইম পার্সেল ট্র্যাকিং সম্ভব।',
  },
  {
    id: 'web-faq-3',
    question: 'আমি কি নিজে থেকে প্রোডাক্টের ছবি, দাম, ডিসকাউন্ট ও স্টক পরিবর্তন করতে পারব?',
    answer: 'অবশ্যই! আপনি একটি অত্যন্ত সহজ, আধুনিক ও সুপার-ফাস্ট অ্যাডমিন ড্যাশবোর্ড পাবেন। মোবাইল বা কম্পিউটার থেকে যেকোনো সময় ১ মিনিটেই নতুন প্রোডাক্ট যুক্ত করা, দাম বদলানো এবং অর্ডার প্রসেস করা যাবে। কোনো কোডিং জানার প্রয়োজন নেই।',
  },
  {
    id: 'web-faq-4',
    question: 'ওয়ার্ডপ্রেস বা শপিফাইয়ের চেয়ে আপনাদের নেক্সট.জেএস ওয়েবসাইট কেন দ্রুত ও সেরা?',
    answer: 'ওয়ার্ডপ্রেস বা স্লো প্লাগইন-ভিত্তিক সাইটগুলোতে ট্রাফিক বাড়লেই সাইট ডাউন বা হ্যাং হয়ে যায়। আমরা তৈরি করি আধুনিক Next.js 14, React ও ক্লাউড PostgreSQL ডাটাবেজে। এর ফলে চেকআউট স্পিড হয় ২০০ মিলিসেকেন্ডের নিচে (Lighthouse 98+ Score), যা অ্যাডের কনভার্শন রেট ৪০% এর বেশি বৃদ্ধি করে।',
  },
  {
    id: 'web-faq-5',
    question: 'ওয়েবসাইট ডেলিভারি হতে কত দিন লাগে এবং পরবর্তীতে বাৎসরিক খরচ কেমন?',
    answer: 'ফিক্সড প্যাকেজে ৩ থেকে ৭ কার্যদিবসের মধ্যে আপনার সম্পূর্ণ ই-কমার্স স্টোর রেডি হয়ে যায়। আমাদের কোনো লুকানো বা মাসিক ফি নেই (One-Time Cost)। শুধুমাত্র বাৎসরিক ডোমেইন ও হোস্টিংয়ের ন্যূনতম রিনিউয়াল ফি বাদে সমস্ত লাভ আপনার।',
  },
];

// Master Collection for Easy Modal Lookup
export const ALL_DEVELOPMENT_PLANS: PricingPlan[] = [
  ...LANDING_PAGE_PLANS,
  ...BUSINESS_WEBSITE_PLANS,
  ...ECOMMERCE_PLANS,
  ...MULTIVENDOR_PLANS,
  ...SOFTWARE_PACKAGES,
];
