const { Client } = require('pg');

async function seedPackages() {
  const client = new Client({
    connectionString: 'postgresql://postgres:Yousuf@localhost:5432/toto_agency',
  });
  await client.connect();

  console.log('Seeding and syncing packages table with all creative and tech plans...');

  const packagesToUpsert = [
    {
      id: 'rupalika',
      slug: 'rupalika',
      title: 'রুপালীকা',
      subtitle: 'Essential Creative',
      category: 'brand-design',
      category_label: 'Creative & Social Retainer',
      regular_price: 12499.00,
      discounted_price: 9999.00,
      currency: 'BDT',
      currency_symbol: '৳',
      is_discount_active: true,
      discount_type: 'percentage',
      discount_percentage: 20.00,
      discount_fixed_amount: 2500.00,
      badge: '20% OFF',
      features: JSON.stringify([
        '15 Premium Creative Designs',
        '3 High-Impact Reels (25–30s)',
        '18 Social Media Captions',
        'Business & Competitor Analysis',
        'Monthly Content Calendar & Performance Audit',
        '100% Human-Created Designs'
      ]),
    },
    {
      id: 'sonalika',
      slug: 'sonalika',
      title: 'সোনালীকা',
      subtitle: 'Growth & Strategy • Maximum ROI',
      category: 'brand-design',
      category_label: 'Best Value Creative Retainer',
      regular_price: 15624.00,
      discounted_price: 12499.00,
      currency: 'BDT',
      currency_symbol: '৳',
      is_discount_active: true,
      discount_type: 'percentage',
      discount_percentage: 20.00,
      discount_fixed_amount: 3125.00,
      badge: 'MOST POPULAR',
      features: JSON.stringify([
        '20 Premium Creative Designs',
        '5 High-Impact Reels (25–40s)',
        '25 Social Media Captions',
        'Comprehensive Competitor & Audience Analysis',
        'Holistic Content Strategy & Publishing Plan',
        'Monthly Growth & Performance Report',
        '100% Human-Created Designs'
      ]),
    },
    {
      id: 'agrojatra',
      slug: 'agrojatra',
      title: 'অগ্রযাত্রা',
      subtitle: 'Maximum Scale & Production',
      category: 'brand-design',
      category_label: 'Full Commercial Production',
      regular_price: 22499.00,
      discounted_price: 17999.00,
      currency: 'BDT',
      currency_symbol: '৳',
      is_discount_active: true,
      discount_type: 'percentage',
      discount_percentage: 20.00,
      discount_fixed_amount: 4500.00,
      badge: 'ENTERPRISE SCALE',
      features: JSON.stringify([
        '30 Premium Creative Designs',
        '4 Reels (25–40s) + 2 Extended Commercial Videos (up to 60s)',
        '36 Social Media Captions',
        'Advanced Market Research & Competitor Intelligence',
        'Omnichannel Brand Strategy & Calendar',
        'Full Bi-Weekly Growth Audit',
        '100% Human-Created Designs'
      ]),
    },
    {
      id: 'pack_sonalika',
      slug: 'pack-sonalika',
      title: 'সোনালীকা (Scale Package)',
      subtitle: 'Growth & Strategy • Maximum ROI',
      category: 'motion-video',
      category_label: 'High ROI Creative Package',
      regular_price: 15624.00,
      discounted_price: 12499.00,
      currency: 'BDT',
      currency_symbol: '৳',
      is_discount_active: true,
      discount_type: 'percentage',
      discount_percentage: 20.00,
      discount_fixed_amount: 3125.00,
      features: JSON.stringify([
        '20 Premium Creative Designs',
        '5 Reels (25–40 seconds)',
        'Content Strategy'
      ]),
    },
    {
      id: 'pack_rupali',
      slug: 'pack-rupali',
      title: 'রুপালীকা (Growth Package)',
      subtitle: 'Essential Creative',
      category: 'motion-video',
      category_label: 'Essential Creative',
      regular_price: 12499.00,
      discounted_price: 9999.00,
      currency: 'BDT',
      currency_symbol: '৳',
      is_discount_active: true,
      discount_type: 'percentage',
      discount_percentage: 20.00,
      discount_fixed_amount: 2500.00,
      features: JSON.stringify([
        '15 Premium Creative Designs',
        '3 Reels',
        'Captions & Strategy'
      ]),
    },
  ];

  for (const pkg of packagesToUpsert) {
    await client.query(`
      INSERT INTO packages (
        id, slug, title, subtitle, category, category_label, regular_price, discounted_price, currency, currency_symbol,
        is_discount_active, discount_type, discount_percentage, discount_fixed_amount, badge, features
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        title = EXCLUDED.title,
        subtitle = EXCLUDED.subtitle,
        category = EXCLUDED.category,
        category_label = EXCLUDED.category_label,
        regular_price = EXCLUDED.regular_price,
        discounted_price = EXCLUDED.discounted_price,
        is_discount_active = EXCLUDED.is_discount_active,
        discount_percentage = EXCLUDED.discount_percentage,
        discount_fixed_amount = EXCLUDED.discount_fixed_amount,
        badge = EXCLUDED.badge,
        features = EXCLUDED.features,
        updated_at = NOW();
    `, [
      pkg.id,
      pkg.slug,
      pkg.title,
      pkg.subtitle,
      pkg.category,
      pkg.category_label,
      pkg.regular_price,
      pkg.discounted_price,
      pkg.currency,
      pkg.currency_symbol,
      pkg.is_discount_active,
      pkg.discount_type,
      pkg.discount_percentage,
      pkg.discount_fixed_amount,
      pkg.badge || null,
      pkg.features,
    ]);
    console.log(`Synced package: ${pkg.id} (${pkg.title})`);
  }

  console.log('✅ All packages successfully synchronized in database!');
  await client.end();
}

seedPackages().catch(e => {
  console.error(e);
  process.exit(1);
});
