DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  designation VARCHAR(255),
  about_me VARCHAR,
  phone_number VARCHAR(255),
  avatar VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  skills VARCHAR,
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  employer BOOLEAN DEFAULT FALSE
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  tech_stack VARCHAR,
  screenshot VARCHAR(255) NOT NULL,
  description VARCHAR,
  date_completed DATE,
  project_url VARCHAR(255) NOT NULL,
  likes INTEGER,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR,
  company VARCHAR(255) NOT NULL,
  job_type VARCHAR(255),
  tech_stack VARCHAR,
  min_salary INTEGER,
  max_salary INTEGER,
  hourly_wage INTEGER,
  city VARCHAR(255),
  province VARCHAR(255),
  start_date DATE,
  end_date DATE NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  employer_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE certifications (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  start_date DATE,
  end_date DATE NOT NULL,
  institution VARCHAR(255),
  city VARCHAR(255),
  province VARCHAR(255),
  jobseeker_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
);