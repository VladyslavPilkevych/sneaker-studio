# Sneaker Studio

A premium 3D sneaker customization experience built with React, Three.js (R3F), and Tailwind CSS.

![Sneaker Studio Banner](/docs/banner.png)

## Demo Video

![Project Demo](/docs/demo.mp4)

---

## 1. Introduction

Sneaker Studio is a cutting-edge web application that allows users to interact with 3D sneaker models in real-time. It provides a seamless interface for browsing a collection of premium sneakers, customizing their individual components (laces, soles, body parts), and managing a shopping cart for potential purchases.

Built with performance and aesthetics in mind, the project leverages modern web technologies to deliver a 60fps 3D experience directly in the browser.

---

## 2. Key Features

### 3D Interactive Carousel

- **Fluid Navigation**: Browse through the sneaker catalog using a high-performance 3D slider.
- **Dynamic Previews**: Each sneaker in the carousel is a fully rendered 3D model that responds to user presence.

### Real-Time Customizer

- **Part-Level Customization**: Select specific parts of the sneaker (e.g., Body, Sole, Laces, Insole, Tongue) and apply custom colors.
- **Color Palettes**: Use predefined brand colors or a native color picker for infinite possibilities.
- **Instant Feedback**: Changes are reflected immediately on the 3D model.
- **Design Persistence**: Custom designs can be saved or added directly to the cart.

### Shopping Experience

- **Unified Cart**: Manage both standard and customized sneakers in a global shopping cart.
- **Responsive Checkout**: A streamlined 3-column checkout process with a live interactive credit card mock.
- **Search & Filter**: Find sneakers instantly with a debounced, case-insensitive search engine.

---

## 3. Technical Architecture

### Tech Stack

- **Frontend**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **3D Engine**: [Three.js](https://threejs.org/) via [React Three Fiber (R3F)](https://docs.pmnd.rs/react-three-fiber/)
- **3D Utilities**: [@react-three/drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

### Project Structure

```text
src/
├── app/            # App entry point and global providers
├── components/     # UI and 3D components
│   ├── 3d/         # specialized 3D logic and error boundaries
│   ├── canvas/     # 3D Scene and Model components
│   ├── layout/     # Structural components (Header, Footer, PageWrapper)
│   └── ui/         # Reusable atomic UI components
├── features/       # Feature-specific logic (Cart, Checkout, Customizer)
├── hooks/          # Custom React hooks
├── lib/            # External library configurations (e.g., utils)
├── pages/          # Full page components (Home, Collections, Product, etc.)
├── store/          # Zustand global state stores (useCartStore, useConfigStore)
├── styles/         # Global and component-specific CSS
└── main.tsx        # Application mount point
```

---

## 4. Customization System

The customization engine works by traversing the 3D model's scene graph. When a part is selected, the application:

1. Identifies the corresponding `Mesh` or `Group` in the GLB model.
2. Updates the material's color property based on the user's selection in the Zustand store.
3. React Three Fiber automatically re-renders the specific part of the canvas without a full scene reload.

**Markup Logic**: Custom designs automatically incur a 50% price markup to reflect the bespoke manufacturing process.

---

## 5. Setup & Development

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vladyslavpilkevych/sneaker-studio.git
   cd sneaker-studio
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Development

Start the development server:

```bash
npm run dev
```

### Production Build

Generate a production-ready bundle:

```bash
npm run build
```

---

## 6. Data Reference

The project uses a centralized JSON file for the sneaker catalog and a TypeScript configuration for 3D models.

- **`public/data/sneakers.json`**: Contains the full list of available sneakers, their metadata, and asset paths.
- **`src/data/models.ts`**: Defines the `Sneaker` interface and the initial set of models used in the 3D Carousel.

---

## 7. License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
