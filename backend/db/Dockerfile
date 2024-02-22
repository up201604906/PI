FROM postgres:latest

# Copy SQL scripts to Docker entrypoint for init scripts
COPY 01-init.sql /docker-entrypoint-initdb.d/
COPY 02-data.sql /docker-entrypoint-initdb.d/
