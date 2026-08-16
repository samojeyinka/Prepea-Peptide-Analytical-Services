# Prepea VPS Deployment Guide (Ubuntu + Nginx)

## Prerequisites
- Ubuntu 22.04/24.04 VPS with root/sudo access
- Domain pointed to VPS IP (e.g., `prepea.com`)
- Git, Node.js 20+ installed on VPS

---

## Step 1: Install Node.js 20 (if not installed)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # should show v20.x
```

## Step 2: Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## Step 3: Create project directory and clone

```bash
cd /var/www
sudo mkdir -p prepea
sudo chown $USER:$USER prepea
cd prepea
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

## Step 4: Install dependencies and build

```bash
npm ci
npm run build
```

This creates a `dist/` folder with the production build.

## Step 5: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/prepea
```

Paste this config:

```nginx
server {
    listen 80;
    server_name prepea.com www.prepea.com;

    root /var/www/prepea/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback - all routes serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Deny hidden files
    location ~ /\. {
        deny all;
    }
}
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

## Step 6: Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/prepea /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## Step 7: Set up SSL with Certbot (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d prepea.com -d www.prepea.com
```

Follow the prompts. Certbot auto-renews via a systemd timer.

## Step 8: Auto-deploy on push (optional)

Create a deploy script:

```bash
sudo nano /var/www/prepea/deploy.sh
```

```bash
#!/bin/bash
cd /var/www/prepea
git pull origin main
npm ci --omit=dev
npm run build
echo "Deployed $(date)" >> /var/www/prepea/deploy.log
```

```bash
chmod +x /var/www/prepea/deploy.sh
```

Then set up a webhook or use GitHub Actions to SSH in and run `deploy.sh` on push to main.

### GitHub Actions auto-deploy (add to `.github/workflows/ci.yml`):

```yaml
  deploy:
    name: Deploy to VPS
    runs-on: ubuntu-latest
    needs: [test, security, build]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - uses: actions/checkout@v4
      - uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /var/www/prepea
            git pull origin main
            npm ci --omit=dev
            npm run build
            sudo systemctl reload nginx
```

Add these secrets in GitHub: Settings > Secrets > Actions:
- `VPS_HOST` - your VPS IP or domain
- `VPS_USER` - SSH username
- `VPS_SSH_KEY` - private SSH key content

---

## Verify

```bash
curl -I http://localhost
# Should return 200 with HTML content

# Check from browser
# https://prepea.com
```

## Troubleshooting

| Issue | Fix |
|---|---|
| 404 on page refresh | Ensure `try_files $uri /index.html` is in Nginx config |
| Assets 404 | Check `dist/` exists and root path is correct |
| SSL error | Run `sudo certbot renew --dry-run` |
| Permission denied | `sudo chown -R www-data:www-data /var/www/prepea/dist` |
| Port 80 blocked | `sudo ufw allow 'Nginx Full'` |
