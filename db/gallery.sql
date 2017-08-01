DROP DATABASE IF EXISTS gallery_database;
DROP USER IF EXISTS something_fun;

CREATE USER something_fun WITH LOGIN PASSWORD 'password';
CREATE DATABASE gallery_database WITH OWNER something_fun;
\c gallery_database;

ALTER TABLE gallery_database OWNER TO something_fun;
