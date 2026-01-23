export interface SneakerModel {
  id: string;
  name: string;
  description: string;
  tags: string[];
  glbUrl: string;
  imgUrl: string;
  defaultConfig: Record<string, string>;
}

export const SNEAKER_MODELS: SneakerModel[] = [
  {
    id: "sneaker-001",
    name: "Urban Runner X",
    description:
      "A sleek, modern runner designed for the concrete jungle. Features breathable mesh and responsive cushioning.",
    tags: ["running", "urban", "modern"],
    glbUrl: "/assets/models/urban-runner.glb",
    imgUrl: "/assets/images/urban-runner.png",
    defaultConfig: {
      laces: "#ffffff",
      sole: "#000000",
      body: "#ff5500",
    },
  },
  {
    id: "sneaker-002",
    name: "Classic Court High",
    description:
      "Vintage vibes with a high-top silhouette. Perfect for casual wear or the skate park.",
    tags: ["classic", "high-top", "skate"],
    glbUrl: "/models/classic-court.glb",
    imgUrl: "/assets/images/classic-court.png",
    defaultConfig: {
      laces: "#cccccc",
      sole: "#ffffff",
      body: "#333333",
    },
  },
  {
    id: "sneaker-003",
    name: "Future Trekker",
    description:
      "Bold design meets rugged durability. Ready for any adventure, from city streets to mountain trails.",
    tags: ["hiking", "outdoor", "futuristic"],
    glbUrl: "/models/future-trekker.glb",
    imgUrl: "/assets/images/future-trekker.png",
    defaultConfig: {
      laces: "#ffff00",
      sole: "#222222",
      body: "#4444ff",
    },
  },
];
