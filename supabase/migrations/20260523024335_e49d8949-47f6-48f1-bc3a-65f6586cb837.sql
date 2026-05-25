
-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit contact form"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Consultation requests
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  service TEXT,
  budget TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can request consultation"
  ON public.consultation_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Job applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  portfolio_url TEXT,
  cover_letter TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can apply for jobs"
  ON public.job_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Blog posts
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'Bluski Solutions',
  category TEXT,
  read_minutes INTEGER NOT NULL DEFAULT 5,
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blog posts are public"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

-- Seed a few blog posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, read_minutes, published, published_at) VALUES
('ai-in-iowa-manufacturing', 'How AI Is Reshaping Iowa Manufacturing', 'A field report from three quarters of deploying ML on the factory floor across the Midwest.', 'Manufacturing in Iowa is undergoing a quiet transformation. From precision agriculture equipment to specialty chemicals, AI-driven inspection and predictive maintenance are reshaping margins and uptime...', 'AI & ML', 6, true, now()),
('the-case-for-private-llms', 'The Case for Private LLMs in Regulated Industries', 'Why finance, healthcare, and logistics teams should think twice before piping production data into a public chat completion API.', 'There''s a quiet reckoning happening in regulated industries. The first wave of "let''s try GPT-4 on our data" pilots is hitting compliance review, and the answers are not always what executives expected...', 'Enterprise AI', 8, true, now()),
('devops-for-ai-workloads', 'DevOps Patterns for AI Workloads', 'Inference is not a request/response problem. Here''s how we deploy models at scale.', 'Treating model inference like a stateless HTTP request is the most common reason AI projects fail in production. Inference is bursty, GPU-bound, and warm-state sensitive...', 'DevOps', 5, true, now());
