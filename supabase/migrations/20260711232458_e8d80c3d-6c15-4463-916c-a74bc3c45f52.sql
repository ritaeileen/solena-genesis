
CREATE TABLE public.request_access_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  horizon TEXT NOT NULL CHECK (horizon IN ('1-3','3-7','7+')),
  intent TEXT NOT NULL,
  source TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'received',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.request_access_submissions TO anon, authenticated;
GRANT ALL ON public.request_access_submissions TO service_role;

ALTER TABLE public.request_access_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a request access inquiry"
  ON public.request_access_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 2 AND 80
    AND length(email) BETWEEN 3 AND 160
    AND length(organization) BETWEEN 2 AND 120
    AND length(intent) BETWEEN 30 AND 1200
  );

CREATE INDEX request_access_submissions_created_at_idx
  ON public.request_access_submissions (created_at DESC);
