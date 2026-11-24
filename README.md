# NŪRA SKIN — Premium Skincare Concept

Arabic-first, RTL storefront for a fictional skincare brand. Portfolio-grade single-page experience built with Next.js 16, React 19, TypeScript, Tailwind CSS v4 and Lucide icons.

## Design foundation

Based on the **Joyful / sticker-pop direction** of `web-design-5` in [fable-5.2-projects](https://github.com/h4ni0/fable-5.2-projects) — specifically `app/design-three` (“Wiggle Room”: bold outlined cards, hard offset shadows, tilted sticker badges, squiggles and playful interactions). Those techniques were refined into a calm luxury skincare palette (warm ivory, beige, sand, olive, brown), Arabic Alexandria typography and a serif Latin wordmark. Arabic typography and RTL layout were informed by the repository's `web-design-arabic` project.

> Note: the repository has no literal `5-web/Joyful` folder; the closest joyful theme is `web-design-5/app/design-three` (Wiggle Room), which was used as the primary foundation.

## Run

```bash
npm install
npm run dev -- -H 127.0.0.1
# http://127.0.0.1:3000
```

```bash
npm run lint
npm run build
npm run start -- -H 127.0.0.1 -p 3000
```

## Implemented

- RTL Arabic layout (`lang="ar" dir="rtl"`) with Alexandria + Cormorant Garamond, logical CSS properties and mixed Arabic/Latin handling.
- Dismissible announcement bar, sticky navigation with scroll progress, active section states and accessible mobile menu.
- Editorial hero with locally processed photography, sticker burst and playful but restrained composition.
- Four fictional products with custom SVG packaging, detail dialog, add-to-bag, cart drawer with quantity controls, removal, empty state and subtotal.
- Brand story, four values, testimonial carousel, newsletter validation with demo feedback, accessible FAQ accordion and full footer.
- Scroll reveals, hover transitions, reduced-motion support, SEO metadata, Open Graph, favicon and sitemap-free single-page setup.

## Demo-only

NŪRA SKIN is entirely fictional. No payments, orders, shipping or emails are processed; the newsletter only validates input and shows a success state. Product names, prices, images, testimonials and contact details are demonstration content. For production you would add a real CMS/catalog, secure payment gateway, verified customer reviews, server-side newsletter storage, legal pages and real contact details.

## Assets

Four locally processed WebP photographs from Unsplash (colour-graded for the brand) and four original SVG packshots created for this concept. No external image requests at runtime.
