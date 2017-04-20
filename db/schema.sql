-- user Table

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name text,
  last_name text,
  email text
)

--vehicle TABLE

CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  make text,
  model text,
  year integer,
  owner_id integer references users(id)
)