# Frontend Template

React + TypeScript + Vite + Tailwind CSS + shadcn/ui starter template for rapid app creation.

## What's Included

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library (Radix UI + Tailwind)
- **React Router** for routing
- **React Query** (TanStack Query) for data fetching
- **Authentication** context with JWT
- **Dark mode** by default

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env with your API URL

# Development
npm run dev

# Production (Docker)
docker build -t my-app-frontend .
docker run -p 80:80 my-app-frontend
```

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Router setup
├── index.css             # Global styles
├── components/
│   ├── ui/               # shadcn/ui components
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx   # JWT auth state
├── hooks/
│   └── useApi.ts         # API hooks (React Query)
├── lib/
│   ├── api.ts            # API client
│   └── utils.ts          # Utility functions
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   └── NotFound.tsx
└── types/                # TypeScript types
```

## Adding New Features

### 1. Add a new page
```tsx
// src/pages/Items.tsx
import { Card } from '@/components/ui/card';

export default function Items() {
  return <div>My Items Page</div>;
}
```

### 2. Add route in `src/App.tsx`
```tsx
import Items from './pages/Items';

// In Routes:
<Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
```

### 3. Add API hook
```tsx
// src/hooks/useApi.ts
export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: () => request('/items'),
  });
}
```

## Adding shadcn/ui Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
# See: https://ui.shadcn.com/docs/components
```

## Environment Variables

```env
VITE_API_URL=http://localhost:3000
```

Access in code: `import.meta.env.VITE_API_URL`

## Scripts

- `npm run dev` - Start dev server (port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

Included `Dockerfile` and `nginx.conf` are production-ready.

```bash
docker build -t my-app .
docker run -p 80:80 my-app
```

Access: `http://localhost`
