# How to run app

1. If run in your local PC
   1.1 Development

- uncommenting: target, volumes, command in client and server service
- commenting: volumes section (certbot-etc and certbot-var) and its mounting in reverse_proxy's volume
- docker compose up

  1.2 Production

- commenting: target, volumes, command in client and server service
- commenting: volumes section (certbot-etc and certbot-var) and its mounting in reverse_proxy's volume
- docker compose up

2. If run in VPS
   1.1 Development

- uncommenting: target, volumes, command in client and server service
- commenting: volumes section (certbot-etc and certbot-var) and its mounting in reverse_proxy's volume
- docker compose up
