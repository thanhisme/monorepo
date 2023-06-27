# Vote App

The following is a [link](https://voteapp.nguyenhoaithanh.tech) to a demo.

### Tech stack

- [NestJS] - A progressive Node.js framework for building efficient, reliable and scalable server-side applications!
- [ReactJS] - A JavaScript library for building user interfaces
- [SocketIO] - Bidirectional and low-latency communication for every platform
- [Docker] - The most-used Tool in Stack Overflow’s 2023 Developer Survey
- [Jenkins] - The butler that does not hesitate to do a disservice

### Project Structure

```bash
├── apps
│   ├── client
│   │   ├── package.json
│   │   └── Dockerfile
│   └── server
│       ├── package.json
│       └── Dockerfile
├── packages
│   └── shared
│       └── package.json
├── .dockerignore
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── turbo.json
└── yarn.lock
```

This project is organized using a monorepo template provided by Turbo

- `apps` contains main services (client and server)
- `packages` holds the shared code between main services

### Prerequisites

- Make sure you have already installed [Docker] on your machine.
- You should change your default Docker storage directory to avoid some unexpected errors caused by running out of memory. [See here](https://www.baeldung.com/ops/docker-image-change-installation-directory).

### Run the application

You need to follow these steps before run the application:

- In `apps/client`, create a `.env` file with the following content
  
```sh
# apps/client/.env

VITE_POLLS_NAMESPACE=polls
```
- In root dir, create `nginx/templates/default.conf.template` with the following content

```sh
# nginx/templates/default.conf.template

upstream server {
    server ${SERVER_NAME}:${SERVER_PORT};
}

upstream client {
    server ${CLIENT_NAME}:${CLIENT_PORT};
}

server {
    listen 80;
    listen [::]:80;

    location / {
        proxy_pass http://client;
    }

    location /api {
      rewrite ^/api/?$ / break;
      rewrite ^/api/(.*)$ /$1 break;
      proxy_pass http://server;

      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;
      proxy_set_header X-NginX-Proxy true;
    }

    location /socket.io/ {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;

        proxy_pass http://server;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Run the application

1. In development mode

```
docker compose -f docker-compose.dev.yml up
```

2. In production mode

```
docker compose -f docker-compose.prod.yml up
```

### License

MIT

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[NestJS]: https://nestjs.com/
[ReactJS]: https://react.dev/
[SocketIO]: https://socket.io/
[Docker]: https://www.docker.com/
[Jenkins]: https://www.jenkins.io/
