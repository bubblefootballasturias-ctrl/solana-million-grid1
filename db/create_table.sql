-- Crea la tabla purchases en Supabase (Postgres)
create table if not exists purchases (
  id uuid default gen_random_uuid() primary key,
  buyer text not null,
  squares jsonb not null,
  cid text not null,
  priceSol numeric(10,6),
  txSignature text,
  inserted_at timestamptz default now()
);
