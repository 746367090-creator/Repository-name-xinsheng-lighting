-- XINSHERN V5: public product search analytics
create table if not exists public.search_queries(
  id uuid primary key default gen_random_uuid(),
  query text not null,
  result_count integer,
  created_at timestamptz not null default now()
);

alter table public.search_queries enable row level security;

drop policy if exists "public create search query" on public.search_queries;
create policy "public create search query" on public.search_queries
for insert to anon, authenticated
with check(char_length(query) between 2 and 120);

drop policy if exists "admin search queries" on public.search_queries;
create policy "admin search queries" on public.search_queries
for select to authenticated
using(true);

create index if not exists search_queries_created_idx on public.search_queries(created_at desc);
