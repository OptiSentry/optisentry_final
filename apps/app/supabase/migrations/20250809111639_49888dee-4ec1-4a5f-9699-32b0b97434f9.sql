-- Initial schema for the production-ready web application
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    marketing_opt_in BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- Organizations table
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    plan TEXT DEFAULT 'pro' CHECK (plan IN ('pro', 'business', 'enterprise')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization members table
CREATE TABLE public.organization_members (
    org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (org_id, user_id)
);

-- Audit logs table
CREATE TABLE public.audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    org_id UUID REFERENCES public.organizations(id),
    action TEXT NOT NULL,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User settings table
CREATE TABLE public.settings (
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    locale TEXT DEFAULT 'de' CHECK (locale IN ('de', 'en')),
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    mfa_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

-- DSAR (Data Subject Access Request) table
CREATE TABLE public.dsar_requests (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    type TEXT NOT NULL CHECK (type IN ('access', 'rectification', 'erasure', 'restriction', 'portability', 'objection')),
    details TEXT,
    status TEXT DEFAULT 'received' CHECK (status IN ('received', 'processing', 'completed', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cookie consents table
CREATE TABLE public.cookie_consents (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    device_id TEXT,
    necessary BOOLEAN DEFAULT true,
    preferences BOOLEAN DEFAULT false,
    statistics BOOLEAN DEFAULT false,
    marketing BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dsar_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for settings
CREATE POLICY "Users can view own settings" ON public.settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.settings
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON public.settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for organizations
CREATE POLICY "Organization members can view organization" ON public.organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members 
            WHERE org_id = id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Organization owners can update organization" ON public.organizations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.organization_members 
            WHERE org_id = id AND user_id = auth.uid() AND role = 'owner'
        )
    );

CREATE POLICY "Authenticated users can create organizations" ON public.organizations
    FOR INSERT TO authenticated WITH CHECK (true);

-- RLS Policies for organization_members
CREATE POLICY "Organization members can view members" ON public.organization_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members om 
            WHERE om.org_id = org_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Organization owners and admins can manage members" ON public.organization_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.organization_members om 
            WHERE om.org_id = org_id AND om.user_id = auth.uid() AND om.role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Users can join organizations when invited" ON public.organization_members
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for audit_logs
CREATE POLICY "Organization members can view org audit logs" ON public.audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.organization_members om 
            WHERE om.org_id = org_id AND om.user_id = auth.uid()
        )
    );

CREATE POLICY "Authenticated users can create audit logs" ON public.audit_logs
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- RLS Policies for dsar_requests
CREATE POLICY "Users can view own DSAR requests" ON public.dsar_requests
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create DSAR requests" ON public.dsar_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for cookie_consents
CREATE POLICY "Users can view own cookie consents" ON public.cookie_consents
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can insert cookie consents" ON public.cookie_consents
    FOR INSERT WITH CHECK (true);

-- Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.settings (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON public.settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dsar_requests_updated_at
    BEFORE UPDATE ON public.dsar_requests
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();