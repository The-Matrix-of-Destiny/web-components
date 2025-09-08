# Web Components Library

A modern React component library built with TypeScript and Tailwind CSS, designed for Next.js applications.

## Installation

### Local Development Install (for Next.js app)

If you want to use this library locally in your Next.js app (without publishing to npm):

1. **Build the component library:**
   ```bash
   pnpm build
   ```
2. **In your Next.js app's `package.json`, add:**
   ```json
   {
     "dependencies": {
       "@thematrixofdestiny/web-components": "file:../web-components"
     }
   }
   ```
   (Adjust the path if your folder structure is different.)
3. **Install in your Next.js app:**
   ```bash
   pnpm install
   ```
4. **Import and use components:**
   ```js
   import { Button } from '@thematrixofdestiny/web-components';
   ```
5. **To update the components in your Next.js app:**
   - Make changes in the `web-components` library
   - Rebuild the library:
     ```bash
     pnpm build
     ```
   - Reinstall in your Next.js app:
     ```bash
     pnpm install
     ```
   - Restart your Next.js dev server if needed

## Setup

1. Install the required peer dependencies in your Next.js project:

```bash
pnpm add react react-dom next
```

2. Configure Tailwind CSS in your Next.js project:

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

3. Create or update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../web-components/src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@thematrixofdestiny/web-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter } from '@thematrixofdestiny/web-components'

export default function MyPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is a sample card component.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Click me</Button>
      </CardFooter>
    </Card>
  )
}
```

## Available Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
<Button variant="primary" size="md">Click me</Button>
```

Props:
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `isLoading`: boolean
- All standard button HTML attributes

### Card

A flexible card component with header, content, and footer sections.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

## Development

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Start the development server (for local demo):
```bash
pnpm dev
```

4. Build the library:
```bash
pnpm build
```

5. Run Storybook:
```bash
pnpm storybook
```

## License

MIT 


touched by Ordin