CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  make text,
  model text,
  year integer,
  owner_id integer references users(id)
)