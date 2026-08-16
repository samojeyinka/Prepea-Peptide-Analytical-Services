# Prepea VPS Deployment Guide (Ubuntu + Nginx)

## Prerequisites

- Ubuntu 22.04/24.04 VPS with root or sudo access
- Domain pointed to the VPS IP
- Git and Node.js 22 installed on the VPS

## 1. Install Node.js 22

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

## 2. Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

## 3. Clone the project

These commands assume you are starting inside `/var/www/`:

```bash
cd /var/www
sudo mkdir -p prepea
sudo chown "$USER":"$USER" prepea
cd prepea
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .
```

## 4. Install and build

```bash
npm ci --include=dev
npm run build
```

The production files are created in `/var/www/prepea/dist`.

## 5. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/prepea
```

Use this configuration:

```nginx
server {
    listen 80;
    server_name prepea.com www.prepea.com;

    root /var/www/prepea/dist;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location ~ /\. {
        deny all;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/prepea /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 6. Configure SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d prepea.com -d www.prepea.com
```

## 7. Configure GitHub Actions SSH access

The working setup does not require `/var/www/prepea/deploy.sh`. GitHub Actions
runs the deployment commands directly over SSH.

If you created `deploy.sh` and received a permission error from:

```bash
chmod +x /var/www/prepea/deploy.sh
```

the file was probably owned by `root`. Fix it with:

```bash
sudo chown deploy:deploy /var/www/prepea/deploy.sh
sudo chmod 755 /var/www/prepea/deploy.sh
```

This script is optional and is not used by the final GitHub Actions workflow.

Generate the deployment key on your local Windows computer, not on the VPS.
In PowerShell:

```powershell
ssh-keygen -t ed25519 -C "github-actions-deploy" -f "$env:USERPROFILE\.ssh\github_actions_prepea"
```

Press Enter twice for an empty passphrase. Copy the public key:

```powershell
Get-Content "$env:USERPROFILE\.ssh\github_actions_prepea.pub" | Set-Clipboard
```

SSH into the VPS and add it to the deploy user's keys:

```bash
mkdir -p /home/deploy/.ssh
nano /home/deploy/.ssh/authorized_keys
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

Test the key from PowerShell:

```powershell
ssh -i "$env:USERPROFILE\.ssh\github_actions_prepea" deploy@YOUR_VPS_IP
```

## 8. Allow Nginx reload without a password

GitHub Actions logs in as `deploy` and needs to reload Nginx:

```bash
sudo visudo -f /etc/sudoers.d/deploy-nginx
```

Add:

```text
deploy ALL=(root) NOPASSWD: /usr/bin/systemctl reload nginx
```

Then apply and test it:

```bash
sudo chmod 440 /etc/sudoers.d/deploy-nginx
sudo -n systemctl reload nginx
```

The last command must work without requesting a password.

## 9. Configure GitHub repository secrets

Go to:

`Repository > Settings > Secrets and variables > Actions > Secrets > New repository secret`

Create these repository secrets, not environment secrets:

| Secret | Value |
|---|---|
| `VPS_HOST` | VPS IP, for example `159.198.44.172` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | Complete private key contents, without `.pub` |

Copy the private key with:

```powershell
Get-Content "$env:USERPROFILE\.ssh\github_actions_prepea" -Raw
```

Include the complete `BEGIN OPENSSH PRIVATE KEY` and `END OPENSSH PRIVATE KEY`
lines. Never commit or share the private key.

## 10. GitHub Actions auto-deploy

The deployment runs only after `test`, `coverage`, `security`, and `build` pass,
and only for pushes to `main`:

```yaml
  deploy:
    name: Deploy to VPS
    runs-on: ubuntu-latest
    needs: [test, coverage, security, build]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.2.2
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            set -e
            cd /var/www/prepea
            git pull --ff-only origin main
            npm ci --include=dev
            npm run build
            sudo systemctl reload nginx
```

The VPS must have Git access to the repository for `git pull origin main`. A
public repository works immediately. A private repository requires a GitHub
deploy key or another Git authentication method configured on the VPS.

## 11. Verify deployment

```bash
curl -I http://localhost
```

Then open the domain in a browser:

```text
https://prepea.com
```

Deployment behavior:

- Push to `main`: runs CI and deploys after all checks pass
- Push to `develop`: runs CI but does not deploy
- Pull request: runs CI but does not deploy
- Uncommitted changes: are not deployed

## Troubleshooting

| Issue | Fix |
|---|---|
| 404 after refreshing a route | Keep `try_files $uri $uri/ /index.html` in Nginx |
| Assets return 404 | Confirm `/var/www/prepea/dist` exists |
| `sudo: a password is required` | Configure `/etc/sudoers.d/deploy-nginx` |
| SSH action cannot connect | Verify `VPS_HOST`, `VPS_USER`, and `VPS_SSH_KEY` |
| Git pull asks for credentials | Configure GitHub access for the VPS |
| SSL issue | Run `sudo certbot renew --dry-run` |
| Port 80/443 blocked | Run `sudo ufw allow 'Nginx Full'` |
