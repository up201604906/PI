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

DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS article_authors CASCADE;
DROP TABLE IF EXISTS editors CASCADE;
DROP TABLE IF EXISTS article_editors CASCADE;


DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS user_projects CASCADE;
DROP TABLE IF EXISTS project_types CASCADE;
DROP TABLE IF EXISTS user_project_type CASCADE;
DROP TABLE IF EXISTS project_status CASCADE;
DROP TABLE IF EXISTS research_team CASCADE;
DROP TABLE IF EXISTS project_assignments CASCADE;
DROP TABLE IF EXISTS sharing_communication CASCADE;

--
-- Create tables.
--

CREATE TYPE users_permissions_enum AS ENUM ('student', 'collaborator', 'admin');
CREATE TYPE projects_time_enum AS ENUM ('past', 'present');
CREATE TYPE resources_priority_enum AS ENUM ('low', 'medium', 'high');
CREATE TYPE article_state_enum AS ENUM ('in writing', 'in revision', 'published');
CREATE TYPE wishlist_state_enum AS ENUM ('open', 'ordered', 'delivered');
CREATE TYPE theses_course_enum AS ENUM ('MEIC', 'MEEC', 'MM', 'MESW', 'MECD');
CREATE TYPE theses_state_enum AS ENUM ('Proposed', 'Written', 'Submitted', 'Assigned');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  contact_email VARCHAR UNIQUE NOT NULL,
  personal_email VARCHAR UNIQUE,
  phone_number VARCHAR UNIQUE,
  password VARCHAR NOT NULL,
  permission users_permissions_enum NOT NULL,
  picture BYTEA
);

CREATE TABLE project_types (
  id SERIAL PRIMARY KEY,
  type_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE user_project_type(
    user_id INTEGER REFERENCES users(id),
    project_type_id INTEGER REFERENCES project_types(id),
    PRIMARY KEY (user_id, project_type_id)
);

-- Project Status Table
CREATE TABLE project_status (
  id SERIAL PRIMARY KEY,
  status_name VARCHAR NOT NULL UNIQUE
);

-- Research Team Table
CREATE TABLE research_team (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  field VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  optional_email VARCHAR,
  capacity VARCHAR NOT NULL,
  user_id INTEGER REFERENCES users(id)
);


CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  acronym VARCHAR NOT NULL,
  description TEXT NOT NULL,
  state VARCHAR,
  website VARCHAR,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  funding VARCHAR,
  funding_reference VARCHAR,
  external_partners TEXT,
  media BYTEA,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  project_type_id INTEGER REFERENCES project_types(id),
  project_status_id INTEGER REFERENCES project_status(id)
);


-- User Projects Table
CREATE TABLE user_projects (
  user_id INTEGER REFERENCES users(id),
  project_id INTEGER REFERENCES projects(id),
  PRIMARY KEY (user_id, project_id)
);

-- Project Research Team Association Table
CREATE TABLE project_research_team (
  project_id INTEGER REFERENCES projects(id),
  research_team_id INTEGER REFERENCES research_team(id),
  PRIMARY KEY (project_id, research_team_id)
);

-- Project Assignments Table
CREATE TABLE project_assignments (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  description TEXT NOT NULL,
  assignee INTEGER REFERENCES research_team(id) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR NOT NULL
);

-- Sharing & Communication Table
CREATE TABLE sharing_communication (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  link_type VARCHAR NOT NULL,
  link_url VARCHAR NOT NULL
);

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  year INTEGER NOT NULL,
  type VARCHAR NOT NULL,
  journal VARCHAR,
  booktitle VARCHAR,
  publisher VARCHAR,
  address VARCHAR,
  pages VARCHAR,  
  volume INTEGER,
  number INTEGER,
  series VARCHAR,
  month VARCHAR,
  note TEXT,
  url TEXT,
  doi VARCHAR,
  isbn VARCHAR,
  howpublished VARCHAR,
  organization VARCHAR,
  reference VARCHAR,
  abstract TEXT,
  keywords TEXT,
  cite TEXT,
  user_id INTEGER REFERENCES users(id)
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE article_authors (
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, author_id)
);

CREATE TABLE editors (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL UNIQUE
);


CREATE TABLE article_editors (
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  editor_id INTEGER REFERENCES editors(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, editor_id)
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
  course theses_course_enum NOT NULL,
  title VARCHAR NOT NULL,
  mentor VARCHAR NOT NULL,
  comentor VARCHAR,
  host_institution_name VARCHAR, 
  host_institution_description TEXT,
  proposer_name VARCHAR NOT NULL, 
  proposer_email VARCHAR,
  proposer_phone VARCHAR,
  proposer_position VARCHAR,
  involved_areas VARCHAR, -- Involved areas (for MEEC we have these: AUTOMATION | ENERGY | TELE; for MEIC we have these: COMPUTER ARCHITECTURES AND SYSTEMS | COMPUTER GRAPHICS AND INTERACTIVE DIGITAL MEDIA | INFORMATION SYSTEMS | INTELLIGENT SYSTEMS | PROGRAMMING SCIENCE AND TECHNOLOGY | SOFTWARE ENGINEERING; for MESW we have these: DATA ANALYSIS IN SOFTWARE ENGINEERING | SOFTWARE UNDERSTANDING AND EVOLUTION | SOFTWARE REQUIREMENTS ENGINEERING | SOFTWARE ENGINEERING | SECURITY IN SOFTWARE ENGINEERING | SOFTWARE TESTING; for MM and MECD I don't know)
  description TEXT NOT NULL,
  goals TEXT,
  innovative_aspects TEXT,
  work_plan TEXT, -- Work Plan (preparatory phase + development phase)
  bibliography TEXT,
  candidate_profile TEXT,
  work_after_dissertation TEXT,
  conferences_and_scientific_journals TEXT,
  edition VARCHAR,
  observations TEXT,
  state theses_state_enum NOT NULL
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
  state wishlist_state_enum NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (resource_id) REFERENCES resources(id),
  FOREIGN KEY (potential_resource_id) REFERENCES potential_resources(id),
  CHECK ((resource_id IS NOT NULL AND potential_resource_id IS NULL) OR
         (resource_id IS NULL AND potential_resource_id IS NOT NULL))
);
