# FRCDM

Findown Restaurants Cloud Digital Menu (FRCDM) is a modular, multi-client SaaS platform built on Odoo 18, providing digital menus, QR ordering, WhatsApp ordering, online payments, restaurant management, and customizable client dashboards.

## Phase 1 — Digital menu prototype

| Path | Purpose |
|------|---------|
| `FRCDM Website/` | **Production static site** (GitHub Pages, Vercel, Netlify) |
| `Phase 1/` | Source prototypes including V1 C and V1 G references |

### Live demo (GitHub Pages)

After enabling Pages in repo settings, the site is published from **`FRCDM Website`** via GitHub Actions:

1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main` — workflow `.github/workflows/deploy-pages.yml` deploys automatically

Expected URL: `https://findowntech.github.io/FRCDM/`

### Local preview

```bash
cd "FRCDM Website"
python -m http.server 8080
```

Open `http://localhost:8080`

### Test coupons

- `FEAST30` — 30% off
- `WELCOME15` — 15% off
- `SUMMER10` — ₹10 off
