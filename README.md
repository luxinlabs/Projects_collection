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

## Interactive house (`redesign` branch)

The homepage is an explorable 3D house and garden. The earlier homepage is preserved at `/classic`; all existing portfolio routes remain available.

- Click the ground to walk, use WASD / arrow keys, or use the phone’s **Walk around** controls. Walking follows the camera’s orientation; manual controls cancel an automatic route.
- Click a labeled object to approach and inspect it. Press **E** near an object, or use the section buttons below the house for direct access.
- Drag to change the view; use the zoom buttons to inspect the room. **Escape** closes the detail sheet.
- The trophy wall contains awards, the computer opens projects, the balance scale opens judging, the window opens open source, the bookshelf opens research, and the garden bench opens contact details.
- Click little Luxin to chat with the virtual website guide or read the biography. Conversation stays in the current page session.

The host answers from the website’s shared project, research, biography, and judging data. Without an API key, it uses a built-in topic and keyword guide. To enable generative conversations, copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` on the server; `OPENAI_CHAT_MODEL` is optional. The key is never sent to the browser. If the model is unavailable, the host falls back to the built-in guide. Network failures, server outages, and static hosts also use the guide locally in the browser. Closing an unfinished chat cancels the request and removes the unanswered question, while completed conversations remain available during the page session. Multilingual chat history is trimmed by byte size to fit the server’s request limit. The API limits messages and requests; use a shared rate limiter if deploying across multiple server instances. AI responses require a server deployment, rather than a static-only export. The implementation follows the [official OpenAI text generation documentation](https://developers.openai.com/api/docs/guides/text).

Globe entries live in `src/app/house/houseContent.ts`. Initial pins are documented education, work, and community locations from the bio, not an invented travel history. Add confirmed destinations with coordinates and photos, e.g. `photos: [{ src: "/travel/durham.jpg", caption: "Your photo caption" }]`. Store local photos in `public/travel/`. The globe supports location selection, rotation, zoom, photo thumbnails, and an expanded photo viewer.

Checks:

```bash
npm run lint
npx tsc --noEmit --incremental false
npm run test:house
npm run build
```

The 3D room and globe use [Three.js](https://threejs.org/docs/pages/WebGLRenderer). Geometry is batched by material and interaction target, and animation resources are disposed when leaving the page. Devices without WebGL can use the section menu and the classic portfolio.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
