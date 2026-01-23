# Sneaker Studio 👟

A premium 3D sneaker customization experience built with React, Three.js (R3F), and Tailwind CSS.

![Sneaker Studio Banner](/public/og-image.jpg)

## Features

- **Interactive 3D Carousel**: fluidly browse through our sneaker collection with a high-performance 3D slider.
- **Real-time Customization**: Change colors of individual parts (laces, sole, body, etc.) and see changes instantly.
- **Shareable Designs**: Your custom designs are saved in the URL, ready to be shared with the world.
- **Responsive & Accessible**: Optimized for touch devices and screen readers.
- **Performance Optimization**: 60fps rendering, model preloading, and smart texture management.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **3D**: React Three Fiber, Dreis
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Zustand
- **Routing**: React Router v7
- **SEO**: React Helmet Async

## Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/vladyslavpilkevych/sneaker-studio.git
    cd sneaker-studio
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # Note: If you encounter peer dependency issues with React 19, use --legacy-peer-deps
    npm install --legacy-peer-deps
    ```

3.  **Run the development server**:

    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── app/            # App entry point and routing
├── components/
│   ├── 3d/         # 3D specific logic (CanvasErrorBoundary)
│   ├── canvas/     # 3D Scene components (Scenes, Models)
│   ├── layout/     # Layout wrappers
│   ├── ui/         # Reusable UI components (Shadcn)
│   └── Seo.tsx     # SEO component
├── data/           # Static data (models list)
├── pages/          # Page components
├── store/          # Zustand stores
└── main.tsx        # Entry file
```

## Customization

To add new models, update `src/data/models.ts` with your GLB file paths and configuration options. Ensure your GLB models have properly named meshes for the parts you want to customize.

## License

MIT
