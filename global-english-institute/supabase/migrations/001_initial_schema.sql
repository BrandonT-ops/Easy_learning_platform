-- ============================================================
-- Global English Institute — Initial Database Schema
-- ============================================================

-- PROFILES (extends Supabase auth.users)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text check (role in ('admin','student')) default 'student',
  created_at timestamp with time zone default now()
);

-- Enable Row-Level Security
alter table profiles enable row level security;

-- RLS Policies for profiles
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'student');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- WEBSITE SETTINGS
create table if not exists website_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text default 'Talkr by Easy Learning',
  tagline text default 'L''anglais ne s''apprend pas... il se pratique.',
  primary_color text default '#2563eb',
  contact_email text default 'info@talkrbyeasylearning.com',
  phone text default '651 31 60 26',
  updated_at timestamp with time zone default now()
);

alter table website_settings enable row level security;

create policy "Anyone can read website settings"
  on website_settings for select
  using (true);

create policy "Admins can update website settings"
  on website_settings for all
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Insert default settings row
insert into website_settings (site_name, tagline, primary_color, contact_email, phone)
values (
  'Talkr by Easy Learning',
  'L''anglais ne s''apprend pas... il se pratique.',
  '#2563eb',
  'info@talkrbyeasylearning.com',
  '651 31 60 26'
) on conflict do nothing;


-- PLACEMENT TESTS
create table if not exists placement_tests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  reading_score integer,
  grammar_score integer,
  listening_score integer,
  writing_score integer,
  speaking_score integer,
  total_score integer,
  cefr_level text check (cefr_level in ('Beginner', 'Intermediate', 'Advanced')),
  status text default 'pending' check (status in ('pending', 'contacted', 'enrolled', 'rejected')),
  writing_response text,
  speaking_url text,
  created_at timestamp with time zone default now()
);

alter table placement_tests enable row level security;

create policy "Anyone can insert placement tests"
  on placement_tests for insert
  with check (true);

create policy "Admins can view all placement tests"
  on placement_tests for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update placement tests"
  on placement_tests for update
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Index for filtering
create index if not exists idx_placement_tests_cefr on placement_tests(cefr_level);
create index if not exists idx_placement_tests_status on placement_tests(status);
create index if not exists idx_placement_tests_created on placement_tests(created_at desc);


-- REGISTRATIONS
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  country text,
  preferred_schedule text,
  level text,
  created_at timestamp with time zone default now()
);

alter table registrations enable row level security;

create policy "Anyone can insert registrations"
  on registrations for insert
  with check (true);

create policy "Admins can view all registrations"
  on registrations for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create index if not exists idx_registrations_created on registrations(created_at desc);


-- TESTIMONIALS
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  content text not null,
  is_visible boolean default true,
  created_at timestamp with time zone default now()
);

alter table testimonials enable row level security;

create policy "Anyone can view visible testimonials"
  on testimonials for select
  using (is_visible = true);

create policy "Admins can manage testimonials"
  on testimonials for all
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Seed sample testimonials
insert into testimonials (student_name, content, is_visible) values
  ('Maria S.', 'The placement test was accurate and professionally designed. The results matched my actual level perfectly. I started at B1 and the program helped me reach B2 in four months.', true),
  ('David K.', 'I appreciated the structured approach to online learning. The CEFR framework gave me clear milestones to work toward. My professional communication improved significantly.', true),
  ('Aisha T.', 'As a non-native speaker preparing for work in an English-speaking country, this institute gave me exactly the tools I needed. The writing feedback was especially valuable.', true)
on conflict do nothing;


-- STORAGE BUCKET for speaking recordings
-- Run this in the Supabase dashboard Storage section:
-- 1. Create a bucket named 'speaking-recordings'
-- 2. Set to private (not public) or configure appropriate RLS
-- The application handles upload via the Supabase client with anon key
