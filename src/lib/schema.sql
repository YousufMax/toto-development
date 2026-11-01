-- =========================================================================
-- TOTO DEVELOPMENT: AGENCY MANAGEMENT PLATFORM DATABASE SCHEMA
-- PostgreSQL 18+ Compatible
-- =========================================================================

-- 1. Admin Users & Role-Based Access Control
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'sales_manager', 'editor')),
  avatar_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. WhatsApp Agents & Dynamic Numbers
CREATE TABLE IF NOT EXISTS whatsapp_agents (
  id SERIAL PRIMARY KEY,
  agent_name VARCHAR(150) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'scheduled')),
  is_default BOOLEAN DEFAULT FALSE,
  is_fallback BOOLEAN DEFAULT FALSE,
  custom_prefilled_message TEXT DEFAULT 'Hi TOTO Development, I would like to consult on your agency services & packages.',
  total_clicks INTEGER DEFAULT 0,
  notes TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. WhatsApp Schedules & Automatic Rotation
CREATE TABLE IF NOT EXISTS whatsapp_schedules (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER NOT NULL REFERENCES whatsapp_agents(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) DEFAULT 'all' CHECK (day_of_week IN ('all', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday')),
  start_time VARCHAR(5) NOT NULL, -- Format: HH:MM (e.g. '09:00')
  end_time VARCHAR(5) NOT NULL,   -- Format: HH:MM (e.g. '11:00')
  timezone VARCHAR(100) DEFAULT 'Asia/Dhaka',
  is_active BOOLEAN DEFAULT TRUE,
  is_overnight BOOLEAN DEFAULT FALSE,
  priority INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. WhatsApp Click Logs & Real-Time Tracking
CREATE TABLE IF NOT EXISTS whatsapp_clicks (
  id SERIAL PRIMARY KEY,
  agent_id INTEGER REFERENCES whatsapp_agents(id) ON DELETE SET NULL,
  phone_number VARCHAR(50) NOT NULL,
  page_url VARCHAR(500),
  source VARCHAR(100), -- 'navbar', 'floating_bubble', 'package_discuss', 'engagement_popup', 'footer'
  ip_address VARCHAR(100),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Package Management & Dynamic Pricing
CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR(100) PRIMARY KEY,
  slug VARCHAR(120) UNIQUE NOT NULL,
  category VARCHAR(80) NOT NULL, -- 'web-development', 'custom-software', 'graphic-design', 'motion-video', 'digital-marketing', 'paid-ads'
  category_label VARCHAR(120),
  title VARCHAR(200) NOT NULL,
  subtitle VARCHAR(255),
  description TEXT,
  regular_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  discounted_price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  discount_percentage NUMERIC(5, 2) DEFAULT 0.00,
  discount_fixed_amount NUMERIC(12, 2) DEFAULT 0.00,
  discount_type VARCHAR(20) DEFAULT 'none' CHECK (discount_type IN ('none', 'percentage', 'fixed')),
  discount_start_date TIMESTAMP WITH TIME ZONE,
  discount_expiry_date TIMESTAMP WITH TIME ZONE,
  is_discount_active BOOLEAN DEFAULT FALSE,
  custom_price_label VARCHAR(80) DEFAULT 'মাসিক',
  currency VARCHAR(10) DEFAULT 'BDT',
  currency_symbol VARCHAR(10) DEFAULT '৳',
  billing_type VARCHAR(50) DEFAULT 'monthly', -- 'monthly', 'quarterly', 'one_time', 'custom'
  features JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  timeline VARCHAR(100),
  ideal_for VARCHAR(255),
  is_featured BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  badge VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  cta_text VARCHAR(100) DEFAULT 'Get This Package',
  cta_whatsapp_text VARCHAR(100) DEFAULT 'Discuss on WhatsApp',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Customer Purchase Requests / CRM Leads
CREATE TABLE IF NOT EXISTS purchase_requests (
  id VARCHAR(50) PRIMARY KEY, -- e.g. 'REQ-2026-1001'
  package_id VARCHAR(100) REFERENCES packages(id) ON DELETE SET NULL,
  package_name VARCHAR(200) NOT NULL,
  package_category VARCHAR(100),
  quoted_price NUMERIC(12, 2) NOT NULL, -- LOCKED AT SUBMISSION TIME
  currency VARCHAR(10) DEFAULT 'BDT',
  full_name VARCHAR(150) NOT NULL,
  business_name VARCHAR(200) NOT NULL,
  whatsapp_number VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  website_or_social VARCHAR(500),
  project_requirements TEXT,
  preferred_contact_method VARCHAR(50) DEFAULT 'whatsapp' CHECK (preferred_contact_method IN ('whatsapp', 'phone', 'email')),
  status VARCHAR(50) DEFAULT 'new_request' CHECK (status IN (
    'new_request',
    'contacted',
    'discussion',
    'quotation_sent',
    'confirmed',
    'in_progress',
    'completed',
    'on_hold',
    'cancelled',
    'lost'
  )),
  assigned_agent_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  internal_notes TEXT,
  submission_ip VARCHAR(100),
  lead_source_page VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Purchase Request History & Timeline
CREATE TABLE IF NOT EXISTS lead_history (
  id SERIAL PRIMARY KEY,
  request_id VARCHAR(50) NOT NULL REFERENCES purchase_requests(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  user_name VARCHAR(150),
  previous_status VARCHAR(50),
  new_status VARCHAR(50),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. General Website Contact Enquiries
CREATE TABLE IF NOT EXISTS website_enquiries (
  id VARCHAR(50) PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  service_needed VARCHAR(150),
  budget_range VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Smart WhatsApp Engagement Popups (Per-Page Config)
CREATE TABLE IF NOT EXISTS engagement_popups (
  id SERIAL PRIMARY KEY,
  page_route VARCHAR(200) NOT NULL UNIQUE, -- e.g. '/', '/services/web-development/', etc.
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  cta_text VARCHAR(100) DEFAULT 'Chat on WhatsApp',
  prefilled_message TEXT,
  delay_seconds INTEGER DEFAULT 15,
  display_frequency VARCHAR(50) DEFAULT 'once_per_session' CHECK (display_frequency IN ('once_per_session', 'once_per_day', 'always')),
  is_enabled BOOLEAN DEFAULT TRUE,
  show_on_mobile BOOLEAN DEFAULT TRUE,
  show_on_desktop BOOLEAN DEFAULT TRUE,
  specific_agent_id INTEGER REFERENCES whatsapp_agents(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Website Content & Editable CMS Blocks
CREATE TABLE IF NOT EXISTS website_content (
  id SERIAL PRIMARY KEY,
  section_key VARCHAR(100) UNIQUE NOT NULL,
  section_group VARCHAR(50) NOT NULL, -- 'hero', 'promotions', 'contact', 'footer', 'announcements'
  title VARCHAR(255),
  content_value TEXT NOT NULL,
  meta_json JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Activity & Audit Logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
  user_name VARCHAR(150),
  action_type VARCHAR(100) NOT NULL, -- e.g. 'LOGIN', 'PACKAGE_UPDATE', 'STATUS_CHANGE', 'OVERRIDE'
  entity_type VARCHAR(100),
  entity_id VARCHAR(100),
  details JSONB DEFAULT '{}'::jsonb,
  ip_address VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_agents_status ON whatsapp_agents(status, is_default);
CREATE INDEX IF NOT EXISTS idx_whatsapp_schedules_agent ON whatsapp_schedules(agent_id, is_active);
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category, is_active);
CREATE INDEX IF NOT EXISTS idx_purchase_requests_status ON purchase_requests(status);
CREATE INDEX IF NOT EXISTS idx_purchase_requests_created ON purchase_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_clicks_created ON whatsapp_clicks(created_at DESC);
