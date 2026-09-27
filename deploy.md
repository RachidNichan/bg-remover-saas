git clone git@github.com:RachidNichan/bg-remover-saas.git
cd bg-remover-saas

nano .env
nano firebase-service-account.json

docker compose up -d --build

docker ps

sudo nano /etc/nginx/sites-available/removebackgrounds.online

server {
    server_name removebackgrounds.online www.removebackgrounds.online;

    location / {
        proxy_pass http://localhost:3010;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        client_max_body_size 20M;
    }
}

sudo ln -s /etc/nginx/sites-available/removebackgrounds.online /etc/nginx/sites-enabled/

sudo nginx -t
sudo systemctl reload nginx

sudo certbot --nginx -d removebackgrounds.online -d www.removebackgrounds.online


https://removebackgrounds.online

