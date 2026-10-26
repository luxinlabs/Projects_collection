This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Castle exhibition hall (`redesign` branch)

The homepage is a walkable castle exhibition hall with stone walls, towers, battlements, vaulted arches, banners, and gallery displays. The west wing is the dedicated Research Gallery; the center is the Grand Hall for awards and judging; the east wing is the Project Gallery with a computer terminal. There are no bedrooms, kitchens, or dining rooms. A puppy and a cat accompany the host inside, while a duck with two ducklings swims in the garden pond. Little Luxin remains a girl with long dark hair, a rose dress, and a bow.

- Click the ground to walk, or use WASD / arrow keys and the phone’s walking controls. Walking follows the camera; manual controls cancel an automatic route.
- Click a labeled exhibit to approach it, or press **E** near it. Direct section buttons below the castle also open the exhibits. **Escape** closes a detail sheet.
- The awards wall opens awards; the computer opens projects; the balance scale opens judging; the arched window opens open source; the research displays open papers; the globe opens the atlas; and the garden bench opens contact details.
- Selecting little Luxin opens six fixed questions about her bio, research, projects, awards, judging, and contact. Answers are prewritten and displayed entirely in the browser. There is no chat API, no model request, no API key, and no model token usage. Environment variables cannot enable paid chat. Source links navigate only when clicked.
- All pages share the parchment, sage, and brass theme. Daylight/evening mode persists across navigation. The earlier portfolio remains available at `/classic`.

Globe entries live in `src/app/house/houseContent.ts`. Initial pins are documented education, work, and community locations from the bio, rather than an invented travel history. Add confirmed destinations with coordinates and photos, e.g. `photos: [{ src: "/travel/durham.jpg", caption: "Your photo caption" }]`. Local photos go in `public/travel/`.

Checks:

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run test:house
npm run build
```

The scene uses Three.js. Geometry is batched, resources are disposed when leaving the page, and reduced-motion preferences pause decorative animation. Devices without WebGL can still use the section menu and classic portfolio.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
