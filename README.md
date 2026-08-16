# CalcWise - Financial Calculator Website

A free, static financial calculator website built for GitHub Pages deployment. Includes mortgage, loan, and auto loan calculators with interactive charts, amortization schedules, and SEO-optimized blog content.

## Project Structure

```
finance-calc/
├── index.html                    # Homepage
├── about.html                    # About page
├── contact.html                  # Contact page
├── privacy.html                  # Privacy Policy (required for AdSense)
├── terms.html                    # Terms of Service
├── robots.txt                    # Search engine crawler rules
├── sitemap.xml                   # XML sitemap for SEO
├── CNAME                         # Custom domain config
├── .nojekyll                     # Disable Jekyll processing on GitHub Pages
├── calculators/
│   ├── mortgage.html             # Mortgage calculator
│   ├── loan.html                 # Personal loan calculator
│   └── auto-loan.html            # Auto loan calculator
├── blog/
│   ├── index.html                # Blog listing page
│   ├── how-to-pay-off-mortgage-faster.html
│   ├── mortgage-rates-today.html
│   └── best-personal-loans.html  # Affiliate comparison page
└── assets/
    ├── css/style.css             # All styles
    └── js/
        ├── common.js             # Shared utilities
        ├── mortgage.js           # Mortgage calculation logic
        ├── loan.js               # Loan calculation logic
        └── auto-loan.js          # Auto loan calculation logic
```

## Features

- **3 Interactive Calculators**: Mortgage (with PMI, taxes, insurance), Personal Loan, Auto Loan (with trade-in & sales tax)
- **Real-time calculations**: Results update as you type
- **Chart.js visualizations**: Doughnut charts showing payment breakdown
- **Amortization schedules**: Full month-by-month payment tables
- **Responsive design**: Works on desktop, tablet, and mobile
- **SEO-optimized**: Meta tags, canonical URLs, sitemap.xml, robots.txt
- **3 Blog articles**: 2,500+ words of English content with internal linking
- **Ad-ready**: Placeholder ad slots for AdSense / Ezoic
- **Affiliate-ready**: Comparison table with lender reviews in blog

## Deployment to GitHub Pages

### Step 1: Create a GitHub repository
1. Go to https://github.com/new
2. Name the repository (e.g., `calcwise`)
3. Make it **Public**
4. Do NOT initialize with README

### Step 2: Push the code
```bash
cd finance-calc
git init
git add .
git commit -m "Initial commit: CalcWise financial calculator site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/calcwise.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repo: `Settings` → `Pages`
2. Under **Source**, select `Deploy from a branch`
3. Select branch: `main`, folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes, your site will be live at:
   `https://YOUR_USERNAME.github.io/calcwise/`

### Step 4: Custom domain (optional)
1. Buy a domain from Namecheap / Gname / GoDaddy
2. In repo `Settings` → `Pages` → `Custom domain`, enter your domain
3. Add a CNAME record in your DNS:
   - Type: CNAME
   - Host: `www`
   - Value: `YOUR_USERNAME.github.io`
4. The `CNAME` file in this repo is pre-filled with `www.calcwise.cc` — edit it to match your domain.
5. Check "Enforce HTTPS" once DNS resolves.

## Google AdSense Application

1. Ensure the site is live with custom domain
2. Go to https://adsense.google.com and sign up
3. Add the AdSense code to the `<head>` of every HTML page
4. Make sure all pages have substantial content (minimum 30+ pages recommended for approval)
5. Include Privacy Policy and Terms of Service (already included)
6. Approval typically takes 1-2 weeks

## SEO Setup

1. Submit sitemap to Google Search Console: https://search.google.com/search-console
2. Submit sitemap to Bing Webmaster Tools
3. The sitemap is at: `https://www.yourdomain.com/sitemap.xml`
4. robots.txt already points to the sitemap

## Monetization Setup

### Display Ads
- **Google AdSense**: Start here (no traffic minimum)
- **Ezoic**: Switch at 5,000 monthly sessions (higher RPM)
- **Mediavine**: Apply at 50,000 monthly sessions (premium RPM, $25+)

### Affiliate Marketing (higher revenue potential)
Register on these affiliate networks:
- **Impact.com**: SoFi, Betterment, Robinhood
- **CJ Affiliate**: Many financial brands
- **ShareASale**: Niche financial products
- **Amazon Associates**: General products

Replace placeholder affiliate links in `blog/best-personal-loans.html` with your actual affiliate links.

## Adding More Calculators

To add a new calculator:
1. Copy an existing calculator HTML file (e.g., `loan.html`)
2. Create a new JS file in `assets/js/`
3. Add a card link on the homepage (`index.html`)
4. Add the URL to `sitemap.xml`
5. Link to it from relevant blog articles

## Next Steps to Grow Traffic

1. **Add more calculators**: Credit card payoff, retirement, compound interest, BMI, student loan
2. **Publish 2-3 blog posts per week**: Target long-tail keywords
3. **Build backlinks**: Answer questions on Reddit (r/personalfinance), Quora, finance forums
4. **Create Pinterest pins**: Finance infographics get great traffic
5. **Internal linking**: Link every blog post to relevant calculators

## Technical Notes

- No build process required — pure HTML/CSS/JS
- Chart.js loaded from CDN (jsdelivr)
- All calculations run client-side (no server, no data collection)
- `.nojekyll` file ensures GitHub Pages serves files as-is
