# URL Shortener

Built using React, Node and PostgreSQL.


This repo has a docker-compose.yml updated with the client(port: 3000), server(port: 3001) and db setup.

### To set up the DB
    docker-compose run api npm run migrate

### To build the image
    docker-compose build

### To run the project
    docker-compose up -d
