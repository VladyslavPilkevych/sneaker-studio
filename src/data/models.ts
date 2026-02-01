export interface Badge {
  text: string;
  variant: "primary" | "dark" | "light";
}

export interface Sneaker {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  badges?: Badge[];
  glb?: string;
  colors: string[];
  silhouette: string;
  materials: string[];
  colorways: string[];
  releaseDate: string;
  tags: string[];
  defaultConfig?: Record<string, string>;
}

export const SNEAKER_MODELS: Sneaker[] = [
  {
    id: "sneaker-002",
    name: "Black Sneakers",
    description:
      "Vintage vibes with a high-top silhouette. Perfect for casual wear or the skate park.",
    price: 150,
    image: "/assets/images/black-sneakers.png",
    imageAlt: "3D render of Black Sneakers",
    badges: [
      { text: "New", variant: "primary" },
      { text: "Customizable", variant: "dark" },
    ],
    glb: "/assets/models/black_sneakers.glb",
    colors: [],
    silhouette: "Classic",
    materials: ["Synthetic"],
    colorways: [],
    releaseDate: "2024-01-30",
    tags: ["classic", "high-top", "skate"],
    defaultConfig: {
      laces: "#cccccc",
      sole: "#ffffff",
      body: "#333333",
    },
  },
  {
    id: "sneaker-001",
    name: "Urban Runner X",
    description:
      "A sleek, modern runner designed for the concrete jungle. Features breathable mesh and responsive cushioning.",
    price: 150,
    image: "/assets/images/urban-runner.png",
    imageAlt: "3D render of Urban Runner X",
    badges: [
      { text: "New", variant: "primary" },
      { text: "Customizable", variant: "dark" },
    ],
    glb: "/assets/models/urban-runner.glb",
    colors: [],
    silhouette: "Classic",
    materials: ["Synthetic"],
    colorways: [],
    releaseDate: "2024-01-30",
    tags: ["running", "urban", "modern"],
    defaultConfig: {
      laces: "#ffffff",
      sole: "#000000",
      body: "#ff5500",
    },
  },
  {
    id: "sneaker-003",
    name: "Future Trekker",
    description:
      "Bold design meets rugged durability. Ready for any adventure, from city streets to mountain trails.",
    price: 150,
    image: "/assets/images/future-trekker.png",
    imageAlt: "3D render of Future Trekker",
    badges: [
      { text: "New", variant: "primary" },
      { text: "Customizable", variant: "dark" },
    ],
    glb: "/assets/models/future-trekker.glb",
    colors: [],
    silhouette: "Classic",
    materials: ["Synthetic"],
    colorways: [],
    releaseDate: "2024-01-30",
    tags: ["hiking", "outdoor", "futuristic"],
    defaultConfig: {
      laces: "#ffff00",
      sole: "#222222",
      body: "#4444ff",
    },
  },
];
