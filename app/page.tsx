import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import { StoreProvider } from "@/components/Store";
import Story from "@/components/Story";

export default function Home() {
  return (
    <StoreProvider>
      <a className="skip" href="#main">تخطي إلى المحتوى</a>
      <Reveal />
      <Header />
      <main id="main">
        <Hero />
        <Products />
        <Story />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </StoreProvider>
  );
}
