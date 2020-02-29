CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(15),
  created_on DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_on DATE DEFAULT NULL,
  tuning VARCHAR(2)[],
  note VARCHAR(1)[][]
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(15)
);