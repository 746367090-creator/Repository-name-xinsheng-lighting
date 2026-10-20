-- XINSHERN CMS V4: SEO/AI fields and automatic spam retention.
-- Run once in Supabase SQL Editor before deploying this version.
alter table public.news add column if not exists seo jsonb not null default '{}';
alter table public.news add column if not exists ai_summary text default '';
alter table public.inquiries add column if not exists spam_marked_at timestamptz;
create extension if not exists pg_cron;

create or replace function public.set_inquiry_spam_marked_at()
returns trigger language plpgsql as $$
begin
  if new.status = 'spam' and old.status is distinct from 'spam' then
    new.spam_marked_at = now();
  elsif new.status is distinct from 'spam' then
    new.spam_marked_at = null;
  end if;
  return new;
end;
$$;

drop trigger if exists inquiries_spam_timestamp on public.inquiries;
create trigger inquiries_spam_timestamp
before update of status on public.inquiries
for each row execute function public.set_inquiry_spam_marked_at();

-- If pg_cron is available in the Supabase project, schedule a daily purge.
-- The application also purges expired spam whenever the inquiry admin is opened.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    if not exists (select 1 from cron.job where jobname = 'delete-spam-inquiries-after-7-days') then
      perform cron.schedule(
        'delete-spam-inquiries-after-7-days',
        '15 2 * * *',
        $cron$delete from public.inquiries where status = 'spam' and spam_marked_at < now() - interval '7 days'$cron$
      );
    end if;
  end if;
end $$;
