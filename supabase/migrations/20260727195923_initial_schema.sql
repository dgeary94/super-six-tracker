-- Players who have ever taken part in the league
create table players (
  id bigint generated always as identity primary key,
  name text not null unique
);

-- Each season of the league (e.g. "22-23", "25-26")
create table seasons (
  id bigint generated always as identity primary key,
  label text not null unique
);

-- Which players took part in which season
create table season_entries (
  season_id bigint not null references seasons (id) on delete cascade,
  player_id bigint not null references players (id) on delete cascade,
  primary key (season_id, player_id)
);

-- Individual round scores
create table rounds (
  id bigint generated always as identity primary key,
  season_id bigint not null references seasons (id) on delete cascade,
  player_id bigint not null references players (id) on delete cascade,
  round_number smallint not null,
  score numeric not null,
  correct_results smallint,
  correct_scores smallint,
  unique (season_id, player_id, round_number)
);

create index rounds_season_id_idx on rounds (season_id);
create index rounds_player_id_idx on rounds (player_id);

-- Public site only ever reads data; writes go through the Supabase
-- dashboard (service role), so anon/authenticated only get select.
alter table players enable row level security;
alter table seasons enable row level security;
alter table season_entries enable row level security;
alter table rounds enable row level security;

create policy "Public read access" on players for select using (true);
create policy "Public read access" on seasons for select using (true);
create policy "Public read access" on season_entries for select using (true);
create policy "Public read access" on rounds for select using (true);
