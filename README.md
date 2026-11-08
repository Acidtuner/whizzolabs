# Whizzolabs

D2C e-commerce platform for Whizzo educational & Montessori wooden toys.

Built against the Master System Truth File. Brand colours and typography from the Whizzo Brand Guidelines.

## Brand

- Joy Yellow `#FFD200`
- Energy Red `#DB0E0E`
- Whizzo Blue `#004DAA`
- Cool Grey `#373D42`
- Headlines: Space Grotesk
- Body: Nunito

## Pricing (authoritative)

Incremental volume discounts off ₹450 base, rounded **up** to nearest ₹5:

| Boards | Discount | Unit price |
|--------|----------|------------|
| 1      | 0%       | ₹450       |
| 2      | 10%      | ₹405       |
| 3      | 15%      | ₹385       |
| 4+     | 20%      | ₹360       |

10-Pack is a fixed ₹2,499 product and does not count toward board quantity.

## Local development

```bash
npm install
npm run dev
```

## Deployment on Hostinger

1. In Hostinger hPanel → Websites → Manage → Advanced → Git:
   - Connect the GitHub repository `Acidtuner/whizzolabs`.
   - Build command: `npm install && npm run build`
   - Start command: `npm start` (Node.js hosting)
2. Node 18+ or 20+ recommended.
3. Full payments, inventory, auth, and admin follow the Master System Truth File.

## Current scope

Functional storefront starter with brand UI, full WIZTICTC01 catalogue, and live volume-discount cart.
