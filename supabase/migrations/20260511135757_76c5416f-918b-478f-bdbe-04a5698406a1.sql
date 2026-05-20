
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can view their own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

-- Auto-promote first user to admin
create or replace function public.handle_new_user_role()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'user');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user_role();

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  title text not null,
  tag text not null default '',
  description text not null default '',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Anyone can view projects"
  on public.projects for select using (true);

create policy "Admins can insert projects"
  on public.projects for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update projects"
  on public.projects for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete projects"
  on public.projects for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Storage bucket
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true);

create policy "Public can view project images"
  on storage.objects for select using (bucket_id = 'project-images');

create policy "Admins can upload project images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can update project images"
  on storage.objects for update to authenticated
  using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete project images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'project-images' and public.has_role(auth.uid(), 'admin'));
