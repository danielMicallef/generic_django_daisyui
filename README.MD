# Starter template
Starter template initialized from base at https://app-generator.dev/docs/technologies/django/integrate-daisyui.html

## Getting Started (Locally)
1. Create the directories using the command

    ```bash
    mkdir .certs
    ```

2. Generate SSL certificates

    ```bash
    SSL_KEY=.certs/localhost.key
    SSL_CRT=.certs/localhost.crt
    SSL_PEM=.certs/localhost.pem
    openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 \
       -keyout $SSL_KEY -out $SSL_PEM \
       -subj "/C=US/ST=YourState/L=YourCity/O=Example-Certificates/CN=localhost"
    openssl x509 -outform pem -in $SSL_PEM -out $SSL_CRT
    ```

3. Fix certs permission

    ```bash
    # reverse-proxy ssl certificates
    chmod 600 .certs/localhost.key
    chmod 644 .certs/localhost.crt
    chmod 600 .certs/localhost.pem
    ```

4. Create a `.env` file using the `.env.example` file as template

     ```bash
     cp .env.example .env
     ```
   Notes: 
    - Update `DJANGO_SECRET_KEY` with a random string. You can generate one using the command `openssl rand -base64 32`

5. Start the software in development (hot reloading is still a WIP)
    
    ```bash
    docker compose -f docker-compose.yml up -d --build
    ```
   

Alternatively you can run the application without docker presuming that the database is available:
   
   To run the database in docker go with:
   ```bash
   docker compose up -d pr_db
   ```
   Install Dependencies

   ```bash
   cd django && uv sync
   ```
   Run the backend
   ```bash
   uv run --env-file=../.env python src/manage.py runserver
   ```
   Separately run bun to generate the static files.
   ```bash
   bun run dev
   ```