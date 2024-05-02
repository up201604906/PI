-- init.sql

--
-- Drop any existing tables.
--
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS user_projects CASCADE;

DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS user_articles CASCADE;

DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS user_events CASCADE;

DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS project_tags CASCADE;
DROP TABLE IF EXISTS article_tags CASCADE;
DROP TABLE IF EXISTS event_tags CASCADE;
DROP TABLE IF EXISTS user_tags CASCADE;

DROP TABLE IF EXISTS theses CASCADE;
DROP TABLE IF EXISTS mentoring CASCADE;

DROP TABLE IF EXISTS licenses CASCADE;

DROP TABLE IF EXISTS pc_allocation CASCADE;
DROP TABLE IF EXISTS user_pc_allocation CASCADE;

DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS potential_resources CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;

--
-- Create tables.
--

CREATE TYPE users_permissions_enum AS ENUM ('student', 'collaborator', 'admin');
CREATE TYPE projects_time_enum AS ENUM ('past', 'present');
CREATE TYPE resources_priority_enum AS ENUM ('low', 'medium', 'high');
CREATE TYPE article_state_enum AS ENUM ('in writing', 'in revision', 'published');
CREATE TYPE theses_state_enum AS ENUM ('proposed', 'written', 'submitted');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  permission users_permissions_enum NOT NULL,
  picture BYTEA
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  acronym VARCHAR NOT NULL,
  description TEXT NOT NULL,
  state VARCHAR NOT NULL,
  website VARCHAR,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  funding VARCHAR,
  funding_reference FLOAT,
  external_partners TEXT,
  time projects_time_enum NOT NULL,
  media BYTEA
);

CREATE TABLE user_projects (
  user_id INTEGER REFERENCES users(id),
  project_id INTEGER REFERENCES projects(id),
  PRIMARY KEY (user_id, project_id)
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  year INTEGER NOT NULL,
  type VARCHAR NOT NULL,
  publisher VARCHAR NOT NULL, 
  pages INTEGER,
  volume INTEGER,
  number INTEGER,
  organization VARCHAR,
  reference VARCHAR,
  abstract TEXT NOT NULL,
  keywords TEXT,
  cite TEXT,
  state article_state_enum NOT NULL
);

CREATE TABLE user_articles (
  user_id INTEGER REFERENCES users(id),
  article_id INTEGER REFERENCES articles(id),
  PRIMARY KEY (user_id, article_id)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  location VARCHAR NOT NULL,
  website VARCHAR
);

CREATE TABLE user_events (
  user_id INTEGER REFERENCES users(id),
  event_id INTEGER REFERENCES events(id),
  PRIMARY KEY (user_id, event_id)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT
);

CREATE TABLE project_tags (
  project_id INTEGER REFERENCES projects(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (project_id, tag_id)
);

CREATE TABLE article_tags (
  article_id INTEGER REFERENCES articles(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (article_id, tag_id)
);

CREATE TABLE event_tags (
  event_id INTEGER REFERENCES events(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (event_id, tag_id)
);

CREATE TABLE user_tags (
  user_id INTEGER REFERENCES users(id),
  tag_id INTEGER REFERENCES tags(id),
  PRIMARY KEY (user_id, tag_id)
);

CREATE TABLE theses (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  course VARCHAR NOT NULL,
  state theses_state_enum NOT NULL,
  proposer_id INTEGER,
  mentor_id INTEGER,
  comentor_id INTEGER,
  FOREIGN KEY (proposer_id) REFERENCES users(id),
  FOREIGN KEY (mentor_id) REFERENCES users(id),
  FOREIGN KEY (comentor_id) REFERENCES users(id)
);

CREATE TABLE mentoring (
  mentor_id INTEGER REFERENCES users(id),
  mentee_id INTEGER REFERENCES users(id),
  PRIMARY KEY (mentor_id, mentee_id)
);

CREATE TABLE licenses (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  equipment TEXT NOT NULL,
  login VARCHAR NOT NULL,
  password VARCHAR NOT NULL
);

CREATE TABLE pc_allocation (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  serial_number VARCHAR NOT NULL,
  room VARCHAR NOT NULL
);

CREATE TABLE user_pc_allocation (
  user_id INTEGER REFERENCES users(id),
  pc_allocation_id INTEGER REFERENCES pc_allocation(id),
  PRIMARY KEY (user_id, pc_allocation_id)
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR NOT NULL,
  quantity INTEGER NOT NULL,
  available INTEGER NOT NULL,
  supplier VARCHAR,
  room VARCHAR,
  cabinet VARCHAR,
  shelf VARCHAR,
  box VARCHAR,
  price FLOAT,
  priority resources_priority_enum
);

CREATE TABLE potential_resources (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR NOT NULL,
  supplier VARCHAR,
  price FLOAT,
  priority resources_priority_enum
);

CREATE TABLE wishlist (
  user_id INTEGER NOT NULL,
  resource_id INTEGER,
  potential_resource_id INTEGER,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (resource_id) REFERENCES resources(id),
  FOREIGN KEY (potential_resource_id) REFERENCES potential_resources(id),
  CHECK ((resource_id IS NOT NULL AND potential_resource_id IS NULL) OR 
         (resource_id IS NULL AND potential_resource_id IS NOT NULL))
);
