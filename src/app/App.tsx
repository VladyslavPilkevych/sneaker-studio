import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { HomePage } from "@/pages/HomePage";
import { SneakerPage } from "@/pages/SneakerPage";
import { CollectionsPage } from "@/pages/collections/CollectionsPage";
import { ProductDetailsPage } from "@/pages/collections/ProductDetailsPage";
import { CheckoutPage } from "@/pages/checkout/CheckoutPage";
import CartPage from "@/pages/cart/CartPage";
import { AboutPage } from "@/pages/about/AboutPage";
import ReviewPage from "@/pages/about/ReviewPage";
import { Footer } from "@/components/footer/footer";

import { useGLTF } from "@react-three/drei";
import { SNEAKER_MODELS } from "@/data/models";

SNEAKER_MODELS.forEach((model) => {
  if (model.glb) {
    useGLTF.preload(model.glb);
  }
});

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/model/:id" element={<SneakerPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
