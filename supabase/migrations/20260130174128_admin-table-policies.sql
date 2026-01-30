
create table public.admins (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role text default 'admin',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.admins enable row level security;

create policy "Admins can view admins table"
  on public.admins for select
  using (auth.uid() = id);