import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { HomePage } from "@/pages/HomePage";
import { SneakerPage } from "@/pages/SneakerPage";
import { CollectionsPage } from "@/pages/collections/CollectionsPage";

import { useGLTF } from "@react-three/drei";
import { SNEAKER_MODELS } from "@/data/models";

SNEAKER_MODELS.forEach((model) => {
  useGLTF.preload(model.glbUrl);
});

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/model/:id" element={<SneakerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
