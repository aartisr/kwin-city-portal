-- Optional local/demo seed data. Never run this automatically in production.
INSERT INTO public.discussion_posts (id, author, title, text, likes, created_at)
VALUES
  ('1', 'Admin', 'Welcome to KWIN Community Discussion',
   'A space for residents, investors, researchers, and journalists to discuss the future of North Bengaluru and KWIN initiatives.',
   5, now() - interval '7 days'),
  ('2', 'Admin', 'What are your expectations for the innovation hub?',
   'Share thoughts on how the innovation hub can support startups and entrepreneurs in North Bengaluru.',
   3, now() - interval '3 days')
ON CONFLICT (id) DO NOTHING;
