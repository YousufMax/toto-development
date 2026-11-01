const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://postgres:Yousuf@localhost:5432/toto_agency';

const pool = new Pool({
  connectionString,
});

async function runMigration() {
  console.log('--- Starting TOTO Development Database Migration ---');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Run schema.sql
    const schemaPath = path.join(__dirname, '..', 'src', 'lib', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log('Creating tables and indexes...');
    await client.query(schemaSql);
    console.log('Tables created successfully.');

    // 2. Seed Super Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@totodev.com';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123456';
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const checkAdmin = await client.query(
      'SELECT id FROM admin_users WHERE email = $1',
      [adminEmail]
    );

    if (checkAdmin.rows.length === 0) {
      console.log('Seeding Super Admin user...');
      await client.query(
        `INSERT INTO admin_users (name, email, password_hash, role, avatar_url, is_active)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          'TOTO Super Admin',
          adminEmail,
          passwordHash,
          'super_admin',
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
          true,
        ]
      );
      console.log(`Super Admin created: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log('Super Admin already exists.');
    }

    // 3. Seed WhatsApp Agents
    const checkAgents = await client.query('SELECT COUNT(*) as count FROM whatsapp_agents');
    if (parseInt(checkAgents.rows[0].count, 10) === 0) {
      console.log('Seeding 6 WhatsApp Agents...');
      const agents = [
        {
          name: 'Sales Agent 01 — Tanvir Hasan (Dhaka HQ)',
          phone: '+8801800942868',
          status: 'active',
          is_default: true,
          is_fallback: false,
          msg: 'Hi TOTO Development, I would like to consult on Custom Software & Web Platforms.',
          order: 1,
        },
        {
          name: 'Sales Agent 02 — Mehzabin Akhter (E-Commerce Specialist)',
          phone: '+8801711223344',
          status: 'scheduled',
          is_default: false,
          is_fallback: false,
          msg: 'Hi TOTO Development, I want to discuss E-Commerce and Retail Platform development.',
          order: 2,
        },
        {
          name: 'Sales Agent 03 — Rafiqul Islam (Growth & Ads Lead)',
          phone: '+8801911556677',
          status: 'scheduled',
          is_default: false,
          is_fallback: false,
          msg: 'Hi TOTO Development, I am interested in Paid Ads & High-ROAS Performance Marketing.',
          order: 3,
        },
        {
          name: 'Sales Agent 04 — Kazi Mahfuz (3D Video & CGI Advisor)',
          phone: '+8801611889900',
          status: 'scheduled',
          is_default: false,
          is_fallback: false,
          msg: 'Hi TOTO Development, I want to explore Commercial Video & 3D Packaging mockups.',
          order: 4,
        },
        {
          name: 'Sales Agent 05 — Farhan Kabir (Evening Support & Onboarding)',
          phone: '+8801311445566',
          status: 'scheduled',
          is_default: false,
          is_fallback: false,
          msg: 'Hi TOTO Development, I would like to consult on monthly package pricing.',
          order: 5,
        },
        {
          name: 'Sales Agent 06 — Emergency Senior Architect (Fallback)',
          phone: '+8801800942868',
          status: 'active',
          is_default: false,
          is_fallback: true,
          msg: 'Hi TOTO Development Architect, I need priority project consultation.',
          order: 6,
        },
      ];

      const agentIds = [];
      for (const ag of agents) {
        const res = await client.query(
          `INSERT INTO whatsapp_agents (agent_name, phone_number, status, is_default, is_fallback, custom_prefilled_message, display_order)
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
          [ag.name, ag.phone, ag.status, ag.is_default, ag.is_fallback, ag.msg, ag.order]
        );
        agentIds.push(res.rows[0].id);
      }

      console.log('Seeding WhatsApp Schedules (09:00 - 00:00 + Overnight)...');
      const schedules = [
        { agent_id: agentIds[0], start_time: '09:00', end_time: '11:00', is_overnight: false },
        { agent_id: agentIds[1], start_time: '11:00', end_time: '13:00', is_overnight: false },
        { agent_id: agentIds[2], start_time: '13:00', end_time: '16:00', is_overnight: false },
        { agent_id: agentIds[3], start_time: '16:00', end_time: '18:00', is_overnight: false },
        { agent_id: agentIds[4], start_time: '18:00', end_time: '21:00', is_overnight: false },
        { agent_id: agentIds[5], start_time: '21:00', end_time: '09:00', is_overnight: true },
      ];

      for (const sc of schedules) {
        await client.query(
          `INSERT INTO whatsapp_schedules (agent_id, day_of_week, start_time, end_time, timezone, is_active, is_overnight)
           VALUES ($1, 'all', $2, $3, 'Asia/Dhaka', true, $4)`,
          [sc.agent_id, sc.start_time, sc.end_time, sc.is_overnight]
        );
      }
    }

    // 4. Seed Dynamic Packages
    const checkPackages = await client.query('SELECT COUNT(*) as count FROM packages');
    if (parseInt(checkPackages.rows[0].count, 10) === 0) {
      console.log('Seeding Agency Packages with Dynamic Discounts...');
      const packagesData = [
        {
          id: 'pack_shuru',
          slug: 'shuru-starter-package',
          category: 'motion-video',
          category_label: 'Video & Motion',
          title: 'শুরু (Starter Package)',
          subtitle: 'Essential Social & Brand Growth',
          description: 'High-retention social reels, creative graphic assets, and baseline brand identity for fast-growing businesses.',
          regular_price: 12499.00,
          discounted_price: 9999.20,
          discount_percentage: 20.00,
          discount_fixed_amount: 2499.80,
          discount_type: 'percentage',
          is_discount_active: true,
          custom_price_label: 'মাসিক',
          currency: 'BDT',
          currency_symbol: '৳',
          billing_type: 'monthly',
          features: JSON.stringify([
            { name: '10 High-Retention Video Reels / Shorts', included: true },
            { name: '15 High-Converting Social Posters', included: true },
            { name: '2 Commercial Video Editing Sets', included: true },
            { name: 'Scriptwriting & Hook Optimization', included: true },
            { name: '1 Round of Revisions per Asset', included: true },
            { name: 'Dedicated Project Manager', included: true },
            { name: 'Advanced 3D CGI Product Mockup', included: false },
            { name: 'Omnichannel Paid Ads Strategy', included: false },
          ]),
          deliverables: JSON.stringify(['4K Master Video Files', 'Layered PSD / AI Design Files', 'Social Safe Area Ratios']),
          timeline: 'Monthly Rolling',
          ideal_for: 'Startups, Local Retailers & Boutiques',
          is_featured: false,
          is_popular: false,
          badge: '২০% ছাড়',
          display_order: 1,
        },
        {
          id: 'pack_rupali',
          slug: 'rupali-growth-package',
          category: 'motion-video',
          category_label: 'Video & Motion',
          title: 'রুপালী (Growth Package)',
          subtitle: 'High-Converting Multi-Platform Campaigns',
          description: 'Complete visual powerhouse with 20 reels, 30 ad creatives, and commercial color grading for aggressive market expansion.',
          regular_price: 24999.00,
          discounted_price: 19999.20,
          discount_percentage: 20.00,
          discount_fixed_amount: 4999.80,
          discount_type: 'percentage',
          is_discount_active: true,
          custom_price_label: 'মাসিক',
          currency: 'BDT',
          currency_symbol: '৳',
          billing_type: 'monthly',
          features: JSON.stringify([
            { name: '20 High-Retention Video Reels / Shorts', included: true },
            { name: '30 High-Converting Social Posters', included: true },
            { name: '5 Commercial Video Editing Sets', included: true },
            { name: 'Commercial Grade Color Grading & Sound Design', included: true },
            { name: '2 Rounds of Revisions per Asset', included: true },
            { name: 'Dedicated Senior Project Manager', included: true },
            { name: '1 Premium 3D CGI Packaging Showcase', included: true },
            { name: 'Quarterly Creative Performance Review', included: true },
          ]),
          deliverables: JSON.stringify(['ProRes & MP4 Masters', 'Figma Design System', 'Thumbnail Suite']),
          timeline: 'Monthly Rolling',
          ideal_for: 'Growing E-Commerce & Consumer Brands',
          is_featured: false,
          is_popular: false,
          badge: '২০% ছাড়',
          display_order: 2,
        },
        {
          id: 'pack_sonalika',
          slug: 'sonalika-scale-package',
          category: 'motion-video',
          category_label: 'Video & Motion',
          title: 'সোনালীকা (Scale Package)',
          subtitle: 'Enterprise 3D CGI & Omnichannel Domination',
          description: 'Our most comprehensive suite: 30 reels, 45 creative assets, full 3D animated packaging CGI, and senior creative director oversight.',
          regular_price: 44999.00,
          discounted_price: 38249.15,
          discount_percentage: 15.00,
          discount_fixed_amount: 6749.85,
          discount_type: 'percentage',
          is_discount_active: true,
          custom_price_label: 'মাসিক',
          currency: 'BDT',
          currency_symbol: '৳',
          billing_type: 'monthly',
          features: JSON.stringify([
            { name: '30 High-Retention Video Reels / Shorts', included: true },
            { name: '45 High-Converting Social Posters', included: true },
            { name: '8 Commercial Video Editing Sets', included: true },
            { name: 'Photorealistic 3D FMCG Packaging & CGI', included: true },
            { name: 'Unlimited Revisions within Scope', included: true },
            { name: 'Dedicated Creative Director & Senior Team', included: true },
            { name: 'Omnichannel Ad Creative Variant Testing', included: true },
            { name: 'Priority 24/7 VIP Turnaround SLA', included: true },
          ]),
          deliverables: JSON.stringify(['Raw Source Files', '3D Scene Renders', 'Omnichannel Ad Variants', 'Creative Briefing Decks']),
          timeline: 'Monthly Rolling',
          ideal_for: 'Enterprise Brands, D2C Leaders & FMCG Companies',
          is_featured: true,
          is_popular: true,
          badge: 'BEST VALUE • ১৫% ছাড়',
          display_order: 3,
        },
        {
          id: 'pack_web_custom',
          slug: 'web-platform-starter',
          category: 'web-development',
          category_label: 'Web Development',
          title: 'High-Performance Web Platform',
          subtitle: 'Next.js 14 & Sub-200ms E-Commerce Storefront',
          description: 'Fully responsive, ultra-fast web application with headless CMS, automated SEO, and instant payment gateway integration.',
          regular_price: 35000.00,
          discounted_price: 29750.00,
          discount_percentage: 15.00,
          discount_fixed_amount: 5250.00,
          discount_type: 'percentage',
          is_discount_active: true,
          custom_price_label: 'এককালীন',
          currency: 'BDT',
          currency_symbol: '৳',
          billing_type: 'one_time',
          features: JSON.stringify([
            { name: 'Custom Next.js 14 App Router Architecture', included: true },
            { name: 'Sub-200ms Server-Side Rendered Architecture', included: true },
            { name: 'Bkash, Nagad & SSLCommerz Integration', included: true },
            { name: 'Modern Admin CMS & Inventory Controls', included: true },
            { name: 'Mobile-First Responsive Layout', included: true },
            { name: 'Full Schema.org & OpenGraph SEO Setup', included: true },
            { name: '3 Months Technical Maintenance SLA', included: true },
          ]),
          deliverables: JSON.stringify(['Full GitHub Repository', 'Production Vercel/VPS Deployment', 'Admin User Manual']),
          timeline: '2-3 Weeks',
          ideal_for: 'Modern E-Commerce, D2C & Corporate Brands',
          is_featured: false,
          is_popular: true,
          badge: '১৫% ছাড়',
          display_order: 4,
        },
        {
          id: 'pack_software_enterprise',
          slug: 'enterprise-custom-software',
          category: 'custom-software',
          category_label: 'Custom Software',
          title: 'Enterprise Custom ERP & Cloud Core',
          subtitle: 'Scalable Microservices & Telemetry Platform',
          description: 'Tailored enterprise software designed for multi-branch supply chains, logistics, healthcare, and high-frequency internal operations.',
          regular_price: 95000.00,
          discounted_price: 85500.00,
          discount_percentage: 10.00,
          discount_fixed_amount: 9500.00,
          discount_type: 'percentage',
          is_discount_active: true,
          custom_price_label: 'প্রজেক্ট বেসড',
          currency: 'BDT',
          currency_symbol: '৳',
          billing_type: 'one_time',
          features: JSON.stringify([
            { name: 'High-Concurrency PostgreSQL Architecture', included: true },
            { name: 'Granular Role-Based Permissions (RBAC)', included: true },
            { name: 'Custom Telemetry & Automated Audit Logs', included: true },
            { name: 'Real-Time Sync with Warehouses/Branches', included: true },
            { name: 'Automated Database Backups & Encryption', included: true },
            { name: 'API Integrations with ERPs & Payment Gateways', included: true },
            { name: '6 Months Dedicated Architecture SLA', included: true },
          ]),
          deliverables: JSON.stringify(['Full Source Code Ownership', 'Docker Containers & CI/CD', 'Architecture Blueprint']),
          timeline: '4-8 Weeks',
          ideal_for: 'Logistics, Healthcare, Supply Chain & Enterprise Co.',
          is_featured: true,
          is_popular: false,
          badge: 'ENTERPRISE ARCHITECTURE',
          display_order: 5,
        },
        {
          id: 'pack_paid_ads_scale',
          slug: 'meta-google-ads-scale',
          category: 'paid-ads',
          category_label: 'Paid Advertising',
          title: 'Aggressive Meta & Google Ads Scaling',
          subtitle: 'ROAS-Driven Customer Acquisition Engine',
          description: 'Data-engineered ad management, CAPI server tracking, creative fatigue prevention, and algorithmic scaling.',
          regular_price: 28000.00,
          discounted_price: 22400.00,
          discount_percentage: 20.00,
          discount_fixed_amount: 5600.00,
          discount_type: 'percentage',
          is_discount_active: true,
          custom_price_label: 'মাসিক',
          currency: 'BDT',
          currency_symbol: '৳',
          billing_type: 'monthly',
          features: JSON.stringify([
            { name: 'Meta Pixel + Conversion API (CAPI) Setup', included: true },
            { name: 'Google Ads & Search Intent Funnels', included: true },
            { name: 'A/B Creative Hook & Copy Testing', included: true },
            { name: 'Weekly Deep-Dive ROAS Reports', included: true },
            { name: 'Audience Segmentation & Retargeting', included: true },
            { name: 'Landing Page Conversion Rate Optimization (CRO)', included: true },
          ]),
          deliverables: JSON.stringify(['Weekly Analytics Dashboard', 'Ad Copy Spreadsheets', 'Creative Feedback Notes']),
          timeline: 'Monthly Rolling',
          ideal_for: 'E-Commerce Brands Spending ৳১,০০,০০০+ / month',
          is_featured: false,
          is_popular: true,
          badge: '২০% ছাড়',
          display_order: 6,
        },
      ];

      for (const p of packagesData) {
        await client.query(
          `INSERT INTO packages (
            id, slug, category, category_label, title, subtitle, description,
            regular_price, discounted_price, discount_percentage, discount_fixed_amount,
            discount_type, is_discount_active, custom_price_label, currency, currency_symbol,
            billing_type, features, deliverables, timeline, ideal_for, is_featured, is_popular,
            badge, display_order, is_active
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, true)`,
          [
            p.id, p.slug, p.category, p.category_label, p.title, p.subtitle, p.description,
            p.regular_price, p.discounted_price, p.discount_percentage, p.discount_fixed_amount,
            p.discount_type, p.is_discount_active, p.custom_price_label, p.currency, p.currency_symbol,
            p.billing_type, p.features, p.deliverables, p.timeline, p.ideal_for, p.is_featured, p.is_popular,
            p.badge, p.display_order
          ]
        );
      }
    }

    // 5. Seed Smart Engagement Popups for 6 Core Pages + Home + Pricing
    const checkPopups = await client.query('SELECT COUNT(*) as count FROM engagement_popups');
    if (parseInt(checkPopups.rows[0].count, 10) === 0) {
      console.log('Seeding Smart WhatsApp Engagement Popups...');
      const popups = [
        {
          route: '/',
          title: 'A Live Architect Is Ready to Assist You',
          description: 'Have questions about our custom software, web platforms, or monthly creative packages? Chat with our lead architect now.',
          cta: 'Chat on WhatsApp',
          msg: 'Hi TOTO Development, I am exploring your website and would like to ask a few questions.',
          delay: 15,
          freq: 'once_per_session',
        },
        {
          route: '/services/web-development/',
          title: 'Building a High-Speed E-Commerce or Web Platform?',
          description: 'Get an instant architecture scope and timeline estimate directly from our senior web engineering team.',
          cta: 'Discuss Web Project',
          msg: 'Hi TOTO Development, I would like to consult on building a custom web platform or e-commerce store.',
          delay: 12,
          freq: 'once_per_session',
        },
        {
          route: '/services/custom-software/',
          title: 'Need Enterprise Software or ERP Consultation?',
          description: 'Talk to an engineer about your operations, database scaling, or logistics management system.',
          cta: 'Consult on WhatsApp',
          msg: 'Hi TOTO Development, I need enterprise custom software consultation.',
          delay: 15,
          freq: 'once_per_session',
        },
        {
          route: '/services/paid-ads/',
          title: 'Looking to Scale Your Ad ROAS Beyond 4.5x?',
          description: 'Our performance marketers are active right now. Share your current ad spend for an instant audit.',
          cta: 'Chat with Ads Specialist',
          msg: 'Hi TOTO Development, I want to audit and scale my Meta & Google ads.',
          delay: 10,
          freq: 'once_per_session',
        },
        {
          route: '/services/video-motion/',
          title: 'Explore Our Monthly Video & 3D CGI Packages',
          description: 'Save 20% this month on high-retention video reels and photorealistic 3D FMCG packaging renders.',
          cta: 'View Video Deals',
          msg: 'Hi TOTO Development, I am interested in your Video & Motion monthly creative packages.',
          delay: 15,
          freq: 'once_per_session',
        },
        {
          route: '/services/brand-design/',
          title: 'Transform Your Brand Visual System & Packaging',
          description: 'Discover how bespoke 3D renders helped consumer brands in Dhaka secure supershop shelf space 3 weeks faster.',
          cta: 'Chat with Design Team',
          msg: 'Hi TOTO Development, I want to discuss Brand Visual Identity and 3D Packaging Design.',
          delay: 15,
          freq: 'once_per_session',
        },
        {
          route: '/pricing/',
          title: 'Confused About Which Package Fits Your Budget?',
          description: 'Tell us your project scope and we will recommend the most cost-effective package with active discounts.',
          cta: 'Get Package Guidance',
          msg: 'Hi TOTO Development, I need guidance selecting the best package for my company.',
          delay: 8,
          freq: 'once_per_session',
        },
      ];

      for (const p of popups) {
        await client.query(
          `INSERT INTO engagement_popups (page_route, title, description, cta_text, prefilled_message, delay_seconds, display_frequency, is_enabled)
           VALUES ($1, $2, $3, $4, $5, $6, $7, true)
           ON CONFLICT (page_route) DO NOTHING`,
          [p.route, p.title, p.description, p.cta, p.msg, p.delay, p.freq]
        );
      }
    }

    // 6. Seed Website Content Blocks
    const checkContent = await client.query('SELECT COUNT(*) as count FROM website_content');
    if (parseInt(checkContent.rows[0].count, 10) === 0) {
      console.log('Seeding Website CMS Content Blocks...');
      const contents = [
        {
          key: 'hero_announcement',
          group: 'hero',
          title: 'Top Announcement Banner',
          value: '🔥 Eid Special: Get 20% Instant Discount on All Monthly Video & Growth Packages!',
        },
        {
          key: 'hero_headline_part1',
          group: 'hero',
          title: 'Hero Main Headline',
          value: 'Engineering Elite Software, E-Commerce & Visual Systems',
        },
        {
          key: 'hero_subheadline',
          group: 'hero',
          title: 'Hero Subtitle',
          value: 'Full-stack enterprise engineering, sub-200ms web platforms, ROAS-driven paid advertising, and commercial 3D motion graphics.',
        },
        {
          key: 'footer_contact_phone',
          group: 'footer',
          title: 'Official Phone / WhatsApp',
          value: '+880 1800-942868',
        },
        {
          key: 'footer_contact_email',
          group: 'footer',
          title: 'Official Email',
          value: 'contact@totodev.com',
        },
        {
          key: 'footer_contact_address',
          group: 'footer',
          title: 'HQ Office Address',
          value: 'House 42, Road 11, Banani, Dhaka 1213, Bangladesh',
        },
      ];

      for (const c of contents) {
        await client.query(
          `INSERT INTO website_content (section_key, section_group, title, content_value, is_published)
           VALUES ($1, $2, $3, $4, true)
           ON CONFLICT (section_key) DO NOTHING`,
          [c.key, c.group, c.title, c.value]
        );
      }
    }

    // 7. Seed Initial Customer Purchase Requests (Real-structured initial leads)
    const checkRequests = await client.query('SELECT COUNT(*) as count FROM purchase_requests');
    if (parseInt(checkRequests.rows[0].count, 10) === 0) {
      console.log('Seeding Initial Purchase Requests...');
      const requests = [
        {
          id: 'REQ-2026-1001',
          pkgId: 'pack_sonalika',
          pkgName: 'সোনালীকা (Scale Package)',
          category: 'Video & Motion',
          price: 38249.15,
          name: 'Tanvir Ahmed',
          biz: 'TOTO Elite Mart Ltd.',
          phone: '+8801819234567',
          email: 'tanvir@totomart.com.bd',
          web: 'https://totomart.com.bd',
          reqs: 'Need 30 social video reels and 3D cosmetic bottle animations for upcoming Eid campaigns.',
          method: 'whatsapp',
          status: 'confirmed',
          notes: 'Contract signed for 3 months rolling package. Onboarding call scheduled.',
        },
        {
          id: 'REQ-2026-1002',
          pkgId: 'pack_web_custom',
          pkgName: 'High-Performance Web Platform',
          category: 'Web Development',
          price: 29750.00,
          name: 'Rafiqul Islam Chowdhury',
          biz: 'Bengal Freight & Logistics',
          phone: '+8801712987654',
          email: 'rafiqul@bengallogistics.com',
          web: 'https://bengallogistics.com',
          reqs: 'Require tracking portal with port telemetry and client login for Chattogram port dispatch.',
          method: 'phone',
          status: 'discussion',
          notes: 'Discussed requirements. Sending revised architecture scope document.',
        },
        {
          id: 'REQ-2026-1003',
          pkgId: 'pack_rupali',
          pkgName: 'রুপালী (Growth Package)',
          category: 'Video & Motion',
          price: 19999.20,
          name: 'Farhan Sadeq',
          biz: 'BrandPulse Retail',
          phone: '+8801915432109',
          email: 'farhan@brandpulse.com.bd',
          web: 'https://facebook.com/brandpulseretail',
          reqs: 'Looking to boost Meta ad creatives with dynamic short-form video hooks.',
          method: 'whatsapp',
          status: 'new_request',
          notes: 'New incoming lead. Needs priority WhatsApp outreach.',
        },
      ];

      for (const r of requests) {
        await client.query(
          `INSERT INTO purchase_requests (
            id, package_id, package_name, package_category, quoted_price,
            full_name, business_name, whatsapp_number, email, website_or_social,
            project_requirements, preferred_contact_method, status, internal_notes
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [
            r.id, r.pkgId, r.pkgName, r.category, r.price,
            r.name, r.biz, r.phone, r.email, r.web,
            r.reqs, r.method, r.status, r.notes
          ]
        );

        // Add history log
        await client.query(
          `INSERT INTO lead_history (request_id, user_name, previous_status, new_status, note)
           VALUES ($1, 'System', 'none', $2, $3)`,
          [r.id, r.status, 'Initial purchase request recorded']
        );
      }
    }

    // 8. Seed Initial Activity Log
    await client.query(
      `INSERT INTO activity_logs (user_name, action_type, entity_type, entity_id, details)
       VALUES ('System', 'DATABASE_INITIALIZATION', 'database', 'toto_agency', '{"version": "1.0.0", "status": "ready"}'::jsonb)`
    );

    await client.query('COMMIT');
    console.log('--- Migration Completed Successfully! ---');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
