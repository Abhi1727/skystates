# Sky States – Deployment Guide (skyreviews.us)

## Status

- **Location:** `/root/skystates`
- **Frontend:** Port 3080 (React + Nginx)
- **Backend:** Internal (API via frontend proxy)

## Run the app

```bash
cd /root/skystates
docker compose up -d
```

Stop:

```bash
docker compose down
```

## Point skyreviews.us to this server

1. Add an **A record** for `skyreviews.us` (and optionally `www.skyreviews.us`) pointing to this server’s IP.

## Nginx reverse proxy

1. Copy the config:
   ```bash
   sudo cp /root/skystates/nginx-skyreviews.conf /etc/nginx/sites-available/skyreviews.conf
   ```

2. Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/skyreviews.conf /etc/nginx/sites-enabled/
   ```

3. Test and reload:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

## HTTPS (recommended)

With Certbot:

```bash
sudo certbot --nginx -d skyreviews.us -d www.skyreviews.us
```

## Test locally (no domain)

```bash
# App available at:
http://YOUR_SERVER_IP:3080
```

## Later: move to skysktates.us

1. Add `skysktates.us` to the nginx `server_name`.
2. Or create a new nginx vhost for `skysktates.us` using the same proxy settings (port 3080).
3. After switching, you can keep or remove the skyreviews.us vhost.
