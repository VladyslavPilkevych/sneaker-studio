import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/header/Header";
import { CollectionsPage } from "@/pages/collections/CollectionsPage";
import { CheckoutPage } from "@/pages/checkout/CheckoutPage";
import CartPage from "@/pages/cart/CartPage";
import { AboutPage } from "@/pages/about/AboutPage";
import { Footer } from "@/components/footer/footer";
import ReviewPage from "@/pages/reviews/ReviewPage";

import { useGLTF } from "@react-three/drei";
import { SNEAKER_MODELS } from "@/data/models";
import { ProductDetailsPage } from "@/pages/product/ProductDetailsPage";
import { SneakerPage } from "@/pages/model/SneakerPage";
import { HomePage } from "@/pages/home/HomePage";

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
      <ToastContainer position="bottom-right" theme="dark" />
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
