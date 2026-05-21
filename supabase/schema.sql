-- ═══════════════════════════════════════════════════════════════════════════
-- THOUGHTS DATABASE SCHEMA
-- Run this in Supabase SQL Editor to set up your database
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE: users
-- ═══════════════════════════════════════════════════════════════════════════
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    anonymous_id VARCHAR(64) UNIQUE,
    display_name VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_anonymous_id ON public.users(anonymous_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE: thoughts
-- ═══════════════════════════════════════════════════════════════════════════
DROP TABLE IF EXISTS public.thoughts CASCADE;

CREATE TABLE public.thoughts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    content TEXT NOT NULL CHECK (char_length(content) BETWEEN 1 AND 300),
    language VARCHAR(10) NOT NULL DEFAULT 'EN',
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_thoughts_created_at ON public.thoughts(created_at DESC);
CREATE INDEX idx_thoughts_language ON public.thoughts(language);
CREATE INDEX idx_thoughts_user_id ON public.thoughts(user_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- TABLE: likes
-- ═══════════════════════════════════════════════════════════════════════════
DROP TABLE IF EXISTS public.likes CASCADE;

CREATE TABLE public.likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    thought_id UUID REFERENCES public.thoughts(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_thought_like UNIQUE (user_id, thought_id)
);

CREATE INDEX idx_likes_user_thought ON public.likes(user_id, thought_id);
CREATE INDEX idx_likes_thought_id ON public.likes(thought_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY POLICIES
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Thoughts: Everyone can read
DROP POLICY IF EXISTS "Public read thoughts" ON public.thoughts;
CREATE POLICY "Public read thoughts" ON public.thoughts FOR SELECT USING (true);

-- Thoughts: Anyone can create (anon + authenticated)
DROP POLICY IF EXISTS "Anyone create thoughts" ON public.thoughts;
CREATE POLICY "Anyone create thoughts" ON public.thoughts FOR INSERT WITH CHECK (
    auth.role() IN ('authenticated', 'anon') OR auth.role() IS NULL
);

-- Thoughts: No deletes
DROP POLICY IF EXISTS "No delete thoughts" ON public.thoughts;
CREATE POLICY "No delete thoughts" ON public.thoughts FOR DELETE USING (false);

-- Likes: Everyone can read
DROP POLICY IF EXISTS "Public read likes" ON public.likes;
CREATE POLICY "Public read likes" ON public.likes FOR SELECT USING (true);

-- Likes: Anyone can like
DROP POLICY IF EXISTS "Anyone can like" ON public.likes;
CREATE POLICY "Anyone can like" ON public.likes FOR INSERT WITH CHECK (
    auth.role() IN ('authenticated', 'anon') OR auth.role() IS NULL
);

-- Likes: Users can unlike their own likes
DROP POLICY IF EXISTS "Users can unlike" ON public.likes;
CREATE POLICY "Users can unlike" ON public.likes FOR DELETE USING (
    auth.uid() = user_id OR auth.role() = 'anon'
);

-- ═══════════════════════════════════════════════════════════════════════════
-- UPDATED_AT TRIGGER
-- ═══════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_thoughts_updated_at ON public.thoughts;
CREATE TRIGGER update_thoughts_updated_at
BEFORE UPDATE ON public.thoughts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════
-- RPC FUNCTIONS FOR LIKE COUNTING
-- ═══════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION increment_like(thought_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.thoughts
    SET likes_count = likes_count + 1
    WHERE id = thought_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION decrement_like(thought_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.thoughts
    SET likes_count = CASE 
        WHEN likes_count > 0 THEN likes_count - 1 
        ELSE 0 
    END
    WHERE id = thought_id;
END;
$$ LANGUAGE plpgsql;

-- ═══════════════════════════════════════════════════════════════════════════
-- REALTIME CONFIGURATION
-- ═══════════════════════════════════════════════════════════════════════════
ALTER PUBLICATION supabase_realtime ADD TABLE public.thoughts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;

-- ═══════════════════════════════════════════════════════════════════════════
-- SEED DATA (optional sample thoughts)
-- ═══════════════════════════════════════════════════════════════════
INSERT INTO public.thoughts (content, language, likes_count) VALUES
('The only way to do great work is to love what you do.', 'EN', 42),
('Knowledge is power, but enthusiasm pulls the lever.', 'EN', 38),
('जो जिया वही गिरि, मरता कौन है।', 'HI', 25),
('Small steps in the right direction can turn out to be the biggest step of your life.', 'EN', 56),
('ಸಾಧನೆ ಮಾಡಿದವನಿಗೆ ಸಿದ್ದಿ ಸಿಗುತ್ತದೆ.', 'KN', 18),
('The best time to plant a tree was 20 years ago. The second best time is now.', 'EN', 33);