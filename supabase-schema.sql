-- KazaDanış Database Schema
-- Supabase SQL Editor'de çalıştır

-- ============================================
-- PROFILES TABLOSU (Auth.users ile bağlantılı)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'expert', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- QUESTIONS TABLOSU (Kullanıcı soruları)
-- ============================================
CREATE TABLE public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'answered', 'closed')),
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANSWERS TABLOSU (Uzman cevapları)
-- ============================================
CREATE TABLE public.answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  expert_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_accepted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CASES TABLOSU (Kaza dosyaları)
-- ============================================
CREATE TABLE public.cases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  case_number TEXT UNIQUE,
  case_type TEXT NOT NULL CHECK (case_type IN ('traffic_accident', 'damage', 'insurance', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  fault_percentage INT DEFAULT 50,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed', 'archived')),
  total_amount DECIMAL(12,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOCUMENTS TABLOSU (Yüklenen dosyalar)
-- ============================================
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLOSU
-- ============================================
CREATE TABLE public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ANALYTICS TABLOSU (İstatistikler)
-- ============================================
CREATE TABLE public.analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  event_data JSONB,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_questions_user_id ON public.questions(user_id);
CREATE INDEX idx_questions_status ON public.questions(status);
CREATE INDEX idx_questions_created_at ON public.questions(created_at DESC);
CREATE INDEX idx_answers_question_id ON public.answers(question_id);
CREATE INDEX idx_cases_user_id ON public.cases(user_id);
CREATE INDEX idx_cases_status ON public.cases(status);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_analytics_event_type ON public.analytics(event_type);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Profiles: Herkes kendi profilini görebilir, admin her şeyi
CREATE POLICY "Profiles: Herkes kendi profilini görebilsin" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Profiles: Herkes kendi profilini güncellesin" ON public.profiles
  FOR UPDATE USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Questions: Herkes soru oluşturabilir, sadece kendi sorularını görür (admin her şeyi)
CREATE POLICY "Questions: Herkes soru oluştrsun" ON public.questions
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Questions: Herkes kendi sorularını görsün, admin her şeyi" ON public.questions
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'expert'))
  );

CREATE POLICY "Questions: Kullanıcı kendi sorusunu güncellesin" ON public.questions
  FOR UPDATE USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Answers: Uzmanlar cevap ekleyebilir, soru sahibi kendi sorusunun cevaplarını görür
CREATE POLICY "Answers: Uzmanlar cevap eklesin" ON public.answers
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('expert', 'admin'))
  );

CREATE POLICY "Answers: İlgili kişiler cevapları görsün" ON public.answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.questions q
      WHERE q.id = question_id AND (q.user_id = auth.uid() OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('expert', 'admin')
      ))
    )
  );

-- Cases: Admin tüm dosyaları görür, kullanıcı sadece kendi dosyalarını
CREATE POLICY "Cases: Kullanıcılar dosya oluştursun" ON public.cases
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Cases: Herkes kendi dosyalarını görsün, admin her şeyi" ON public.cases
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Cases: Admin dosya güncellesin" ON public.cases
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Notifications: Herkes kendi bildirimlerini görür
CREATE POLICY "Notifications: Herkes kendi bildirimlerini görsün" ON public.notifications
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Notifications: Admin bildirim oluştursun" ON public.notifications
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Documents: Dosya sahibi ve admin görsün
CREATE POLICY "Documents: İlgili kişiler dosyaları görsün" ON public.documents
  FOR SELECT USING (
    uploaded_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.cases c
      WHERE c.id = case_id AND c.user_id = auth.uid()
    ) OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Analytics: Sadece admin görsün
CREATE POLICY "Analytics: Sadece admin görsün" ON public.analytics
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- ============================================
-- İLK ADMIN KULLANICI OLUŞTURMAK İÇİN:
-- Auth.users'dan user_id'yi al, sonra:
-- INSERT INTO public.profiles (id, role) VALUES ('USER_UUID_BURAYA', 'admin');
-- ============================================

-- ============================================
-- STORAGE BUCKET (Dosya yükleme için)
-- ============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

CREATE POLICY "Documents: Admin upload edebilsin" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'documents' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Documents: İlgili kişiler görsün" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'documents' AND (
      auth.uid() = owner OR
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    )
  );

CREATE POLICY "Avatars: Herkes görebilsin" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Avatars: Kullanıcılar yüklesin" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);

CREATE POLICY "Avatars: Kullanıcılar güncellesin" ON storage.objects
  FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);
