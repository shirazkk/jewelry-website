import BestSellerSection from "@/components/home_components/BestSellerSection";
import CategoryShowcase from "@/components/home_components/CategoryShowcase";
import HeroSection from "@/components/home_components/HeroSection";
import RefinementSection from "@/components/home_components/RefinementSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RefinementSection />
        <CategoryShowcase />
        <BestSellerSection />
      </div>
    </div>
  );
}
