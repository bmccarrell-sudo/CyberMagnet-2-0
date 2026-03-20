# CyberMagnet Website

Dallas-based digital marketing agency website.

## Stack
- Pure HTML/CSS/JS — no framework, no build step
- Fonts: Syne + DM Sans (Google Fonts)
- Deploy: Cloudflare Pages (drag & drop the `site/` folder)

## Structure
```
site/          ← drag this folder to Cloudflare Pages
├── index.html
├── about/
├── contact/
├── blog/
├── portfolio/
├── services/      (overview + 18 individual service pages)
├── systems/       (4 systems + 4 micro-systems)
├── funnels/       (SEO audit, strategy call, thank-you, lead magnet)
├── products/
└── assets/
_docs/         ← strategy docs (not deployed)
_archive/      ← old variants (not deployed)
```

## Deployment (Cloudflare Pages)
1. Go to Cloudflare Pages → Create a project → Upload assets
2. Drag the `site/` folder contents (not the folder itself) into the upload area
3. Set the build output directory to `/` (root)
4. Turn OFF: Scrape Shield → Email Address Obfuscation

## Contact Info
- Email: info@cybermagnet.net | projects@cybermagnet.net
- Phone: (214) 412-0861
- Socials: @cybermagnetms across TikTok / Instagram / LinkedIn / YouTube

## Pre-Launch Checklist
- [ ] Connect contact forms (Web3Forms / GoHighLevel)
- [ ] Replace Calendly placeholder with live embed
- [ ] Add Google Maps embed in contact page
- [ ] Set up Cloudflare Analytics
- [ ] Complete /privacy/ and /terms/ stub pages
- [ ] Verify all 18 service page internal links
